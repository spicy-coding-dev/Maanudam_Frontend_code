import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import { toast } from "react-toastify";

/* =====================
   Base URL
===================== */
export const baseURL = "http://localhost:8080/api/v1";

/* =====================
   Axios Instance
===================== */
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

/* =====================
   Extend Axios Config
===================== */
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/* =====================
   Request Interceptor
===================== */
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ Next.js safe check
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token && config.headers) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/* =====================
   Response Interceptor
===================== */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    const status = error.response?.status;

    const backendMessage =
      (error.response?.data as any)?.message || "Something Went Wrong!";

    // ✅ toast only client side
    if (
      typeof window !== "undefined" &&
      backendMessage &&
      status !== 401 &&
      status !== 403
    ) {
      toast.error(String(backendMessage), {
        position: "top-right",
      });
    }

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        interface RefreshResponse {
          success: boolean;
          data: {
            accessToken: string;
          };
        }

        const res = await axiosInstance.post<RefreshResponse>(
          `/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newToken = res.data.data.accessToken;

        // ✅ only browser
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", newToken);
        }

        if (originalRequest.headers) {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

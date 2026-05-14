import axiosInstance from "../axiosInstance";

/* =====================
   Types
===================== */

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginData {
  emailOrPhone: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
}

export interface LoginResponse {
  accessToken?: string;
  userRole?: "USER" | "ADMIN" | "SUPER_ADMIN";
}

/* =====================
   Register API
===================== */
export const registerUser = (registerData: RegisterData) => {
  return axiosInstance.post<ApiResponse>(
    "/auth/register",
    registerData
  );
};

/* =====================
   Login API
===================== */
export const loginUser = (loginData: LoginData) => {
  return axiosInstance.post<ApiResponse<LoginResponse>>(
    "/auth/user-login",
    loginData
  );
};


/* =====================
   Forgot Password API
===================== */
export const forgotPasswordApi = (emailOrMobile: string) => {
  console.log("emailOrMobile", emailOrMobile);

  return axiosInstance.post<ApiResponse>(
    "/auth/forgot-password",
    { emailOrMobile }
  );
};

/* =====================
   Reset Password API
===================== */
export const resetPasswordApi = (
  newPassword: string,
  token: string
) => {
  console.log("reset password", newPassword, token);

  return axiosInstance.post<ApiResponse>(
    `/auth/reset-password?token=${token}`,
    { newPassword }
  );
};

"use client";

import { Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "./LoginValidation";
import { loginUser } from "@/API/RegisterAuthApi/authApi";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import PopupContainer from "@/components/PopuContainer";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "@/app/Context/AuthContext";

/* =====================
   Types
===================== */

interface LoginFormData {
  emailOrPhone: string;
  password: string;
  captchaResponse?: string;
}

/* =====================
   Component
===================== */

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginValidation),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const SITE_KEY = "6Le3is4rAAAAADcftSKua8dCUJwU_O26NbLOmqJG";

  /* =====================
     Submit Login
  ===================== */

  const handleLoginSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      // 🔐 captcha after 3 failed attempts
      if (loginAttempts >= 3) {
        const captchaToken = recaptchaRef.current?.getValue();
        recaptchaRef.current?.reset();

        if (!captchaToken) {
          toast.error("Please verify reCAPTCHA ❌");
          return;
        }

        data.captchaResponse = captchaToken;
      }

      setLoading(true);

      const response = await loginUser(data);
      console.log(response);
      const token = response.data?.data?.accessToken;
      const role = response.data?.data?.userRole;
      
      console.log(token)
      // ✅ AuthContext login
      // ✅ Save role
if (role) {
  localStorage.setItem("ROLE", role);
}

// ✅ Login
if (token) {
  login(token);
}
      // if (token) {
      //   login(token);
      // }

      setLoginAttempts(0);

      toast.success(response.data?.message, {
        position: "top-right",
      });

      reset();

      // ✅ Redirect home
      setTimeout(() => {
        if (role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err:any) {
     toast.error(err.response?.data?.message,{
      position:"top-right"
     })
      console.error("this is  err", err.response.data.message);
      setLoginAttempts((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-center text-xl font-bold text-yellow-600">
          உள்நுழைய
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          உங்கள் கணக்கில் உள்நுழையுங்கள்
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleLoginSubmit)} autoComplete="off">
          {/* Email */}
          <div className="mt-5">
            <label className="text-sm text-gray-600">மின்னஞ்சல்</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type="text"
                autoComplete="off"
                {...register("emailOrPhone")}
                placeholder="Enter Email / Mobile"
                className="w-full pl-10 py-3 rounded-lg bg-gray-100 text-black outline-none"
              />
            </div>
            <p className="text-xs text-red-400 mt-1">
              {errors.emailOrPhone?.message}
            </p>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="text-sm text-gray-600">கடவுச்சொல்</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                autoComplete="off"
                placeholder="Enter Password"
                className="w-full pl-10 py-3 rounded-lg text-black bg-gray-100 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <p className="text-xs text-red-400 mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* CAPTCHA */}
          {loginAttempts >= 3 && (
            <div className="flex justify-center mt-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={SITE_KEY}
                onChange={() => setCaptchaVerified(true)}
                onExpired={() => setCaptchaVerified(false)}
              />
            </div>
          )}

          <div className="flex justify-end text-xs mt-3">
            <Link className="text-red-500 font-medium" href="/forgot-password">
              கடவுச்சொல் மறந்துவிட்டதா?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full mt-5 py-3 rounded-lg bg-yellow-400 text-black font-semibold
              flex items-center justify-center gap-2
              transition-all duration-300
              hover:bg-yellow-600 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              "காத்திருங்கள்..."
            ) : (
              <>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  உள்நுழைய
                </span>
                <LogIn
                  size={20}
                  className="opacity-0 -translate-x-3.5
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:translate-x-12"
                />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          கணக்கு இல்லையா?{" "}
          <Link
            className="text-red-500 font-semibold cursor-pointer"
            href="/register"
          >
            புதிய பதிவுகள்
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;

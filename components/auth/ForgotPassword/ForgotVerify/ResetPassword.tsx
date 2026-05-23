"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  TextField,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { toast } from "react-toastify";
import axiosInstance from "@/API/axiosInstance";
import { ResetPasswordValidation } from "./ResetValidation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PopupContainer from "@/components/PopuContainer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";

/* =====================
   Types
===================== */

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params?.get("token");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
  }, [token, router]);
  if (!token) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(ResetPasswordValidation),
  });

  const handelResetPassword: SubmitHandler<ResetPasswordFormData> = async (
    resetData,
  ) => {
    try {
      setLoading(true);

      const res = await axiosInstance.post("auth/reset-password", {
        newPassword: resetData.newPassword,
        token,
      });

      toast.success(res.data.message,{
        position:"top-right"
      });

      setSuccess(true);
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong",{
        position:"top-right"
      });
    } finally {
      setLoading(false);
    }
  };

  /* ✅ success redirect */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (success) {
      timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [success, router]);

  return (
    <Box className="flex min-h-screen items-center justify-center bg-black px-4">
      <Box className="max-w-md md:bg-white w-full p-8 md:rounded-xl md:shadow-lg">
        <form
          onSubmit={handleSubmit(handelResetPassword)}
          autoComplete="off"
          className="grid gap-4"
        >
          <div className="flex justify-center items-center flex-col">
            <Image
              src="/MaanudamLogo.jpeg"
              alt="maanudamLogo"
              width={120}
              height={120}
              className="object-contain"
            />
            <p className="text-gray-700">கடவுச்சொல்லை மாற்றவும்</p>
          </div>

          {/* New Password */}
          <TextField
            fullWidth
            label="New Password"
            size="small"
            type={showPassword ? "text" : "password"}
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            size="small"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 py-3 rounded-lg bg-yellow-400 text-black font-semibold
              flex items-center justify-center gap-2 hover:bg-yellow-600 cursor-pointer"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <SendHorizontal size={20} />
                கடவுச்சொல்லை மாற்று
              </>
            )}
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;

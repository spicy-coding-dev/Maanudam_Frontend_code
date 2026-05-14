"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "@/API/axiosInstance";
import axios from "axios";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
const token = params?.get("token") ?? "";

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  console.log(params)
  console.log(token ," this is token")
  /* ✅ Verify Email */
useEffect(() => {
    if (!token) return console.log("token not fount");

    const verifyEmail = async () => {
      try {
        const res = await axiosInstance.get(
          `/auth/verify-email?token=${token}`
        );
        console.log(res)
        toast.success(res.data.message,{position:"top-right"});
        setSuccess(true);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || "Invalid link"
        )
        console.log(err.response.data,"This is err")
        ;
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  /* ✅ Redirect after success */
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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {loading && (
        <div className="flex flex-col items-center gap-3">
          <CircularProgress color="inherit" />
          <p>Verifying your email...</p>
        </div>
      )}

      {!loading && success && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-400">
            Email Verified ✅
          </h2>
          <p className="mt-2">You can now login</p>
        </div>
      )}

      {!loading && !success && (
        <div className="text-center text-red-400">
          <h2 className="text-xl font-bold">
            Verification Failed ❌
          </h2>
          <p>Link expired or invalid</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

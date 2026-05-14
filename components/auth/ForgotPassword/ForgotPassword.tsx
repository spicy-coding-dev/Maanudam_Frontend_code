"use client";
import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";

import { toast } from "react-toastify";

import { LogIn } from "lucide-react";
import { forgotPasswordApi } from "@/API/RegisterAuthApi/authApi";
import Image from "next/image";
import Link from "next/link";

// ✅ API function import (component name clash avoid panna)

const ForgotPassword: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForgotPassword = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!emailOrPhone.trim()) {
      toast.error(
        "உங்கள் மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும் / Please enter email or phone number",
        { position: "top-right" },
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPasswordApi(emailOrPhone);

      toast.success(response?.data?.message || "Password reset link sent!", {
        position: "top-right",
      });

      setEmailOrPhone("");
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-[80vh] items-center pt-30  md:pt-0 justify-center bg-black px-4">
        <div className="max-w-md bg-white w-full p-8 rounded-xl shadow-lg">
          <div className="flex justify-center flex-col items-center">
            <Image
              src="/MaanudamLogo.jpeg"
              alt="Maanudam Logo"
              width={80}
              height={80}
              className="h-30 w-30 object-contain"
            />
            <p className="mb-5 text-[15px] text-center text-black">
              உங்கள் மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="grid gap-4">
            <TextField
              fullWidth
              label="Email Or Mobile Number"
              variant="outlined"
              size="small"
              value={emailOrPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmailOrPhone(e.target.value)
              }
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              className="
                bg-yellow-400!
                hover:bg-yellow-600!
                text-black!
                font-semibold
                mt-2
                disabled:bg-yellow-300!
              "
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "சரிபார்க்க"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center py-4">
            <Link href="/login">
              <button type="button" className="ml-2 text-[#3f3192]">
                <div className="flex justify-center cursor-pointer items-center gap-3">
                  <LogIn size={20} />
                  <p className="hover:underline">
                    உள்நுழைவு பக்கத்திற்கு செல்ல
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

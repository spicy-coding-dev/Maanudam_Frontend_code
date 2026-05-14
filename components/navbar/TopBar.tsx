"use client";

import { useAuth } from "@/app/Context/AuthContext";
import {
  Facebook,
  Twitter,
  Instagram,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
// ✅ path correct ah podu

export default function TopBar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="bg-yellow-600 text-black text-sm">
      <div className="max-w-7xl mx-auto flex justify-end items-center gap-6 py-2 px-4">
        <Facebook size={16} className="cursor-pointer" />
        <Twitter size={16} className="cursor-pointer" />
        <Instagram size={16} className="cursor-pointer" />

        {/* Auth Section */}
        <div className="flex gap-2 items-center">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 cursor-pointer font-medium"
            >
              <LogOut size={16} />
              <span>LOGOUT</span>
            </button>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User size={16} />
                <span>LOGIN</span>
              </Link>

              <span>/</span>

              {/* Signup */}
              <Link href="/register" className="cursor-pointer font-medium">
                SIGNUP
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
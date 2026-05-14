"use client";

import axiosInstance from "@/API/axiosInstance";
import { useRouter } from "next/navigation";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type User = {
  name?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, userData?: User) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useRouter();

  // ✅ Check token on refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string, userData?: User) => {
    localStorage.setItem("accessToken", token);
    setUser(userData || null);
    setIsLoggedIn(true);
  };

  // const logout = () => {
  //   localStorage.removeItem("accessToken");
  //   setUser(null);
  //   setIsLoggedIn(false);
  // };

  const logout = async () => {
    try {
      // ✅ Logout API Call
      const response = await axiosInstance.post("/auth/logout");

      // ✅ Clear local storage
      toast.success(response.data?.message || "Logout Successfully", {
        position: "top-right",
      });
      localStorage.removeItem("accessToken");
      console.log("Logout successfully");
      // ✅ Reset state
      setUser(null);
      console.log("THis is Data", response);
      setIsLoggedIn(false);
      setTimeout(() => {
        navigation.push("/login");
      }, 3000);
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

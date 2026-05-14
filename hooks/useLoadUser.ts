"use client";

import { useEffect } from "react";

import { useAuth } from "../auth/useAuth";
import axiosInstance from "@/API/axiosInstance";

export const useLoadUser = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        const user = res.data.data ?? res.data;
        setUser(user);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);
};

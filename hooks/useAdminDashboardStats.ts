"use client";

import axiosInstance from "@/API/axiosInstance";
import { useEffect, useState } from "react";


export type DashboardStats = {
  totalBooks: number;
  publishedBooks: number;
  draftBooks: number;
  totalUsers: number;
  pendingUsers: number;
  booksUploadedThisMonth: number;
  activeSubscriptionUsers:number;
  currentMonthRevenue:number;
};

export const useAdminDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/dashboard/stats");
        setStats(res.data.data); // 🔥 only stats object
      } catch (err) {
        console.error("Dashboard stats fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading };
};

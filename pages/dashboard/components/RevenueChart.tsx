"use client";


import axiosInstance from "@/API/axiosInstance";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart() {
  const [data, setData] = useState([
    { name: "Today", amount: 0 },
    { name: "This Month", amount: 0 },
    { name: "Last Month", amount: 0 },
  ]);

  useEffect(() => {
    fetchRevenueSummary();
  }, []);

  const fetchRevenueSummary = async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard/payment/summary");

      const summary = res.data.data;

      setData([
        {
          name: "Today",
          amount: summary.todayRevenue,
        },
        {
          name: "This Month",
          amount: summary.thisMonthRevenue,
        },
        {
          name: "Last Month",
          amount: summary.thisLastRevenue,
        },
      ]);
    } catch (err) {
      console.log("Revenue summary fetch failed", err);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-1 text-gray-700">💰 வருமான நிலை</h3>

      <p className="text-sm text-gray-500 mb-4">தினசரி / மாத வருமானம்</p>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="amount" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
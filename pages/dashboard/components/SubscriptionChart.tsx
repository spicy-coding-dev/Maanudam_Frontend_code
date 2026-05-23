"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axiosInstance from "@/API/axiosInstance";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444"]; // green, blue, orange

type SummaryResponse = {
  paidUsers: number;
  freeUsers: number;
  expiringSoon: number;
  expiredUsers: number;
};

export default function SubscriptionChart() {
  const [data, setData] = useState<
    { name: string; value: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/admin/dashboard/subs/summary"
      );
      console.log("this is testing",res)
      const summary: SummaryResponse = res.data?.data;

      // 🔥 PieChart format
      setData([
        { name: "Active Users", value: summary.paidUsers },
        { name: "Free Users", value: summary.freeUsers },
        { name: "Expiring Soon", value: summary.expiringSoon },
        {name:"Expired Users",value:summary.expiredUsers}
      ]);
    } catch (err) {
      console.error("Failed to load subscription summary", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-1 text-gray-700">💳 சந்தா நிலை</h3>
      <p className="text-sm text-gray-500 mb-4">
        Paid / Free / காலாவதி
      </p>

      {loading ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      ) : data.every((d) => d.value === 0) ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400">
          No data available
        </div>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

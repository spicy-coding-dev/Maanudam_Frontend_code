"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Today", amount: 2300 },
  { name: "This Month", amount: 48500 },
  { name: "Last Month", amount: 41200 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-1 text-gray-700">💰 வருமான நிலை</h3>
      <p className="text-sm text-gray-500 mb-4">
        தினசரி / மாத வருமானம்
      </p>

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

import type{ IconType } from "react-icons";

type StatCardProps = {
  title: string;
  value: number;
  icon: IconType;
  color?: "blue" | "green" | "orange" | "red";
};

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: "text-green-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    icon: "text-orange-600",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: "text-red-600",
  },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 shadow-sm`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${c.text}`}>{title}</p>
        <Icon className={`text-2xl ${c.icon}`} />
      </div>

      <h2 className="mt-3 text-2xl font-semibold text-gray-800">
        {value}
      </h2>
    </div>
 
  )}
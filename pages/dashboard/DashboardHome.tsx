"use client";

import StatCard from "./components/StatCard";
import SubscriptionChart from "./components/SubscriptionChart";
import RevenueChart from "./components/RevenueChart";
import { useAuth } from "../../auth/useAuth";
import { useAdminDashboardStats } from "../../hooks/useAdminDashboardStats";
import {
  FiBook,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiUpload,
  FiAlertCircle,
} from "react-icons/fi";

export default function DashboardHome() {
  const { user } = useAuth();

  const { stats, loading } = useAdminDashboardStats();
console.log(stats)
  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="text-red-500">Failed to load dashboard</p>;
  }

  console.log("user Name"+user)
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-2xl text-black font-semibold">
          வணக்கம்,{" "}
          <span className="text-[#1f3c88]">{user?.name ?? "நிர்வாகி"}</span>
        </h1>
        <p className="text-gray-500 mt-1">
          நிர்வாக கட்டுப்பாட்டு பலகை – அனைத்து செயல்பாடுகளின் சுருக்கம்
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="மொத்த புத்தகங்கள்"
          value={stats.totalBooks}
          icon={FiBook}
          color="blue"
        />

        <StatCard
          title="வெளியிடப்பட்டவை"
          value={stats.publishedBooks}
          icon={FiCheckCircle}
          color="green"
        />

        <StatCard
          title="வரைவு உள்ளடக்கம்"
          value={stats.draftBooks}
          icon={FiClock}
          color="orange"
        />

        <StatCard
          title="மொத்த பயனர்கள்"
          value={stats.totalUsers}
          icon={FiUsers}
          color="blue"
        />

        <StatCard
          title="செயலில் சந்தா"
          value={stats.activeSubscriptionUsers}
          icon={FiCreditCard}
          color="green"
        />

        <StatCard
          title="இந்த மாத வருமானம்"
          value={stats.currentMonthRevenue}
          icon={FiDollarSign}
          color="green"
        />

        <StatCard
          title="இந்த மாத பதிவுகள்"
          value={stats.booksUploadedThisMonth}
          icon={FiUpload}
          color="blue"
        />

        <StatCard
          title="அனுமதி காத்திருப்பு"
          value={stats.pendingUsers}
          icon={FiAlertCircle}
          color="red"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription */}
        <div className="lg:col-span-2">
          <SubscriptionChart />
        </div>

        {/* Quick Actions */}
        {/* <QuickActions /> */}
        <RevenueChart />
      </div>
    </div>
  );
}

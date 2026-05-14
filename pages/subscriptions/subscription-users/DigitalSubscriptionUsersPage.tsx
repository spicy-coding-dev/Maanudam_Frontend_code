import { useEffect, useState } from "react";

import SubscriptionFilter from "./SubscriptionFilter";
import SubscriptionUsersTable from "./SubscriptionUsersTable";
import type { SubscriptionStatus, SubscriptionUser } from "./types";
import CreateEmailModal from "../../users/CreateEmailModel";
import { FiPlus } from "react-icons/fi";
import axiosInstance from "@/API/axiosInstance";

export default function DigitalSubscriptionUsersPage() {
  const [users, setUsers] = useState<SubscriptionUser[]>([]);
  const [status, setStatus] = useState<SubscriptionStatus>("ACTIVE");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [status]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/subscriptions/users", {
        params: {
          status,
          type: "DIGITAL", // 🔥 DIGITAL ONLY
        },
      });

      setUsers(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 Search filter */
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1f3c88]">
          Digital சந்தா பயனர்கள்
        </h1>
        <p className="text-gray-500 mt-1">
          Active / Expired Digital Subscription Users
        </p>
      </div>

      {/* 🔍 Filter */}
      <SubscriptionFilter
        status={status}
        search={search}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
      />

      {/* 📋 Table */}
      {loading ? (
        <div className="bg-white p-8 rounded-xl text-center text-gray-500">
          பயனர்கள் ஏற்றப்படுகிறது...
        </div>
      ) : (
        <SubscriptionUsersTable users={filteredUsers} />
      )}
      <button
        onClick={() => setEmailOpen(true)}
        className="
    fixed bottom-6 right-6
    flex items-center gap-2
    bg-blue-600 text-white
    px-5 py-3
    rounded-xl shadow-lg
    hover:bg-blue-700 transition
  "
      >
        <FiPlus />
        <span>Create Email</span>
      </button>

      {emailOpen && (
        <CreateEmailModal
          targetType="DIGITAL_SUBSCRIPTION"
          onClose={() => setEmailOpen(false)}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

import SubscriptionFilter from "../subscription-users/SubscriptionFilter";
import PrintSubscriptionUsersTable from "./PrintSubscriptionUsersTable";
import type { SubscriptionStatus, PrintSubscriptionUser } from "./types";
import CreateEmailModal from "../../users/CreateEmailModel";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import axiosInstance from "@/API/axiosInstance";

export default function PrintSubscriptionUsersPage() {
  const [users, setUsers] = useState<PrintSubscriptionUser[]>([]);
  const [status, setStatus] = useState<SubscriptionStatus>("ACTIVE");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [status]);

  /* 🔥 FETCH USERS */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/subscriptions/users", {
        params: {
          status,
          type: "PRINT",
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

  /* 🔥 PRINT LABELS */
  const handlePrintLabels = async () => {
    try {
      const res = await axiosInstance.get("/admin/print/shipped/today", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `shipped_${new Date().toISOString().slice(0, 10)}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      console.error(e);
      // 🔥 HANDLE BLOB ERROR MESSAGE
      if (e.response?.data instanceof Blob) {
        const text = await e.response.data.text();
        try {
          const json = JSON.parse(text);
          toast.error(json.message || "Print failed ❌");
        } catch {
          toast.error("Print failed ❌");
        }
      } else {
        toast.error(e?.response?.message || "Print failed ❌");
      }
    }
  };

  /* 🔍 SEARCH FILTER */
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* 🔹 HEADER + BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1f3c88]">
            அச்சு சந்தா பயனர்கள்
          </h1>
          <p className="text-gray-500 mt-1">
            Address உடன் கூடிய Print Subscription Users
          </p>
        </div>

        <button
          onClick={handlePrintLabels}
          className="
            px-4 py-2
            bg-[#1f3c88]
            text-white
            rounded-md
            text-sm
            hover:bg-[#162d63]
            transition
            w-fit
          "
        >
          🖨️ Print Labels
        </button>
      </div>

      {/* 🔹 FILTER */}
      <SubscriptionFilter
        status={status}
        search={search}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
      />

      {/* 🔹 TABLE / LOADER */}
      {loading ? (
        <div className="bg-white p-8 rounded-xl text-center text-gray-500">
          பயனர்கள் ஏற்றப்படுகிறது...
        </div>
      ) : (
        <PrintSubscriptionUsersTable users={filteredUsers} />
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
          targetType="PRINT_SUBSCRIPTION"
          onClose={() => setEmailOpen(false)}
        />
      )}
    </div>
  );
}

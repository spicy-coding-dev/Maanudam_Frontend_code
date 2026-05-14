import { useEffect, useState } from "react";

import type { SingleMagazinePurchase } from "./types";
import SingleMagazineUsersTable from "./SingleMagazineUsersTable";
import toast from "react-hot-toast";
import CreateEmailModal from "../../users/CreateEmailModel";
import { FiPlus } from "react-icons/fi";
import axiosInstance from "@/API/axiosInstance";

export default function SingleMagazineUsersPage() {
  const [users, setUsers] = useState<SingleMagazinePurchase[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);

  /* 🔹 INITIAL LOAD – all purchases */
  useEffect(() => {
    fetchAll();
  }, []);

  /* 🔹 FETCH ALL */
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/subscriptions/magazine/users");
      setUsers(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 FETCH BETWEEN DATES */
  const fetchBetweenDates = async () => {
    if (!fromDate || !toDate) {
      toast.error("From & To date select pannunga ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.get("/subscriptions/between-dates", {
        params: {
          fromDate,
          toDate,
          // bookId optional – future use
        },
      });

      setUsers(res.data?.data || []);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Date range fetch failed");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 SEARCH FILTER (client-side) */
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.userName.toLowerCase().includes(q) ||
      u.userEmail.toLowerCase().includes(q) ||
      u.bookTitle.toLowerCase().includes(q) ||
      String(u.magazineNo).includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* 🔹 HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1f3c88]">
          தனி இதழ் சந்தா பயனர்கள்
        </h1>
        <p className="text-gray-500 mt-1">Individual Magazine Purchase Users</p>
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-xl border">
        {/* Search */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Search</label>
          <input
            type="text"
            placeholder="User / Email / Book / Magazine No"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-md w-64 text-gray-600"
          />
        </div>

        {/* From Date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border rounded-md text-gray-600"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border rounded-md text-gray-600"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={fetchBetweenDates}
            className="
              px-4 py-2
              bg-[#1f3c88]
              text-white
              rounded-md
              text-sm
              hover:bg-[#162d63]
            "
          >
            Filter
          </button>

          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
              fetchAll();
            }}
            className="
              px-4 py-2
              border
              rounded-md
              text-sm
              text-gray-800
              hover:bg-red-700 hover:text-white
              transition
            "
          >
            Reset
          </button>
        </div>
      </div>

      {/* 📋 TABLE */}
      {loading ? (
        <div className="bg-white p-8 rounded-xl text-center text-gray-500">
          தரவு ஏற்றப்படுகிறது...
        </div>
      ) : (
        <SingleMagazineUsersTable users={filteredUsers} />
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
    cursor-pointer
  "
      >
        <FiPlus />
        <span>Create Email</span>
      </button>

      {emailOpen && (
        <CreateEmailModal
          targetType="SINGLE_PURCHASE"
          onClose={() => setEmailOpen(false)}
        />
      )}
    </div>
  );
}

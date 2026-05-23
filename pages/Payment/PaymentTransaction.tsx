"use client";

import axiosInstance from "@/API/axiosInstance";
import { useEffect, useMemo, useState } from "react";

import { FiSearch, FiRefreshCw, FiDollarSign } from "react-icons/fi";

type Payment = {
  id: number;
  userName: string;
  email: string;

  paymentType: "SUBSCRIPTION" | "SINGLE_BOOK";

  amount: number;

  currency: string;

  razorpayPaymentId: string;

  razorpayOrderId: string;

  status: "SUCCESS" | "FAILED" | "PENDING";

  paymentDate: string;

  bookId?: number;

  subscriptionPlanId?: number;
};

export default function PaymentManagementPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchPayments();
  }, []);

  /* 🔥 FETCH PAYMENTS */
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/dashboard/payments");

      setPayments(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 FILTER + SEARCH */
  const filteredPayments = useMemo(() => {
    let data = [...payments];

    /* 🔍 SEARCH */
    if (search.trim()) {
      const q = search.toLowerCase();

      data = data.filter((p) => {
        return (
          p.userName.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.amount.toString().includes(q) ||
          p.razorpayPaymentId.toLowerCase().includes(q)
        );
      });
    }

    /* 📅 FROM DATE */
    if (fromDate) {
      data = data.filter((p) => new Date(p.paymentDate) >= new Date(fromDate));
    }

    /* 📅 TO DATE */
    if (toDate) {
      data = data.filter(
        (p) => new Date(p.paymentDate) <= new Date(toDate + "T23:59:59"),
      );
    }

    /* 💰 TOTAL */
    const total = data.reduce((sum, item) => sum + item.amount, 0);

    setTotalAmount(total);

    return data;
  }, [payments, search, fromDate, toDate]);

  return (
    <div className="space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1f3c88]">
            கட்டண மேலாண்மை
          </h1>

          <p className="text-gray-500 mt-1">அனைத்து Payment Transactions</p>
        </div>

        <button
          onClick={fetchPayments}
          className="
            flex items-center gap-2
            bg-[#1f3c88]
            text-white
            px-4 py-2
            rounded-lg
            hover:bg-[#162d63]
            transition
            w-fit
          "
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {/* 🔥 SUMMARY CARD */}
      <div
        className="
          bg-gradient-to-r
          from-green-600
          to-green-500
          text-white
          rounded-2xl
          p-6
          shadow
        "
      >
        <div className="flex items-center gap-3">
          <FiDollarSign className="text-3xl" />

          <div>
            <p className="text-sm opacity-90">Filtered Revenue</p>

            <h2 className="text-3xl font-bold mt-1">
              ₹{totalAmount.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      {/* 🔥 FILTERS */}
      <div
        className="
          bg-white
          rounded-xl
          p-4
          shadow-sm
          grid
          grid-cols-1
          md:grid-cols-4
          gap-4
           text-gray-800
        "
      >
        {/* SEARCH */}
        <div className="relative ">
          <FiSearch
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="பெயர் / Email / Amount / Payment Id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border
              rounded-lg
              pl-10
              pr-3
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-300
            "
          />
        </div>

        {/* FROM DATE */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="
            border
            rounded-lg
            px-3
            py-2
            outline-none
            focus:ring-2
            focus:ring-blue-300
          "
        />

        {/* TO DATE */}
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="
            border
            rounded-lg
            px-3
            py-2
            outline-none
            focus:ring-2
            focus:ring-blue-300
          "
        />

        {/* TOTAL TRANSACTIONS */}
        <div
          className="
            bg-blue-50
            rounded-lg
            flex
            items-center
            justify-center
            text-[#1f3c88]
            font-semibold
          "
        >
          Transactions : {filteredPayments.length}
        </div>
      </div>

      {/* 🔥 TABLE */}
      <div
        className="
          bg-white
          rounded-xl
          border
          overflow-x-auto
          shadow-sm
        "
      >
        <table className="w-full text-sm">
          <thead
            className="
              bg-[#1f3c88]
              text-white
            "
          >
            <tr>
              <th className="px-4 py-3 text-left">User</th>

              <th className="px-4 py-3 text-left">Type</th>

              <th className="px-4 py-3 text-left">Amount</th>

              <th className="px-4 py-3 text-left">Status</th>

              <th className="px-4 py-3 text-left">Payment ID</th>

              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    text-center
                    py-10
                    text-gray-500
                  "
                >
                  Payments loading...
                </td>
              </tr>
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    text-center
                    py-10
                    text-gray-500
                  "
                >
                  No payments found
                </td>
              </tr>
            ) : (
              filteredPayments.map((p) => (
                <tr
                  key={p.id}
                  className="
                    border-b
                    hover:bg-gray-50
                  "
                >
                  {/* USER */}
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-800">{p.userName}</div>

                    <div className="text-xs text-gray-500">{p.email}</div>
                  </td>

                  {/* TYPE */}
                  <td className="px-4 py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${
                          p.paymentType === "SUBSCRIPTION"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }
                      `}
                    >
                      {p.paymentType}
                    </span>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-4 py-4 font-semibold text-green-600">
                    ₹{p.amount}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${
                          p.status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* PAYMENT ID */}
                  <td className="px-4 py-4">
                    <div className="max-w-[180px] truncate text-gray-500">
                      {p.razorpayPaymentId}
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-4 text-gray-500">
                    {new Date(p.paymentDate).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
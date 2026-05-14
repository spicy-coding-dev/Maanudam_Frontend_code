import axiosInstance from "@/API/axiosInstance";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

/* 🔹 TYPES */
type IssueStatus = "PENDING" | "SHIPPED" | "DELIVERED";

type Issue = {
  deliveryId: number;
  deliveryDate: string;
  status: IssueStatus;
  magazineNo: number | null;
  courierName: string | null;
  issuedBy: string | null;
};

type Props = {
  subscriptionId: number; // ✅ CORRECT PARAM
  onClose: () => void;
};

export default function PrintIssuesModal({ subscriptionId, onClose }: Props) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const statusStyles: Record<IssueStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    SHIPPED: "bg-blue-100 text-blue-700 border-blue-300",
    DELIVERED: "bg-green-100 text-green-700 border-green-300",
  };

  const COURIERS = [
    "India Post",
    "DTDC",
    "Professional",
    "Blue Dart",
    "Delhivery",
    "XpressBees",
    "Ecom Express",
  ];

  /* 🔹 FETCH ISSUES */
  useEffect(() => {
    fetchIssues(subscriptionId);
  }, [subscriptionId]);

  const fetchIssues = async (id: number) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/print/issues", {
        params: {
          id, // 🔥 backend @RequestParam Long id
        },
      });

      const data = res.data?.data ?? res.data;

      setIssues(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 STATUS UPDATE – ROW SAFE */
  const updateStatus = async (deliveryId: number, newStatus: IssueStatus) => {
    const issue = issues.find((i) => i.deliveryId === deliveryId);
    if (!issue) return;

    if (newStatus !== "DELIVERED") {
      if (!issue.magazineNo || !issue.courierName) {
        toast.error(
          "இதழ் எண் (Magazine No) & கூரியர் நிறுவனத்தின் பெயர் கட்டாயம் ❗",
        );
        return;
      }
    }

    const toastId = toast.loading(
      "இதழ் விநியோக நிலை புதுப்பிக்கப்படுகிறது....",
    );

    try {
      const res = await axiosInstance.put(`/admin/update/${deliveryId}`, {
        magazineNo: issue.magazineNo,
        courierName: issue.courierName,
        deliveryDate: issue.deliveryDate,
        status: newStatus,
      });

      // 🔥 backend message priority
      const msg =
        res.data?.message || // ApiResponse case
        res.data || // plain string case
        "Status Updated ✅";

      toast.success(msg, { id: toastId });

      setIssues((prev) =>
        prev.map((i) =>
          i.deliveryId === deliveryId ? { ...i, status: newStatus } : i,
        ),
      );
    } catch (e: any) {
      toast.error(
        e?.response?.data?.message || e?.response?.data || "Update failed ❌",
        { id: toastId },
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1f3c88]">
            Print Subscription – Delivery Schedule
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading issues...</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-gray-50">
                <tr>
                  <th>Delivery Date</th>
                  <th>Status</th>
                  <th>Magazine No</th>
                  <th>Courier</th>
                  <th>Issued By</th>
                </tr>
              </thead>

              <tbody>
                {issues.map((i) => (
                  <tr key={i.deliveryId} className="border-t">
                    <td>
                      <input
                        type="date"
                        value={i.deliveryDate}
                        disabled={i.status !== "PENDING"}
                        onChange={(e) =>
                          setIssues((prev) =>
                            prev.map((x) =>
                              x.deliveryId === i.deliveryId
                                ? {
                                    ...x,
                                    deliveryDate: e.target.value,
                                  }
                                : x,
                            ),
                          )
                        }
                        className="border px-2 py-1 rounded"
                      />
                    </td>

                    {/* 🔥 STATUS COLUMN */}
                    <td className="text-center">
                      {i.status === "DELIVERED" ? (
                        /* ✅ FINAL STATE – BADGE ONLY */
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium
        ${statusStyles.DELIVERED}`}
                        >
                          DELIVERED
                        </span>
                      ) : (
                        /* 🔁 PENDING / SHIPPED – DROPDOWN */
                        <select
                          value={i.status}
                          onChange={(e) =>
                            updateStatus(
                              i.deliveryId,
                              e.target.value as IssueStatus,
                            )
                          }
                          className={`px-2 py-1 text-xs rounded border
        ${statusStyles[i.status]}`}
                        >
                          {/* current status */}
                          <option value={i.status}>{i.status}</option>

                          {/* allowed transitions */}
                          {i.status === "PENDING" && (
                            <>
                              <option value="SHIPPED">SHIPPED</option>
                              <option value="DELIVERED">DELIVERED</option>
                            </>
                          )}

                          {i.status === "SHIPPED" && (
                            <option value="DELIVERED">DELIVERED</option>
                          )}
                        </select>
                      )}
                    </td>

                    <td>
                      <input
                        type="number"
                        value={i.magazineNo ?? ""}
                        disabled={i.status !== "PENDING"}
                        onChange={(e) =>
                          setIssues((prev) =>
                            prev.map((x) =>
                              x.deliveryId === i.deliveryId
                                ? {
                                    ...x,
                                    magazineNo: Number(e.target.value),
                                  }
                                : x,
                            ),
                          )
                        }
                        className="border w-24 px-2 py-1 rounded"
                      />
                    </td>

                    <td>
                      <select
                        value={i.courierName ?? ""}
                        disabled={i.status !== "PENDING"}
                        onChange={(e) =>
                          setIssues((prev) =>
                            prev.map((x) =>
                              x.deliveryId === i.deliveryId
                                ? {
                                    ...x,
                                    courierName: e.target.value,
                                  }
                                : x,
                            ),
                          )
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">Select</option>
                        {COURIERS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="text-gray-500">{i.issuedBy || "Auto"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

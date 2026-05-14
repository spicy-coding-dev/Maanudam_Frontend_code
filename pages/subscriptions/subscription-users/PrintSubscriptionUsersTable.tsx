import { useState } from "react";
import type { PrintSubscriptionUser } from "./types";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import PrintIssuesModal from "./PrintIssuesModel";

type Props = {
  users: PrintSubscriptionUser[];
};

export default function PrintSubscriptionUsersTable({ users }: Props) {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [issueSubscriptionId, setIssueSubscriptionId] = useState<number | null>(
    null,
  );

  if (users.length === 0) {
    return (
      <p className="text-gray-400 text-center py-10">
        இந்த சந்தாவில் பயனர்கள் இல்லை
      </p>
    );
  }

  return (
    <>
      {/* TABLE */}
      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-black">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3 text-left">பயனர் எண்</th>
              <th className="px-4 py-3 text-left">பெயர்</th>
              <th className="px-4 py-3 text-left">மின்னஞ்சல்</th>
              <th className="px-4 py-3">திட்டம்</th>
              <th className="px-4 py-3">சந்தா நிலை</th>
              <th className="px-4 py-3">தொடக்கம்</th>
              <th className="px-4 py-3">முடிவு</th>
              <th className="px-4 py-3 text-center">Issues</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const open = openRow === u.userId;

              return (
                <FragmentRow
                  key={u.userId}
                  user={u}
                  open={open}
                  onToggle={() => setOpenRow(open ? null : u.userId)}
                  onViewIssues={() => setIssueSubscriptionId(u.subscriptionId)}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔥 ISSUES MODAL */}
      {issueSubscriptionId && (
        <PrintIssuesModal
          subscriptionId={issueSubscriptionId} // ✅ CORRECT
          onClose={() => setIssueSubscriptionId(null)}
        />
      )}
    </>
  );
}

/* 🔹 Row + Expand Fragment */
function FragmentRow({
  user,
  open,
  onToggle,
  onViewIssues,
}: {
  user: PrintSubscriptionUser;
  open: boolean;
  onToggle: () => void;
  onViewIssues: () => void;
}) {
  return (
    <>
      {/* MAIN ROW */}
      <tr className="border-t hover:bg-gray-50 text-gray-700">
        <td className="px-4 py-3 text-center ">
          <button onClick={onToggle}>
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </td>

        <td className="px-4 py-3">{user.userId}</td>
        <td className="px-4 py-3">{user.name}</td>
        <td className="px-4 py-3">{user.email}</td>

        <td className="px-4 py-3 hidden sm:table-cell text-center">
          <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
            {user.planName}
          </span>
        </td>

        <td className="px-4 py-3 text-center">
          <span
            className={`px-2 py-1 rounded-full text-xs
              ${
                user.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
          >
            {user.status}
          </span>
        </td>

        <td className="px-4 py-3 text-center">{user.startDate}</td>
        <td className="px-4 py-3 text-center">{user.endDate}</td>

        <td className="px-4 py-3 text-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // 🔥 VERY IMPORTANT
              onViewIssues();
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-md
    bg-[#1f3c88] text-white hover:bg-[#162d63] transition"
          >
            View Issues
          </button>
        </td>
      </tr>

      {/* 🔽 ADDRESS EXPAND */}
      {open && (
        <tr className="bg-gray-50">
          <td colSpan={9} className="px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <p>
                <b>முகவரி வகை:</b> {user.address.name}
              </p>
              <p>
                <b>மொபைல்:</b> {user.address.mobile}
              </p>
              <p className="sm:col-span-2">
                <b>முகவரி:</b> {user.address.addressLine}, {user.address.city},{" "}
                {user.address.state} - {user.address.pincode}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// src/pages/subscriptions/SubscriptionTable.tsx

import { FiEdit } from "react-icons/fi";
import type { SubscriptionPlan } from "./types";

type Props = {
  plans?: SubscriptionPlan[];
  onEdit: (plan: SubscriptionPlan) => void;
};

export default function SubscriptionTable({
  plans = [],
  onEdit,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
      <table className="min-w-[700px] w-full text-sm">
        <thead className="bg-gray-50 text-gray-900">
          <tr>
            <th className="px-4 py-3 text-left">Plan Code</th>
            <th className="px-4 py-3 text-left">பெயர்</th>
            <th className="px-4 py-3 text-left hidden sm:table-cell">
              வகை
            </th>
            <th className="px-4 py-3 text-left hidden md:table-cell">
              கால அளவு
            </th>
            <th className="px-4 py-3 text-left">விலை</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr
              key={plan.planCode}
              className="border-t hover:bg-gray-50 transition text-gray-700"
            >
              <td className="px-4 py-3 font-medium">
                {plan.planCode}
              </td>

              <td className="px-4 py-3">{plan.name}</td>

              <td className="px-4 py-3 hidden sm:table-cell">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {plan.type}
                </span>
              </td>

              <td className="px-4 py-3 hidden md:table-cell">
                {plan.durationYears} ஆண்டு
              </td>

              <td className="px-4 py-3 font-semibold">
                ₹{plan.price.toLocaleString()}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  {/* EDIT */}
                  <button
                    className="text-blue-600 hover:scale-110 transition"
                    onClick={() => onEdit(plan)}
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {plans.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-6 text-gray-400"
              >
                சந்தா தகவல்கள் இல்லை
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

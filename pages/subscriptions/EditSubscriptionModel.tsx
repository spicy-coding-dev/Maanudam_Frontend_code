import { useState } from "react";

import type { SubscriptionPlan } from "./types";
import toast from "react-hot-toast";
import axiosInstance from "@/API/axiosInstance";

type Props = {
  plan: SubscriptionPlan;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditSubscriptionModal({
  plan,
  onClose,
  onUpdated,
}: Props) {
  const [form, setForm] = useState<SubscriptionPlan>(plan);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "active"
          ? value === "true" // 👈 string → boolean
          : value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  const toastId = toast.loading("சந்தா புதுப்பிக்கப்படுகிறது...");

  try {
    setLoading(true);

    const res = await axiosInstance.patch(
      `/subscriptions/update/${form.planCode}`,
      form
    );

    // 🔥 backend message priority
    const message =
      res.data?.message ||   // ApiResponse case
      res.data ||            // plain string case
      "சந்தா வெற்றிகரமாக புதுப்பிக்கப்பட்டது";

    toast.success(message, { id: toastId });

    onUpdated();
    onClose();
  } catch (e: any) {
    toast.error(
      e?.response?.data?.message ||
      e?.response?.data ||
      "Update failed ❌",
      { id: toastId }
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#1f3c88]">
          சந்தா மாற்றம்
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Plan Code */}
          <div>
            <label className="label">Plan Code</label>
            <input
              name="planCode"
              value={form.planCode}
              disabled
              className="input bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Plan Name */}
          <div>
            <label className="label">Plan Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter plan name"
            />
          </div>

          {/* Type */}
          <div>
            <label className="label">Plan Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select type</option>
              <option value="PRINT">PRINT</option>
              <option value="DIGITAL">DIGITAL</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="label">Duration (Years)</label>
            <input
              type="number"
              name="durationYears"
              value={form.durationYears}
              onChange={handleChange}
              className="input"
              placeholder="Eg: 1, 2, 3"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input"
              placeholder="Eg: 499"
            />
          </div>

          {/* Status */}
          <div>
            <label className="label">Status</label>
            <select
              name="active"
              value={String(form.active)} // 👈 important
              onChange={handleChange}
              className="input"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import type { User } from "./types";
import axiosInstance from "@/API/axiosInstance";


type Props = {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
};

export default function BlockUserModal({
  user,
  onClose,
  onSuccess,
}: Props) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const isBlocking = user.status !== "BLOCKED";

  const handleConfirm = async () => {
    if (reason.trim().length > 50) {
      setError("குறைந்தது 50 எழுத்துகள் காரணமாக வழங்க வேண்டும்");
      return;
    }

    try {
      await axiosInstance.patch(`/admin/users/${user.id}/block-toggle`, {
        reason,
      });
      onSuccess();
      onClose();
    } catch {
      alert("Action failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3 text-red-600">
          {isBlocking ? "பயனர் தடை" : "பயனர் மீண்டும் செயல்படுத்தல்"}
        </h2>

        <p className="text-gray-600 mb-4">
          <b>{user.name}</b> –
          {isBlocking
            ? " இந்த பயனரை தடுக்க காரணம் அளிக்கவும்"
            : " இந்த பயனரை மீண்டும் செயல்படுத்த காரணம் அளிக்கவும்"}
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="input"
          placeholder="குறைந்தது 50 எழுத்துகள்..."
        />

        <div className="text-sm text-gray-500 mt-1">
          எழுத்துகள்: {reason.length}
        </div>

        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

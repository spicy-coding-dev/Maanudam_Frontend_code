import axiosInstance from "@/API/axiosInstance";
import { useState } from "react";


type MailTargetType =
  | "ACCOUNT_STATUS"
  | "DIGITAL_SUBSCRIPTION"
  | "PRINT_SUBSCRIPTION"
  | "SINGLE_PURCHASE";

type Props = {
  onClose: () => void;
  targetType: MailTargetType; // 🔥 MUST COME FROM PARENT
};

export default function CreateEmailModal({ onClose, targetType }: Props) {
  const [toStatus, setToStatus] = useState("PENDING");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      // 🔥 REQUIRED
      formData.append("targetType", targetType);

      formData.append("status", toStatus); // ACTIVE / INACTIVE

      formData.append("subject", subject);
      formData.append("content", content);

      if (file) {
        formData.append("file", file);
      }

      console.log("📎 File:", file);

      await axiosInstance.post("/email/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Email sent successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-[#1f3c88] mb-4">
          Create Email
        </h2>

        {/* To */}
        {targetType === "ACCOUNT_STATUS" && (
          <div className="mb-4">
            <label className="label">User Status</label>
            <select
              value={toStatus}
              onChange={(e) => setToStatus(e.target.value)}
              className="input"
            >
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
        )}

        {/* Subject */}
        <div className="mb-4">
          <label className="label">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
            placeholder="Email subject"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="input"
            placeholder="Email content"
          />
        </div>

        {/* Attachment */}
        <div className="mb-4">
          <label className="label">Attachment (Optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="input"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded bg-red-700 cursor-pointer">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

import type { User } from "./types";
import { FiLock, FiUnlock, FiPlus } from "react-icons/fi";
import BlockUserModal from "./BlockUserModel";
import CreateEmailModal from "./CreateEmailModel";
import axiosInstance from "@/API/axiosInstance";

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [blockUser, setBlockUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/all-users");

      // 🔥 FIX HERE (Pageable response)
      setUsers(res.data?.content || []);
    } catch (e) {
      console.error(e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1f3c88]">
          அனைத்து பயனர்கள்
        </h1>
        <p className="text-gray-500">
          அனைத்து பதிவு செய்யப்பட்ட பயனர்கள் பட்டியல்
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <input
          placeholder="பெயர் / மின்னஞ்சல் மூலம் தேடுக"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input max-w-sm"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input max-w-xs"
        >
          <option value="ALL">அனைத்து நிலைகள்</option>
          <option value="ACTIVE">செயலில்</option>
          <option value="PENDING">நிலுவையில்</option>
          <option value="BLOCKED">தடைசெய்யப்பட்டது</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white p-6 rounded text-center text-gray-500">
          Loading users...
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">பயனர் எண்</th>
                <th className="px-4 py-3 text-left">பெயர்</th>
                <th className="px-4 py-3 text-left">மின்னஞ்சல்</th>
                <th className="px-4 py-3 text-left">மொபைல்</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">
                  மின்னஞ்சல் சரிப்பார்ப்பு
                </th>
                <th className="px-4 py-3 text-left">பயனர் இணைந்த தேதி</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t text-gray-800 hover:bg-gray-50">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.mobile}</td>
                  <td className="px-4 py-3">{user.role}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : user.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        user.emailVerified
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
                    >
                      {user.emailVerified
                        ? "முடிக்கப்பட்டது"
                        : "முடிக்கப்படவில்லை"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString("ta-IN")}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setBlockUser(user)}
                        className="text-red-600"
                      >
                        {user.status === "BLOCKED" ? <FiUnlock /> : <FiLock />}
                      </button>
                      {blockUser && (
                        <BlockUserModal
                          user={blockUser}
                          onClose={() => setBlockUser(null)}
                          onSuccess={fetchUsers}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    பயனர்கள் இல்லை
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
              targetType="ACCOUNT_STATUS"
              onClose={() => setEmailOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

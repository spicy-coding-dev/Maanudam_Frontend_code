import type { SubscriptionUser } from "./types";

export default function SubscriptionUsersTable({
  users,
}: {
  users: SubscriptionUser[];
}) {
  if (users.length === 0) {
    return (
      <p className="text-gray-400 text-center py-10">
        இந்த சந்தாவில் பயனர்கள் இல்லை
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">பயனர் எண்</th>
            <th className="px-4 py-3 text-left">பெயர்</th>
            <th className="px-4 py-3 text-left">மின்னஞ்சல்</th>
            <th className="px-4 py-3">திட்டம்</th>
            <th className="px-4 py-3">சந்தா நிலை</th>
            <th className="px-4 py-3">தொடக்கம்</th>
            <th className="px-4 py-3">முடிவு</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId} className="border-t hover:bg-gray-50 text-gray-800">
              <td className="px-4 py-3">{u.userId}</td>
              <td className="px-4 py-3">{u.name}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {u.planName}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${"bg-green-100 text-green-700"}`}
                >
                  {u.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">{u.startDate}</td>
              <td className="px-4 py-3 text-center">{u.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

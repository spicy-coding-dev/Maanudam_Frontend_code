import type { SingleMagazinePurchase } from "./types";

export default function SingleMagazineUsersTable({
  users,
}: {
  users: SingleMagazinePurchase[];
}) {
  if (users.length === 0) {
    return (
      <p className="text-gray-400 text-center py-10">
        தனி இதழ் வாங்கிய பயனர்கள் இல்லை
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-900">
          <tr>
            <th className="px-4 py-3 text-left">Purchase ID</th>
            <th className="px-4 py-3 text-left">பயனர்</th>
            <th className="px-4 py-3 text-left">மின்னஞ்சல்</th>
            <th className="px-4 py-3">மொபைல்</th>
            <th className="px-4 py-3 text-left">இதழ் பெயர்</th>
            <th className="px-4 py-3">Magazine No</th>
            <th className="px-4 py-3">விலை (₹)</th>
            <th className="px-4 py-3">வாங்கிய தேதி</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.purchaseId} className="border-t hover:bg-gray-50 text-gray-700">
              <td className="px-4 py-3">{u.purchaseId}</td>
              <td className="px-4 py-3">
                {u.userName} <br />
                <span className="text-xs text-gray-500">
                  ID: {u.userId}
                </span>
              </td>
              <td className="px-4 py-3">{u.userEmail}</td>
              <td className="px-4 py-3 text-center">{u.mobile}</td>
              <td className="px-4 py-3">{u.bookTitle}</td>
              <td className="px-4 py-3 text-center">
                {u.magazineNo}
              </td>
              <td className="px-4 py-3 text-center font-medium text-green-700">
                ₹ {u.price}
              </td>
              <td className="px-4 py-3 text-center text-gray-600">
                {new Date(u.purchasedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

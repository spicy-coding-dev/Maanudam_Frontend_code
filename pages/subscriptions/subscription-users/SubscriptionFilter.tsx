import type { SubscriptionStatus } from "./types";

type Props = {
  status: SubscriptionStatus;
  search: string;
  onStatusChange: (v: SubscriptionStatus) => void;
  onSearchChange: (v: string) => void;
};

export default function SubscriptionFilter({
  status,
  search,
  onStatusChange,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border">
      {/* 🔍 Search */}
      <input
        type="text"
        value={search}
        
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="பெயர் / மின்னஞ்சல் தேடவும்..."
        className="w-full sm:flex-1 px-4 py-2 border rounded-md text-black"
      />

      {/* 🔄 Status */}
      <select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value as SubscriptionStatus)
        }
        className="px-4 py-2 border rounded-md sm:w-[180px] text-black"
      >
        <option value="ACTIVE">Active</option>
        <option value="EXPIRED">Expired</option>
      </select>
    </div>
  );
}

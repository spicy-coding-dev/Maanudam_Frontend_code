"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

type SubItem = {
  label: string;
  to: string;
};

type Props = {
  icon: React.ReactNode;
  text: string;
  items: SubItem[];
  onClose?: () => void;
};

export default function SidebarDropdown({
  icon,
  text,
  items,
  onClose,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-2">
      {/* Parent */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-4 py-3 rounded-lg
                   hover:bg-white/20 transition text-left"
      >
        {icon}
        <span>{text}</span>

        <FiChevronDown
          className={`ml-auto transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="ml-10 mt-1 space-y-1">
          {items.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={onClose}
              className="block px-3 py-2 text-sm rounded-md
                         hover:bg-white/20 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

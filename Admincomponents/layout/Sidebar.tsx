"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBook,
  FiFileText,
  FiUsers,
  FiCreditCard,
  FiSettings,
  FiUpload,
  FiX,
} from "react-icons/fi";

import SidebarDropdown from "../SidebarDropDown";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-[260px] bg-[#2f5aa8] text-white px-5 py-6 overflow-y-auto scrollbar-hide">
      {/* Mobile Close */}
      {onClose && (
        <div className="flex justify-end mb-4 md:hidden">
          <button onClick={onClose} className="text-2xl">
            <FiX />
          </button>
        </div>
      )}

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <Image
          src="/MaanudamLogo.jpeg"
          width={40}
          height={40}
          alt="Logo"
          className="w-50 h-auto rounded-4xl"
        />
      </div>

      {/* Menu */}
      <SidebarLink href="/admin/dashboard" icon={<FiHome />} text="முகப்பு" />

      <SidebarLink
        href="/admin/magazines/magazine"
        icon={<FiFileText />}
        text="இதழ்கள்"
      />

      {/* 📘 Books Dropdown */}
      <SidebarDropdown
        icon={<FiBook />}
        text="கட்டுரைகள்"
        onClose={onClose}
        items={[
          { label: "வரலாறு", to: "/admin/books/history" },
          { label: "சமூகம்", to: "/admin/books/society" },
          { label: "இலக்கியம்", to: "/admin/books/literature" },
          { label: "பண்பாடு", to: "/admin/books/culture" },
          { label: "சூழலியல்", to: "/admin/books/environment" },
          { label: "தலையங்கம்", to: "/admin/books/editorial" },
          { label: "சினிமா", to: "/admin/books/cinema" },
        ]}
      />

      {/* 👥 Users Dropdown */}
      <SidebarDropdown
        icon={<FiUsers />}
        text="பயனர்கள்"
        onClose={onClose}
        items={[
          { label: "அனைத்து பயனர்கள்", to: "/admin/users" },
          { label: "பயனர் இணைக்க", to: "/admin/users/add" },
        ]}
      />

      {/* 💳 Subscription */}
      <SidebarDropdown
        icon={<FiCreditCard />}
        text="சந்தா / கட்டணம்"
        onClose={onClose}
        items={[
          { label: "சந்தா பட்டியல்", to: "/admin/subscriptions" },
          {
            label: "டிஜிட்டல் சந்தா பயனர்கள்",
            to: "/admin/subscription/digi/users",
          },
          {
            label: "அச்சு சந்தா பயனர்கள்",
            to: "/admin/subscription/print/users",
          },
          {
            label: "தனி இதழ் சந்தா பயனர்கள்",
            to: "/admin/single/magazine/users",
          },
        ]}
      />

      {/* Upload */}
      <SidebarDropdown
        icon={<FiUpload />}
        text="பதிவேற்றம்"
        onClose={onClose}
        items={[
          { label: "முகப்பு பதிவேற்றம்", to: "/admin/upload" },
          { label: "உள்ளடக்கம் பதிவேற்றம்", to: "/admin/upload/content" },
        ]}
      />

      <SidebarLink href="/settings" icon={<FiSettings />} text="அமைப்புகள்" />
    </aside>
  );
  
}

/* 🔗 Sidebar Link (NavLink replacement) */
function SidebarLink({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-4 py-3 mb-2 rounded-lg transition
        ${isActive ? "bg-white/25" : "hover:bg-white/20"}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

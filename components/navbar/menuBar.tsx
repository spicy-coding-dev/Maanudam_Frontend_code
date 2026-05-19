"use client";

import { Search, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { slug: "", label: "முகப்பு" },
  { slug: "history", label: "வரலாறு" },
  { slug: "society", label: "சமூகம்" },
  { slug: "literature", label: "இலக்கியம்" },
  { slug: "culture", label: "பண்பாடு" },
  { slug: "environment", label: "சூழலியல்" },
  { slug: "editorial", label: "தலையங்கம்" },
  { slug: "cinema", label: "நூல் மதிப்புரை" },
  { slug: "magazine", label: "இதழ்கள்" },
];

export default function MenuBar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-black p-5 hidden lg:block shadow-[#d4af37] shadow-sm">
      <div className=" flex items-center justify-between px-4 gap-6">
        <Link href="/">
          <Image
            src="/MaanudamLogo.jpeg"
            alt="Maanudam Logo"
            width={50}
            height={50}
            priority
            className="object-contain w-50 rounded-full" 
          />
        </Link>
        {/* Menu */}
        <div className="flex gap-8 items-center tracking-wide font-semibold text-lg">
          {navItems.map((item) => {
            const href = item.slug ? `/category/${item.slug}` : "/";

            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));

            return (
              <div key={item.slug} className="group relative">
                <Link
                  href={href}
                  className={`transition-colors duration-300
                    ${
                      isActive
                        ? "text-[#d4af37]"
                        : "text-[#f5e6c8]/80 hover:text-[#d4af37]"
                    }`}
                >
                  {item.label}
                </Link>

                <span
                  className="
                  absolute left-0 -bottom-1 h-[1px] w-0
                  bg-[#d4af37]
                  transition-all duration-300
                  group-hover:w-full
                "
                />
              </div>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex ml-10 items-center gap-6 text-[#9b9b99]">
          <Link
            href="/plan-subscription"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Mail size={18} />
            <span className="font-medium">Subscribe</span>
          </Link>

          <Search
            size={20}
            className="cursor-pointer"
            onClick={() => router.push("/search")}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, User } from "lucide-react";

const navItems = [
  { name: "முகப்பு", slug: "" },
  { name: "வரலாறு", slug: "history" },
  { name: "சமூகம்", slug: "society" },
  { name: "இலக்கியம்", slug: "literature" },
  { name: "பண்பாடு", slug: "culture" },
  { name: "சூழலியல்", slug: "environment" },
  { name: "தலையங்கம்", slug: "editorial" },
  { name: "இதழ்கள்", slug: "magazine" },
];

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* MOBILE TOP BAR */}
      <header className="fixed top-0 left-0 w-full bg-white z-50 lg:hidden">
        <div className="flex items-center justify-between h-20 px-4 py-3 shadow-sm">

          {/* Search */}
          <button>
            <Search className="w-5 h-5 text-black" />
          </button>

          {/* Logo */}
          <Link href="/">
            <img
              src="/MaanudamLogo.jpeg"
              alt="logo"
              className="h-20 w-20  "
            />
          </Link>

          {/* Profile + Menu */}
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/login")}>
              <User className="w-5 h-5 text-black" />
            </button>

            <button onClick={() => setOpen(true)}>
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL SCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-[999] md:hidden"
          >
            {/* Close */}
            <div className="flex justify-end p-4">
              <button onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex flex-col px-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={
                    item.slug
                      ? `/category/${item.slug}`
                      : "/"
                  }
                  onClick={() => setOpen(false)}
                  className="py-4 text-lg font-medium border-b border-gray-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

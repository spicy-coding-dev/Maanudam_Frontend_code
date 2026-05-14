"use client";

import { useState } from "react";
import Sidebar from "@/Admincomponents/layout/Sidebar";
import Header from "@/Admincomponents/layout/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-slate-100 overflow-x-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 z-50 h-full md:hidden
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Right Side */}
          <div className="flex flex-col flex-1 w-full min-w-0">
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
              {children} {/* 👈 Outlet replacement */}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

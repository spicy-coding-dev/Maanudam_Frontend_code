import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdminLayout from "@/Admincomponents/layout/AdminLayout";
import PopupContainer from "@/components/PopuContainer";
import Providers from "./dashboard/providers";
// import Providers from "./providers";
// import AdminLayout from "@/components/layout/AdminLayout";
// import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magazine Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AdminLayout>
        {children}
        <PopupContainer />
      </AdminLayout>
    </Providers>
  );
}

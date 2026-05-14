import Navbar from "@/components/navbar/navbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import Footer from "@/components/footer/Footer";
import { HomeProvider } from "../Context/HomeContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MobileNavbar />

      <HomeProvider>{children}</HomeProvider>

      <Footer />
    </>
  );
}

import { useAuth } from "@/app/Context/AuthContext";
import { FiMenu } from "react-icons/fi";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {

  const {logout} = useAuth()
  return (
    <header className="w-full h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <button
        className="md:hidden text-2xl text-[#1f3c88]"
        onClick={onMenuClick}
      >
        <FiMenu />
      </button>

      <div className="flex items-center gap-6 ml-auto">
        <span className="font-medium text-[#1f3c88]">நிர்வாகி</span>
        <button className="font-medium text-[#1f3c88] hover:underline" 
         onClick={logout}>
          Logout
        </button>
      </div>

    </header>
  );
}

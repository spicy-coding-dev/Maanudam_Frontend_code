
import Image from "next/image";
import LoginFrom from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-15">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
        {/* LEFT – Book */}
        <div className="relative md:w-1/2 bg-white flex items-center justify-center p-6">
          <Image src="/MaanudamLogo.jpeg"    width={80}
            height={80} alt="Logo" className="absolute top-6 left-6 w-20" />

          <Image
            src="/loginBookImg.png"
            alt="Book"
            width={400}
            height={400}
            className="scale-[1.5] object-contain"
          />

          <div className="hidden md:block absolute right-0 top-0 h-full w-10 bg-black brush-cut" />
        </div>

        {/* RIGHT – Login */}
        <div className="md:w-1/2 flex items-center justify-center p-6">
          <LoginFrom />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

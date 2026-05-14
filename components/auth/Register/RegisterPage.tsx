import Image from "next/image";
import RegisterForm from "./RegisterForm";


export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex items-center pt-20 pb-10 justify-center px-4">

      <div
        className="relative w-full max-w-5xl bg-black rounded-2xl 
        border border-white/20 shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT – FORM */}
          <div className="p-8 md:p-10 bg-black text-white">
            <h1 className="text-2xl font-bold text-yellow-500 mb-1">
              பதிவு செய்யவும்
            </h1>

            <p className="text-sm text-white/70 mb-6">
              புதிய கணக்கை உருவாக்குங்கள்
            </p>

            <RegisterForm />
          </div>

          {/* RIGHT – IMAGE */}
          <div className="relative hidden md:block bg-white overflow-hidden">

            <Image
              src="/Login/Thirukkural.png"
              alt="Palm Leaf"
              fill
              className="absolute top-20 left-0 rotate-[12deg] opacity-95 z-10"
            />

            <Image
              src="/Login/ThiruvallurImg.png"
              alt="Thiruvalluvar"
              width={550}
              height={350}
              className="absolute bottom-15 right-7 object-contain z-20 drop-shadow-2xl scale-[1.5]"
            />

          </div>

        </div>
      </div>
    </div>
  );
}

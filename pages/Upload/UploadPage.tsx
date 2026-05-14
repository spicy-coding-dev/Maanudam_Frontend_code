import UploadForm from "./UploadForm";

export default function UploadPage() {
  return (
    <div className="w-full max-w-full">
      <h2 className="text-[#1f3c88] text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        நிர்வாகி புத்தக பதிவேற்றப் பக்கம்
      </h2>

      <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <UploadForm />
      </div>
    </div>
  );
}



import axiosInstance from "@/API/axiosInstance";
import { useState } from "react";

import toast from "react-hot-toast";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("பயனர் பதிவு செய்யப்படுகிறது...");

    try {
      setLoading(true);

      const payload = {
        name,
        email,
        mobile,
        country,
        state,
        district,
      };

      const res = await axiosInstance.post("/manage/create-user", payload);

      toast.success(res.data?.message || "பயனர் வெற்றிகரமாக இணைக்கப்பட்டார்", {
        id: toastId,
      });

      setName("");
      setEmail("");
      setMobile("");
      setCountry("");
      setState("");
      setDistrict("");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "பயனர் பதிவு தோல்வியடைந்தது",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* 🔹 Full Width Card */}
      <div className="bg-white rounded-xl shadow border p-6 w-full">
        <h1 className="text-xl font-semibold text-[#1f3c88] mb-6">
          பயனர் இணைக்க
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">பயனர் பெயர்</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="பயனர் பெயரை உள்ளிடவும்"
              required
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">மின்னஞ்சல்</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Mobile */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">மொபைல் எண்</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="10 இலக்க மொபைல் எண்"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Country dropdown */}
          <div>
            <label className="block mb-1 font-medium">நாடு</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">தேர்வு செய்யவும்</option>
              <option value="India">இந்தியா</option>
            </select>
          </div>

          {/* State dropdown */}
          <div>
            <label className="block mb-1 font-medium">மாநிலம்</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">தேர்வு செய்யவும்</option>
              <option value="Tamil Nadu">தமிழ்நாடு</option>
              <option value="Kerala">கேரளா</option>
              <option value="Karnataka">கர்நாடகா</option>
            </select>
          </div>

          {/* District dropdown */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">மாவட்டம்</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">தேர்வு செய்யவும்</option>
              <option value="Madurai">மதுரை</option>
              <option value="Chennai">சென்னை</option>
              <option value="Coimbatore">கோயம்புத்தூர்</option>
              <option value="Trichy">திருச்சி</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            {/* 🔄 Reset */}
            <button
              type="button"
              onClick={() => {
                setName("");
                setEmail("");
                setMobile("");
                setCountry("");
                setState("");
                setDistrict("");
              }}
              className="
      px-6 py-2
      border
      rounded-md
      bg-gray-100
      text-gray-700
      hover:bg-gray-200
    "
            >
              Reset
            </button>

            {/* ✅ Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
      px-6 py-2
      bg-[#1f3c88]
      text-white
      rounded-md
      disabled:opacity-60
    "
            >
              {loading ? "பதிவு செய்யப்படுகிறது..." : "பயனர் இணைக்க"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import axiosInstance from "@/API/axiosInstance";
import { useState } from "react";

import {toast} from "react-toastify";

type StatusType = "DRAFT" | "PUBLISHED" | "BLOCKED";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [author, setAuthor] = useState("");
  const [paid, setPaid] = useState<boolean | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<StatusType>("DRAFT");
  const [loading, setLoading] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [magazineNo, setMagazineNo] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  /* 🔥 Image validation (jpg / jpeg / png only) */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("JPG / JPEG / PNG படங்கள் மட்டும் அனுமதி",{
        position:"top-right"
      });
      e.target.value = "";
      return;
    }

    setCoverImage(file);
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setCategory("");
    setCoverImage(null);
    setAuthor("");
    setMagazineNo("");
    setTags([]);
    setTagInput("");
    setPaid(null);
    setPrice(0);
    setStatus("DRAFT");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coverImage) {
      toast.error("அட்டை படம் அவசியம்",{
        position:"top-right"
      });
      return;
    }

    // const toastId = toast.loading("பதிவேற்றம் நடைபெறுகிறது...");

    try {
      setLoading(true);

      const data = {
        title,
        subtitle, // ✅ new
        category,
        author,
        magazineNo, // ✅ new
        tags, // ✅ new
        paid,
        price: paid ? price : 0,
        status,
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      formData.append("coverImage", coverImage);

      const res = await axiosInstance.post("/admin/books/upload", formData);

      toast.success(res.data?.message || "புத்தகம் பதிவேற்றப்பட்டது", {
       position:'top-right'
      });

      resetForm();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "பதிவேற்றம் தோல்வியடைந்தது", {
      position:"top-right"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-black w-full max-w-[1200px]"
    >
      {/* Title */}
      <div className="md:col-span-2">
        <label className="block mb-1 font-medium">தலைப்பு</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="புத்தகத்தின் முக்கிய தலைப்பை உள்ளிடவும்"
          required
        />
      </div>

      {/* Subtitle */}
      <div className="md:col-span-2">
        <label className="block mb-1 font-medium">உப தலைப்பு (Subtitle)</label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="உதா: வாழ்க்கை வரலாறு, சமூக பார்வை"
          required
        />
      </div>

      {/* Category */}
      <div className="md:col-span-2">
        <label className="block mb-1 font-medium">வகை</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">தேர்வு செய்யவும்</option>
          <option value="வரலாறு">வரலாறு</option>
          <option value="சமூகம்">சமூகம்</option>
          <option value="இலக்கியம்">இலக்கியம்</option>
          <option value="பண்பாடு">பண்பாடு</option>
          <option value="சூழலியல்">சூழலியல்</option>
          <option value="தலையங்கம்">தலையங்கம்</option>
          <option value="சினிமா">சினிமா</option>
          <option value="இதழ்கள்">இதழ்கள்</option>
        </select>
      </div>

      {/* Author */}
      <div>
        <label className="block mb-1 font-medium">உருவாக்கியவர்</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="உதா: செங்கதிர்"
          required
        />
      </div>

      {/* Magazine No */}
      <div>
        <label className="block mb-1 font-medium">Magazine No</label>
        <input
          value={magazineNo}
          onChange={(e) => setMagazineNo(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="உதா: 01"
          required
        />
      </div>

      {/* Tags */}
      <div className="md:col-span-2">
        <label className="block mb-1 font-medium">Tags (அதிகபட்சம் 100)</label>

        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && tagInput.trim()) {
              e.preventDefault();
              if (tags.length >= 100) {
                toast.error("அதிகபட்சம் 100 tags மட்டுமே அனுமதி");
                return;
              }
              if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
              }
              setTagInput("");
            }
          }}
          placeholder="Tag type செய்து Enter அழுத்தவும்"
          className="w-full px-3 py-2 border rounded-md"
        />

        {/* Tag list */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1"
            >
              #{tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium">நிலை</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusType)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="DRAFT">வரைவு</option>
          <option value="PUBLISHED">வெளியிடப்பட்டது</option>
          <option value="BLOCKED">முடக்கப்பட்டது</option>
        </select>
      </div>

      {/* Image */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">அட்டை படம்</label>

        <label
          className="flex items-center justify-center w-full sm:w-fit
    px-5 py-2 bg-[#f2f2f2] text-[#444]
    border border-dashed border-[#aaa]
    rounded-md cursor-pointer text-sm"
        >
          🖼️ படம் பதிவேற்றம்
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageChange}
            className="hidden"
            required
          />
        </label>
        {coverImage && (
          <p className="text-xs text-gray-600 mt-1">🖼️ {coverImage.name}</p>
        )}
      </div>

      {/* Paid / Free */}
      <div>
        <label className="block mb-1 font-medium">Paid / Free</label>
        <select
          value={paid === null ? "" : paid ? "PAID" : "FREE"}
          onChange={(e) => {
            if (e.target.value === "PAID") setPaid(true);
            else {
              setPaid(false);
              setPrice(0);
            }
          }}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">தேர்வு செய்யவும்</option>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select>
      </div>

      {paid && (
        <div>
          <label className="block mb-1 font-medium">விலை</label>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="md:col-span-2 flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-2 border rounded-md bg-gray-100 cursor-pointer"
        >
          ரத்து செய்க
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-7 py-2 rounded-md bg-[#1f3c88] text-white disabled:opacity-60 cursor-pointer"
        >
          {loading ? "பதிவேற்றம்..." : "வெளியிடவும்"}
        </button>
      </div>
    </form>
  );
}

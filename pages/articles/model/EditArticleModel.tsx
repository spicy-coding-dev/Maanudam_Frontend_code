import { useState, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import ModalWrapper from "./ModelWrapper";
import type { Book } from "../types";

import toast from "react-hot-toast";
import axiosInstance from "@/API/axiosInstance";

type Props = {
  book: Book;
  onClose: () => void;
  onSave: (updated: Partial<Book>) => void;
};

export default function EditArticleModal({ book, onClose, onSave }: Props) {
  const [title, setTitle] = useState(book.title);
  const [subTitle, setSubTitle] = useState(book.subTitle || "");
  const [author, setAuthor] = useState(book.author || "");
  const [category, setCategory] = useState(book.category);
  const [magazineNo, setMagazineNo] = useState(book.magazineNo || 0);
  const [paid, setPaid] = useState<boolean>(book.paid);
  const [price, setPrice] = useState<number>(book.price || 0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>(book.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [coverPreview, setCoverPreview] = useState(book.coverImage);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    const toastId = toast.loading("புத்தகம் புதுப்பிக்கப்படுகிறது...");

    try {
      const payload = {
        title,
        subTitle,
        author,
        category,
        magazineNo,
        paid,
        price: paid ? price : null,
        tags,
      };

      const res = await axiosInstance.patch(`/admin/books/${book.id}`, payload);

      toast.success(
        res.data?.message || "புத்தகம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
        { id: toastId }
      );

      // 🔄 parent list update (optional)
      onSave?.(res.data.data);

      // 🔚 close modal
      onClose();
    } catch (err: any) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "புத்தகம் புதுப்பிக்க முடியவில்லை",
        { id: toastId }
      );
    }
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("PNG / JPG / JPEG படங்கள் மட்டும் அனுமதி");
      return;
    }

    // 🔹 Preview immediately
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);

    // 🔹 API call
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.put(
        `/admin/books/${book.id}/cover-image`,
        formData
      );

      // 🔥 backend returns: ApiResponse<String>
      setCoverPreview(res.data.data);

      toast.success(res.data.message || "கவர் படம் மாற்றப்பட்டது ✅");
    } catch (err: any) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "கவர் படம் மாற்றம் தோல்வி ❌"
      );

      setCoverPreview(book.coverImage); // rollback
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalWrapper title="Edit Article"  onClose={onClose}>
      {/* 🔒 ID (Read only) */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">ID</label>
        <input
          value={book.id}
          disabled
          className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
        />
      </div>

      {/* 🖼️ Cover Image */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Cover Image</label>

        <div className="relative w-full h-[180px] rounded-md overflow-hidden border">
          <img
            src={coverPreview}
            alt="cover"
            className={`w-full h-full object-cover ${
              uploading ? "opacity-60" : ""
            }`}
          />

          {/* Pencil icon */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
            title="Change cover image"
            disabled={uploading}
          >
            <FiEdit />
          </button>

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm">
              Uploading...
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={handleCoverImageChange}
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Subtitle */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Subtitle</label>
        <input
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
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

      {/* Magazine No */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Magazine No</label>
        <input
          type="number"
          value={magazineNo}
          onChange={(e) => setMagazineNo(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Paid */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Paid</label>
        <select
          value={paid ? "true" : "false"}
          onChange={(e) => setPaid(e.target.value === "true")}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>

      {/* Price – only if paid */}
      {paid && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      {/* Tags */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Tags</label>

        {/* Input */}
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              const value = tagInput.trim();
              if (value && !tags.includes(value)) {
                setTags([...tags, value]);
              }
              setTagInput("");
            }
          }}
          placeholder="Tag type pannunga, Enter / , press pannunga"
          className="w-full px-3 py-2 border rounded-md"
        />

        {/* Tag list */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  className="text-blue-500 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#1f3c88] text-white rounded-md"
        >
          Save Changes
        </button>
      </div>
    </ModalWrapper>
  );
}

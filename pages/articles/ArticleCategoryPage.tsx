"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ArticleCard from "@/pages/articles/ArticleCard";
import EditArticleModal from "@/pages/articles/model/EditArticleModel";
import ConfirmModal from "@/pages/articles/model/ConfirmModel";
import toast from "react-hot-toast";
import type { Book, BookStatus } from "@/pages/articles/types";
import axiosInstance from "@/API/axiosInstance";

/* URL slug → Tamil (API) */
const categoryApiMap: Record<string, string> = {
  history: "வரலாறு",
  society: "சமூகம்",
  literature: "இலக்கியம்",
  culture: "பண்பாடு",
  environment: "சூழலியல்",
  editorial: "தலையங்கம்",
  cinema: "சினிமா",
  magazine: "இதழ்கள்",
};

export default function ArticleCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const category = params?.category as string;

  const [status, setStatus] = useState<BookStatus>("PUBLISHED");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editBook, setEditBook] = useState<Book | null>(null);
  const [confirm, setConfirm] = useState<{
    book: Book;
    action: "DELETE" | "STATUS";
    status?: BookStatus;
  } | null>(null);

  useEffect(() => {
    fetchBooks();
  }, [category, status]);

  const fetchBooks = async () => {
    if (!category) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/books/category", {
        params: {
          category: categoryApiMap[category],
          status,
        },
      });

      setBooks(res.data?.data || []);
      setMessage("இந்த நிலையில் கட்டுரைகள் இல்லை");
    } catch (err: any) {
      console.error(err);
      setBooks([]);
      setMessage(
        err?.response?.data?.message || "கட்டுரைகளை ஏற்ற முடியவில்லை",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 🔝 HEADER */}
      <h1 className="text-2xl font-semibold text-[#a68a3f]">
        {categoryApiMap[category] || "கட்டுரைகள்"}
      </h1>

      {/* 🔘 STATUS TABS */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
        <StatusTab
          label="வெளியிடப்பட்டவை"
          active={status === "PUBLISHED"}
          onClick={() => setStatus("PUBLISHED")}
        />
        <StatusTab
          label="வரைவு"
          active={status === "DRAFT"}
          onClick={() => setStatus("DRAFT")}
        />
        <StatusTab
          label="முடக்கப்பட்டவை"
          active={status === "BLOCKED"}
          onClick={() => setStatus("BLOCKED")}
        />
      </div>

      {/* 🧱 GRID */}
      {loading ? (
        <p className="text-gray-500">ஏற்றப்படுகிறது...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <ArticleCard
                key={book.id}
                book={book}
                onEdit={(b) => setEditBook(b)}
                onDelete={(b) => setConfirm({ book: b, action: "DELETE" })}
                onStatusChange={(b, s) =>
                  setConfirm({ book: b, action: "STATUS", status: s })
                }
                onClick={() => router.push(`/admin/reader/${book.id}`)}
              />
            ))}
          </div>

          {books.length === 0 && (
            <p className="text-gray-400 text-center py-10">{message}</p>
          )}
        </>
      )}

      {/* ✏️ EDIT MODAL */}
      {editBook && (
        <EditArticleModal
          book={editBook}
          onClose={() => setEditBook(null)}
          onSave={(updated) => {
            setBooks((prev) =>
              prev.map((b) =>
                b.id === updated.id ? { ...b, ...updated } : b,
              ),
            );
            setEditBook(null);
          }}
        />
      )}

      {/* ⚠️ CONFIRM MODAL */}
      {confirm && (
        <ConfirmModal
          title={
            confirm.action === "DELETE"
              ? "Delete Article"
              : "Change Status"
          }
          message={
            confirm.action === "DELETE"
              ? "இந்த கட்டுரையை நீக்க வேண்டுமா?"
              : `இந்த கட்டுரையை ${confirm.status} ஆக மாற்ற வேண்டுமா?`
          }
          danger={confirm.action === "DELETE"}
          onCancel={() => setConfirm(null)}
          onConfirm={async () => {
            const toastId = toast.loading("செயல்படுத்துகிறது...");

            try {
              if (confirm.action === "DELETE") {
                await axiosInstance.delete(`/admin/books/${confirm.book.id}`);
                setBooks((prev) =>
                  prev.filter((b) => b.id !== confirm.book.id),
                );
                toast.success("நீக்கப்பட்டது", { id: toastId });
              }

              if (confirm.action === "STATUS") {
                await axiosInstance.patch(
                  `/admin/books/${confirm.book.id}/status`,
                  { status: confirm.status },
                );

                setBooks((prev) =>
                  confirm.status !== status
                    ? prev.filter((b) => b.id !== confirm.book.id)
                    : prev.map((b) =>
                        b.id === confirm.book.id
                          ? { ...b, status: confirm.status! }
                          : b,
                      ),
                );

                toast.success("நிலை மாற்றப்பட்டது", { id: toastId });
              }

              setConfirm(null);
            } catch (err: any) {
              toast.error("செயல் தோல்வி", { id: toastId });
            }
          }}
        />
      )}
    </div>
  );
}

/* 🔘 TAB COMPONENT */
function StatusTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-md transition
        ${
          active
            ? "bg-white shadow text-[#a68a3f] font-medium"
            : "text-gray-600 hover:text-gray-800"
        }`}
    >
      {label}
    </button>
  );
}

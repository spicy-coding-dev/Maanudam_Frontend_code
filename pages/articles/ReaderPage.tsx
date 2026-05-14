"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import logo from "../../assets/logo1.png";
import axiosInstance from "@/API/axiosInstance";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ReaderPage() {
  const params = useParams<{ bookId: string }>();
  const bookId = params?.bookId;
  
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [relatedBooks, setRelatedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(`/admin/books/${bookId}`);
        setBook(res.data.data.book);
        setRelatedBooks(res.data.data.relatedBooks || []);
        setErrorMsg(null);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          "உள்ளடக்கம் ஏற்றுவதில் பிழை ஏற்பட்டது";

        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading content...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-5">
      <div className="max-w-7xl mx-auto">
        {/* 🔥 HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>

          {book.subtitle && (
            <p className="text-lg text-gray-600 mt-2">{book.subtitle}</p>
          )}

          <div className="text-sm text-gray-500 mt-3">
            ✍️ {book.authorName} ·{" "}
            {new Date(book.publishedAt).toLocaleDateString("ta-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT CONTENT */}
          <div className="col-span-12 lg:col-span-8">
            {errorMsg || !book?.content ? (
              <div className="bg-white rounded-xl shadow p-10 text-center">
                <h2 className="text-xl font-semibold text-red-600 mb-3">
                  ⚠️ உள்ளடக்கம் கிடைக்கவில்லை
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {errorMsg ||
                    "இந்த புத்தகத்திற்கு உள்ளடக்கம் இன்னும் சேர்க்கப்படவில்லை"}
                </p>
              </div>
            ) : (
              <article
                className="
        prose prose-lg max-w-none
        bg-white
        p-8
        rounded-xl
        shadow
      "
                dangerouslySetInnerHTML={{ __html: book.content }}
              />
            )}
          </div>

          {/* RIGHT SIDE – TAGS */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow p-6 sticky border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">🏷️ Tags</h3>

              {book.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="
                        px-3 py-1
                        bg-blue-100 text-blue-700
                        rounded-full
                        text-sm
                      "
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No tags available</p>
              )}
            </div>
            {/* 📰 RELATED ARTICLES */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">
                📰 Related Articles
              </h3>

              {relatedBooks.length ? (
                <div className="space-y-4">
                  {relatedBooks.map((rb) => (
                    <div
                      key={rb.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                      onClick={() => router.push(`/admin/reader/${rb.id}`)}
                    >
                      {/* COVER */}
                      <Image
                        src={rb.coverImage}
                        alt={rb.title}
                        fill
                        className="object-cover rounded-md"
                      />

                      {/* TEXT */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {rb.title}
                        </h4>

                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(rb.uploadAt).toLocaleDateString("ta-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No related articles</p>
              )}
            </div>
            {/* 🧾 ABOUT MANUDAM */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              {/* LOGO */}
              <Image
                src="/MaanudamLogo.jpeg"
                alt="Manudam Logo"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                மானுடம் என்பது சமூக, அரசியல், இலக்கியம் மற்றும் மனித உரிமைகள்
                சார்ந்த சிந்தனைகளை வாசகர்களுக்கு கொண்டு சேர்க்கும் ஒரு சுயாதீன
                டிஜிட்டல் இதழ்.
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex justify-center gap-4 text-xl text-gray-600">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-pink-600"
                >
                  📸
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  className="hover:text-black"
                >
                  ❌
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:text-blue-600"
                >
                  📘
                </a>
                <a
                  href="https://wa.me/91xxxxxxxxxx"
                  target="_blank"
                  className="hover:text-green-600"
                >
                  💬
                </a>
              </div>
            </div>

            {/* 🔍 SEARCH CARD */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">🔍 Search Articles</h3>

              <input
                type="text"
                placeholder="தேடுங்கள்..."
                className="
        w-full px-4 py-2
        border rounded-lg
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
      "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

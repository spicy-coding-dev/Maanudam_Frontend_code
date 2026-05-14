"use client";

import MagazineCard from "@/components/card/MagazineCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { Book } from "./page";
import Link from "next/link";

export default function CategoryClient({
  books,
  category,
  config,
  tamilKey,
}: any) {
  console.log(books)
  console.log("this is category", category);
  const latestBooks = books.filter(
    (books: Book) => books.issueType === "LATEST",
  );
  const previousBooks = books.filter(
    (books: Book) => books.issueType === "PREVIOUS",
  );
  return (
    <section className="min-h-screen bg-white md:px-16 py-30 px-10 lg:py-15">
      {/* CATEGORY BANNER */}
      {config && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`h-72 rounded-2xl mb-12 overflow-hidden relative bg-gradient-to-r ${config.theme}`}
        >
          <Image
            src={config.bannerImg}
            alt="banner"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="lg:text-5xl md:text-3xl text-2xl font-bold text-white tracking-wide">
              {tamilKey}
            </h2>
          </div>
        </motion.div>
      )}

      {tamilKey === "இதழ்கள்" ? (
        <>
          {latestBooks.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-[#a67c2e]">
                சமீபத்திய இதழ்கள் (2025 முதல்)
              </h2>
              <div className="flex md:items-center mb-8 gap-5 flex-col md:flex-row">
                <p className="text-gray-600 font-bold">
                  சந்தா செலுத்தி படிக்கவும்
                </p>
                <Link href="/plan-subscription" className="hidden md:block">
                  <button className="bg-yellow-500 text-black px-2 py-1 rounded ">
                    Subscribe Now
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                {latestBooks.map((item: Book) => (
                  <MagazineCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}

          {previousBooks.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-[#a67c2e]">
                இலவச இதழ்கள் (2024 வரை)
              </h2>
              <p className="mb-8 text-gray-600 font-bold">அனைவருக்கும் இலவசமாக கிடைக்கும</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {previousBooks.map((item: Book) => (
                  <MagazineCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}

          {/* 🔥 If both empty */}
          {latestBooks.length === 0 && previousBooks.length === 0 && (
            <p className="text-center text-gray-400 mt-10">இதழ்கள் இல்லை</p>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {books.map((item: Book) => (
              <MagazineCard key={item.id} item={item} />
            ))}
          </div>

          {books.length === 0 && (
            <p className="text-center text-gray-400 mt-10">கட்டுரைகள் இல்லை</p>
          )}
        </>
      )}
    </section>
  );
}

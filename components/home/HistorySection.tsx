"use client";

import { useHome } from "@/app/Context/HomeContext";
import { HomeData, Magazine } from "@/app/types/HomeContextTypes";
import { motion } from "framer-motion";
import Image from "next/image";
// import { useHome } from "@/Context/HomeContext";
// import type { Magazine } from "@/types/HomeContextTypes";
type Props = {
  homeData:HomeData;
};
export default function HistorySection({ homeData }: Props) {

  const historyList: Magazine[] = homeData?.["வரலாறு"] || [];

  return (
    <div className="min-h-[90vh] bg-white flex items-center justify-center px-6 ">

      {/* Laptop Frame */}
      <div className="relative bg-white rounded-xl shadow-2xl mb-5 w-full max-w-7xl px-10 py-10 m-5">

        {/* Title */}
        <h2 className="text-3xl font-bold text-yellow-700 mb-10">
          வரலாறு
        </h2>

        {historyList.length === 0 ? (
          <p className="text-center text-gray-500">
            வரலாறு புத்தகங்கள் கிடைக்கவில்லை
          </p>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {historyList.map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
                >

                  {/* Image */}
                  <div className="h-60 w-full overflow-hidden rounded-lg bg-gray-100 mb-4 relative">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-xs text-red-600 font-semibold uppercase">
                        {article.category || "வரலாறு"}
                      </span>

                      <h2 className="text-sm font-bold mt-1 line-clamp-2">
                        {article.title}
                      </h2>

                      {article.subTitle && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                          {article.subTitle}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                      <span>✍️ {article.author}</span>
                      <span className="text-blue-600 font-medium">
                        Read more →
                      </span>
                    </div>
                  </div>

                </motion.div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

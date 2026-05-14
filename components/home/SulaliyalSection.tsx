"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useHome } from "@/app/Context/HomeContext";
import { HomeData, Magazine } from "@/app/types/HomeContextTypes";
type Props = {
  homeData: HomeData;
};
const SulaliyalSection = ({ homeData }: Props) => {
  const sulaliyalList: Magazine[] = homeData?.["சூழலியல்"] || [];

  if (!sulaliyalList.length) return null;

  return (
    <section className="w-full bg-white py-20 flex justify-center">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden px-10 py-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#9c7a1f]"
        >
          சூழலியல்
        </motion.h1>

        <p className="text-gray-600 mt-3 max-w-xl">
          சூழலியல் சார்ந்த கட்டுரைகள் மற்றும் ஆய்வுகள்
        </p>

        {/* Count */}
        <div className="flex justify-end mt-8">
          <span className="text-sm text-gray-500">
            மொத்தம் {sulaliyalList.length} கட்டுரைகள்
          </span>
        </div>

        {/* Articles */}
        <div className="mt-10 space-y-20 flex justify-center">
          {sulaliyalList.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-22 items-center"
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative h-80 w-80 rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Content */}
              <div>
                {item.paid && (
                  <span className="bg-black text-white text-sm px-3 py-1 rounded-full mb-3 inline-block">
                    Premium
                  </span>
                )}

                <div className="mb-4">
                  <span className="bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-full">
                    இதழ் {item.magazineNo}
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-3">{item.title}</h2>

                <div className="text-sm text-gray-500 mb-4">
                  ✍ {item.author}
                </div>

                <p className="text-gray-700 mb-6">{item.subTitle}</p>

                <motion.button
                  whileHover={{ x: 6 }}
                  className="text-red-600 font-semibold flex items-center gap-2"
                >
                  மேலும் படிக்க <ArrowRight />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SulaliyalSection;

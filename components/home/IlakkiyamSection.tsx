    "use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {ArrowRight} from "lucide-react";
import { useHome } from "@/app/Context/HomeContext";
import { HomeData, Magazine } from "@/app/types/HomeContextTypes";

type Props = {
  homeData:HomeData;
};
const IlakkiyamSection = ({ homeData }: Props) => {
  const ilakkiyamList: Magazine[] = homeData?.["இலக்கியம்"] || [];

  // Latest article
  const ilakkiyamArticle =
    ilakkiyamList[ilakkiyamList.length - 1];

  // Latest 2 images
  const ilakkiyamlatestThree = ilakkiyamList.slice(0, 2);

  if (!ilakkiyamList.length) return null;

  return (
    <section className="w-full bg-white py-20 flex justify-center">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="px-10 py-14">

          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[#9c7a1f]"
          >
            இலக்கியம்
          </motion.h1>

          <p className="text-gray-600 mt-3 max-w-xl">
            தமிழ் இலக்கிய படைப்புகள் மற்றும் விமர்சனங்கள்
          </p>

          <div className="flex justify-end mt-8">
            <span className="text-sm text-gray-500">
              மொத்தம் {ilakkiyamList.length} கட்டுரைகள்
            </span>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 mt-14 items-center"
          >

            {/* LEFT – Images */}
            <div className="relative flex justify-center items-center min-h-[380px]">
              {ilakkiyamlatestThree.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    absolute rounded-xl shadow-xl transition-all duration-500
                    ${index === 0 ? "w-56 h-80 z-30 -top-15 left-6" : ""}
                    ${index === 1 ? "w-44 h-64 right-20 top-16 z-20" : ""}
                  `}
                >
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>

            {/* RIGHT – Text */}
            {ilakkiyamArticle && (
              <div>
                <div className="flex gap-3 mb-4">
                  {ilakkiyamArticle.paid && (
                    <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>

                <span className="inline-block bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  இதழ் {ilakkiyamArticle.magazineNo}
                </span>

                <h2 className="text-3xl font-bold text-black mb-4">
                  {ilakkiyamArticle.title}
                </h2>

                <div className="text-sm text-gray-500 mb-4">
                  ✍ {ilakkiyamArticle.author}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {ilakkiyamArticle.subTitle}
                </p>

                <motion.button
                  whileHover={{ x: 6 }}
                  className="text-red-600 font-semibold flex items-center gap-2"
                >
                  மேலும் படிக்க <ArrowRight />
                </motion.button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IlakkiyamSection;

import { motion } from "framer-motion";
import { Pen } from "lucide-react";
import Image from "next/image";

import { ArrowRight } from "lucide-react";
import { useHome } from "@/app/Context/HomeContext";
import { HomeData, Magazine } from "@/app/types/HomeContextTypes";
type Props = {
  homeData: HomeData;
};
const ThalayangamSection = ({ homeData }: Props) => {
  const thalayangamList: Magazine[] = homeData?.["தலையங்கம்"] || [];

  // if (!panpaaduList.length) return null;
  return (
    <section className="w-full lg:min-h-[80vh] bg-black py-10 flex justify-center">
      {thalayangamList.map((thalayangamBook) => (
        <div className="w-full max-w-6xl px-6" key={thalayangamBook.id}>
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-yellow-500 mb-3"
          >
            {thalayangamBook.category}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-8"
          >
            பண்பாடு, பழக்கவழக்கங்கள் மற்றும் விழாக்கள்
          </motion.p>
          <div className="flex items-end  justify-end mb-10">
            <span className="text-sm text-white ">
              மொத்தம் {thalayangamList.length} கட்டுரைகள்
            </span>
          </div>

          {/* Content Card */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <Image
                src={thalayangamBook.coverImage}
                alt="Samugam"
                className="w-80 h-100 object-cover rounded-xl shadow-2xl"
                width={300}
  height={400}

              />
            </motion.div>

            {/* Text */}
            <div>
              <span className="inline-block bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-full mb-4">
                இதழ் {thalayangamBook.magazineNo}
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {thalayangamBook.title}
              </h3>

              <p className="text-gray-300 mb-2 flex items-center gap-2">
                <Pen size={18} className="text-yellow-500"></Pen>
                <span>சமூக ஆய்வாளர் {thalayangamBook.author} · 11/12/2024</span>
              </p>

              <p className="text-gray-400 leading-relaxed mb-6">
                {thalayangamBook.subTitle}
              </p>

              <motion.button
                whileHover={{ x: 5 }}
                className="text-red-500 font-semibold flex items-center gap-2"
              >
                மேலும் படிக்க <ArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
};

export default ThalayangamSection;

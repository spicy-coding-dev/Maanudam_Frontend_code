"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RazorpayButton from "../payment/RazorpayButton";



type Props = {
  item: any;
};

const MagazineCard = ({ item }: Props) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleCardClick = () => {
    console.log("ITEM:", item);
    if (!item.accessible) {
      alert("🔒 இந்த இதழை படிக்க சந்தா செலுத்துங்கள்");
      return;
    }

    router.push(`/read/${item.category}/${item.id}`);
  };

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-xl bg-white w-full sm:max-w-sm flex flex-col min-h-[520px]"
      onClick={handleCardClick}
    >
      {/* IMAGE */}
      <div className="relative h-72 w-full overflow-hidden bg-gray-400">
        <motion.div whileHover={{ scale: 1.1 }} className="h-full w-full">
          <Image
            src={item.coverImage}
            alt={item.title}
          fill
            className={`object-cover ${
              !item.accessible ? "blur-sm" : ""
            }`}
          />
        </motion.div>

        {!item.accessible && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Lock className="text-white w-10 h-10" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <span className="bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-full mb-4">
            இதழ் {item.magazineNo}
          </span>

          <span className="text-xs text-gray-900">
            {formatDate(item.uploadAt)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-black  line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-700 mt-2">
          {item.subTitle}
        </p>

        <p className="text-sm opacity-80 text-gray-500">✍️ {item.author}</p>

        {item.paid && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-red-600 font-bold text-sm">
              ₹ {item.price}
            </span>

            <RazorpayButton
              amount={item.price}
              purpose="MAGAZINE_PURCHASE"
              paymentType="SINGLE_BOOK"
              planId={item.planId}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MagazineCard;

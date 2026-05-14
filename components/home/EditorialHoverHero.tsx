"use client";

import { useState } from "react";
import Image from "next/image";
import { useHome } from "@/app/Context/HomeContext";
import { HomeData, Magazine } from "@/app/types/HomeContextTypes";

type Props = {
  homeData: HomeData;
};
const EditorialHoverHero = ({ homeData }: Props) => {
  const articles = homeData?.Latest.slice(0, 3) || [];

  const [active, setActive] = useState(0);

  if (!articles.length) return null;

  return (
    <section className="relative max-w-7xl mx-auto my-10 h-[480px] overflow-hidden rounded-xl">
      {/* 🔥 BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={articles[active].coverImage}
          alt={articles[active].title}
          fill
          priority
          className="object-cover transition-all duration-700 scale-105"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 🔥 CONTENT LAYER */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 h-full text-white">
        {articles.map((item: Magazine, index: number) => (
          <div
            key={item.id}
            onMouseEnter={() => setActive(index)}
            className={`
              cursor-pointer p-8 flex flex-col justify-end
              border-r border-white/20 last:border-r-0
              transition-all duration-300
              ${
                active === index ? "opacity-100" : "opacity-40 hover:opacity-70"
              }
            `}
          >
            <span className="text-xs uppercase text-yellow-400 font-semibold">
              {item.category}
            </span>

            <h2 className="mt-2 text-xl font-bold leading-snug">
              {item.title}
            </h2>

            <p className="mt-3 text-xs text-gray-400">✍ {item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EditorialHoverHero;

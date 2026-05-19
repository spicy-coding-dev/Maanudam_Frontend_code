import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

import MagazineCard from "@/components/card/MagazineCard";
import { CategoryBannerConfig } from "@/components/CategoryBannersConfig";
import CategoryClient from "./CategoryClient";
import { useAuth } from "@/app/Context/AuthContext";


export type Book = {
  id: number;
  title: string;
  coverImage: string;
  paid: boolean;
  price?: number;
  issueType?:string;
};

type CategorySlug =
  | "history"
  | "society"
  | "literature"
  | "culture"
  | "environment"
  | "editorial"
  | "cinema"
  | "magazine";

const categoryApiMap: Record<CategorySlug, string> = {
  history: "வரலாறு",
  society: "சமூகம்",
  literature: "இலக்கியம்",
  culture: "பண்பாடு",
  environment: "சூழலியல்",
  editorial: "தலையங்கம்",
  cinema: "சினிமா",
  magazine: "இதழ்கள்",
};

// async function getCategoryBooks(category: CategorySlug) {
//   const tamilCategory = categoryApiMap[category];

//   const res = await fetch(
//     `http://localhost:8080/api/v1/user/books/category?category=${encodeURIComponent(tamilCategory)}&status=PUBLISHED`,
//   );
  

//   const data = await res.json();
//   console.log("this is Data",data)
//   return data?.data || [];
// }


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: CategorySlug }>;
}) {
     const { category } = await params;
//  const books: Book[] = await getCategoryBooks(category);

  const tamilKey = categoryApiMap[category];
  const config = CategoryBannerConfig[tamilKey];

  return (
    <CategoryClient  category={category} config = {config} tamilKey={tamilKey}/>
  );
}

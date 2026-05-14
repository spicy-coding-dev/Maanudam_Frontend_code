export type BookStatus = "PUBLISHED" | "DRAFT" | "BLOCKED";

export type Book = {
  id: number;
  title: string;
  subTitle: string;
  author:string;
  coverImage: string;
  category: string;
  magazineNo: number;
  paid: boolean;
  price: number;
  status: BookStatus; // 🔥 important
  tags: string[];
};
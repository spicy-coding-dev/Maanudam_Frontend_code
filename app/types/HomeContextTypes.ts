export interface Magazine {
  id: number;
  title: string;
  subTitle: string;
  author: string;
  category: string;
  coverImage: string;
  magazineNo: number;
  paid: boolean;
  price: number | null;
  status: "PUBLISHED" | "DRAFT";
  tags: string[] | null;
  date :number
}

export interface HomeData {
  Latest: Magazine[];
  "சமூகம்": Magazine[];
  "வரலாறு": Magazine[];
  "இலக்கியம்": Magazine[];
  "பண்பாடு": Magazine[];
  "சூழலியல்" : Magazine[];
  "தலையங்கம்" :Magazine[];
  
}

export interface RelatedBook {
  id: number;
  title: string;
  coverImage: string;
  uploadAt: string;
}

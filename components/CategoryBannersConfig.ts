// categoryConfig.ts

export const CategoryBannerConfig: Record<string, any> = {
  வரலாறு: {
    bannerImg: "/Banners/history-bg.webp",
    theme: "from-amber-200 to-orange-400",
  },
  சமூகம்: {
    bannerImg: "/Banners/society-bg.webp",
    theme: "from-green-200 to-emerald-400",
  },
  இலக்கியம்: {
    bannerImg: "/Banners/literature-bg.webp",
    theme: "from-pink-200 to-rose-400",
  },
  பண்பாடு: {
    bannerImg: "/Banners/culture-bg.webp",
    theme: "from-amber-200 to-orange-400",
  },
  சூழலியல்: {
    bannerImg: "/Banners/environment-bg.webp",
    theme: "from-green-200 to-emerald-400",
  },
  தலையங்கம்: {
    bannerImg: "/Banners/culture-bg-webp",
    theme: "from-pink-200 to-rose-400",
  },
  இதழ்கள்: {
    bannerImg: "/Banners/magazine-bg.webp",
    theme: "from-pink-200 to-rose-400",
  },
};
export const navItems = [
  { slug: "", label: "முகப்பு" }, // 👈 HOME
  { slug: "history", label: "வரலாறு" },
  { slug: "society", label: "சமூகம்" },
  { slug: "literature", label: "இலக்கியம்" },
  { slug: "culture", label: "பண்பாடு" },
  { slug: "environment", label: "சூழலியல்" },
  { slug: "editorial", label: "தலையங்கம்" },
  { slug: "cinema", label: "சினிமா" },
  { slug: "magazine", label: "இதழ்கள்" },
];

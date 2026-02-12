export type Lang = "zh-tw" | "en";

export interface HomepageUI {
  heroSub: string;
  carouselAriaLabel: string;
  filterAll: string;
  dotAriaLabel: (n: number) => string;
  readingTimeLabel: (n: number) => string;
  noResults: string;
  dateLocale: string;
  prevLabel: string;
  nextLabel: string;
}

export const ui: Record<Lang, HomepageUI> = {
  "zh-tw": {
    heroSub: "關於開發、AI、創業和生產力的思考筆記",
    carouselAriaLabel: "精選文章",
    filterAll: "全部",
    dotAriaLabel: (n) => `第 ${n} 篇`,
    readingTimeLabel: (n) => `${n} 分鐘`,
    noResults: "沒有符合的文章",
    dateLocale: "zh-TW",
    prevLabel: "上一篇",
    nextLabel: "下一篇",
  },
  en: {
    heroSub: "Notes on development, AI, startups, and productivity",
    carouselAriaLabel: "Featured posts",
    filterAll: "All",
    dotAriaLabel: (n) => `Post ${n}`,
    readingTimeLabel: (n) => `${n} min`,
    noResults: "No matching posts",
    dateLocale: "en-US",
    prevLabel: "Previous",
    nextLabel: "Next",
  },
};

import type { Category } from "@/types/category";
import type { Tool } from "@/types";

const CATEGORY_INTRO: Record<string, string> = {
  images: "Convert, resize, and export images without leaving the browser.",
  documents: "Merge, split, convert, and extract PDFs, Word files, Markdown, and ZIP archives.",
  developer: "Format JSON, generate models, and inspect API data while you ship.",
  design: "Colors, palettes, and CSS helpers for UI work.",
  generators: "QR codes, UUIDs, and other one-off outputs.",
  calculators: "Percentages, units, currency, and word counts.",
  text: "Case conversion, regex testing, and Markdown ↔ HTML.",
  converters: "Base64, URL encoding, number bases, and timestamps.",
  security: "Hashes, JWT inspection, and other local security checks.",
  utilities: "Small helpers for everyday browser workflows.",
};

/** Short crawlable intro for category listing pages. */
export function getCategorySeoIntro(category: Category, toolCount: number): string {
  const intro = CATEGORY_INTRO[category.slug] ?? category.description;
  return `${intro} ${toolCount} tools, all free.`;
}

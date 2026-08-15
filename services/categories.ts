import type { Category, CategorySlug } from "@/types";
import type { IconName } from "@/lib/icons";

/** Active categories — only those with real, shipped tools. Order = homepage grid. */
export const CATEGORIES: Category[] = [
  {
    slug: "images",
    name: "Images",
    description: "Convert, resize-ready formats, SVG, and favicons — all in your browser.",
    icon: "image",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    slug: "documents",
    name: "Documents",
    description: "PDF, Word, Markdown, HTML, and ZIP — create and extract without uploading.",
    icon: "file-text",
    gradient: "from-sky-500/20 to-blue-500/20",
  },
  {
    slug: "developer",
    name: "Developer",
    description: "JSON, YAML, JWT-adjacent data tools, model generators, and API helpers.",
    icon: "braces",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    slug: "design",
    name: "Design",
    description: "Colors, palettes, Lottie previews, and CSS helpers for makers.",
    icon: "palette",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    slug: "generators",
    name: "Generators",
    description: "QR codes, UUIDs, and quick creative outputs.",
    icon: "qr-code",
    gradient: "from-violet-500/20 to-indigo-500/20",
  },
  {
    slug: "calculators",
    name: "Calculators",
    description: "Percentages, units, currency, and word counts for everyday math.",
    icon: "calculator",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
  {
    slug: "text",
    name: "Text",
    description: "Case conversion, regex testing, and Markdown ↔ HTML.",
    icon: "type",
    gradient: "from-rose-500/20 to-orange-500/20",
  },
  {
    slug: "converters",
    name: "Converters",
    description: "Base64, URL encoding, number bases, and timestamps.",
    icon: "repeat",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    slug: "security",
    name: "Security",
    description: "Hash generators and JWT inspection — private and local.",
    icon: "shield",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    slug: "utilities",
    name: "Utilities",
    description: "Handy extras for deep links and everyday workflows.",
    icon: "wrench",
    gradient: "from-slate-500/20 to-zinc-500/20",
  },
];

/** Map retired category URLs → current ones. */
export const CATEGORY_ALIASES: Partial<Record<CategorySlug, CategorySlug>> = {
  "json-tools": "developer",
  encoding: "converters",
  api: "developer",
  web: "utilities",
  mobile: "developer",
  database: "developer",
  ai: "utilities",
};

export function resolveCategorySlug(slug: string): CategorySlug | undefined {
  const direct = CATEGORIES.find((c) => c.slug === slug);
  if (direct) return direct.slug;
  const aliased = CATEGORY_ALIASES[slug as CategorySlug];
  return aliased;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const resolved = resolveCategorySlug(slug);
  if (!resolved) return undefined;
  return CATEGORIES.find((c) => c.slug === resolved);
}

export function getCategoryIconName(slug: CategorySlug): IconName {
  return getCategoryBySlug(slug)?.icon ?? "wrench";
}

export function getAllCategorySlugs(): CategorySlug[] {
  return CATEGORIES.map((c) => c.slug);
}

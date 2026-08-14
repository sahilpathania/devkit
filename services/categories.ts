import type { Category, CategorySlug } from "@/types";
import type { IconName } from "@/lib/icons";

/** All tool categories — order determines homepage grid layout. */
export const CATEGORIES: Category[] = [
  {
    slug: "json-tools",
    name: "JSON Tools",
    description: "Format, validate, and transform JSON data instantly.",
    icon: "braces",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    slug: "security",
    name: "Security",
    description: "Decode JWTs, hash passwords, and inspect certificates.",
    icon: "shield",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    slug: "encoding",
    name: "Encoding",
    description: "Base64, URL encoding, UUID generation, and more.",
    icon: "binary",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    slug: "api",
    name: "API",
    description: "Test endpoints, view responses, and debug HTTP traffic.",
    icon: "server",
    gradient: "from-sky-500/20 to-cyan-500/20",
  },
  {
    slug: "web",
    name: "Web",
    description: "Regex testing, timestamps, QR codes, and web utilities.",
    icon: "globe",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    slug: "mobile",
    name: "Mobile",
    description: "Deep links, app schemes, and mobile development helpers.",
    icon: "smartphone",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    slug: "images",
    name: "Images",
    description: "Compress, convert, and optimize images for the web.",
    icon: "image",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    slug: "design",
    name: "Design",
    description: "Color palettes, Lottie previews, and design tokens.",
    icon: "palette",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    slug: "database",
    name: "Database",
    description: "SQL formatters, query builders, and schema tools.",
    icon: "database",
    gradient: "from-slate-500/20 to-zinc-500/20",
  },
  {
    slug: "ai",
    name: "AI",
    description: "Prompt tools, token counters, and AI workflow helpers.",
    icon: "sparkles",
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryIconName(slug: CategorySlug): IconName {
  return getCategoryBySlug(slug)?.icon ?? "braces";
}

export function getAllCategorySlugs(): CategorySlug[] {
  return CATEGORIES.map((c) => c.slug);
}

import type { LucideIcon } from "lucide-react";
import type { IconName } from "@/lib/icons";

/**
 * Category slugs for the universal toolkit.
 * Only categories that currently have real tools are listed in services/categories.
 */
export type CategorySlug =
  | "images"
  | "documents"
  | "developer"
  | "design"
  | "generators"
  | "calculators"
  | "text"
  | "converters"
  | "security"
  | "utilities"
  // Legacy slugs kept for type-compat during migration (redirected in getCategoryBySlug)
  | "json-tools"
  | "encoding"
  | "api"
  | "web"
  | "mobile"
  | "database"
  | "ai";

/** Category metadata displayed on listing pages and navigation. */
export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Lucide icon key resolved via getIcon() */
  icon: IconName;
  /** Tailwind gradient utility classes for card accents */
  gradient: string;
  toolCount?: number;
}

/** Resolved category with a concrete icon component (client-side). */
export interface CategoryWithIcon extends Omit<Category, "icon"> {
  icon: LucideIcon;
}

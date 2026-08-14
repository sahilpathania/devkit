import type { LucideIcon } from "lucide-react";
import type { IconName } from "@/lib/icons";

/** Supported tool category slugs used in routing and filtering. */
export type CategorySlug =
  | "json-tools"
  | "security"
  | "encoding"
  | "api"
  | "web"
  | "mobile"
  | "images"
  | "design"
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

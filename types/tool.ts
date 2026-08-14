import type { LucideIcon } from "lucide-react";
import type { IconName } from "@/lib/icons";
import type { CategorySlug } from "./category";

/** SEO metadata shared across tool and category pages. */
export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
  /** OpenGraph image path relative to public/ */
  ogImage?: string;
}

/** FAQ item rendered on individual tool pages. */
export interface ToolFAQ {
  question: string;
  answer: string;
}

/** Usage example shown on tool detail pages. */
export interface ToolExample {
  title: string;
  input?: string;
  output?: string;
  description?: string;
}

/**
 * Core tool interface — every developer tool must implement this contract.
 * The `component` field references a lazy-loaded React component slug.
 * Icons are string keys so Tool data stays serializable for RSC.
 */
export interface Tool {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: IconName;
  category: CategorySlug;
  /** React component identifier — resolved at runtime via tool registry */
  component: string;
  seo: ToolSEO;
  faqs: ToolFAQ[];
  examples: ToolExample[];
  tags: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  /** ISO date string for "Recently Added" sorting */
  createdAt: string;
}

/** Resolved tool with a concrete icon component (client-side). */
export interface ToolWithIcon extends Omit<Tool, "icon"> {
  icon: LucideIcon;
}

/** Props passed to every tool component via ToolLayout. */
export interface ToolComponentProps {
  tool: Tool;
}

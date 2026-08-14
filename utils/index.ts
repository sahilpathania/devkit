/**
 * Domain utilities (formatting, URLs, clipboard).
 * Keep `cn` in `@/lib/utils` for shadcn compatibility; re-export here for convenience.
 */

export { cn } from "@/lib/utils";
export { absoluteUrl, toolPath, categoryPath, searchPath } from "./url";
export { formatRelativeDate, pluralize } from "./format";

import type { ComponentType } from "react";
import { ToolPlaceholder } from "@/components/tools/tool-placeholder";
import type { ToolComponentProps } from "@/types";

/**
 * @deprecated Prefer ToolRenderer for lazy-loaded tools.
 * Kept for compatibility with any direct lookups.
 */
export function getToolComponent(
  componentSlug: string
): ComponentType<ToolComponentProps> {
  void componentSlug;
  return function PlaceholderWrapper(props: ToolComponentProps) {
    return <ToolPlaceholder tool={props.tool} />;
  };
}

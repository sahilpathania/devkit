"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { ToolPlaceholder } from "@/components/tools/tool-placeholder";
import type { Tool, ToolComponentProps } from "@/types";

function ToolLoading() {
  return (
    <div
      className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-border/60"
      role="status"
      aria-label="Loading tool"
    >
      <div className="size-6 animate-pulse rounded-full bg-muted" />
    </div>
  );
}

/**
 * Lazy-loaded tool component registry (client-only).
 * Add new tools here as they are implemented.
 */
const TOOL_COMPONENTS: Record<string, ComponentType<ToolComponentProps>> = {
  "json-formatter": dynamic(
    () =>
      import("@/components/tools/json/json-formatter").then((mod) => ({
        default: mod.JsonFormatter,
      })),
    { loading: () => <ToolLoading /> }
  ),
  "json-validator": dynamic(
    () =>
      import("@/components/tools/json/json-validator").then((mod) => ({
        default: mod.JsonValidator,
      })),
    { loading: () => <ToolLoading /> }
  ),
  "jwt-decoder": dynamic(
    () =>
      import("@/components/tools/security/jwt-decoder").then((mod) => ({
        default: mod.JwtDecoder,
      })),
    { loading: () => <ToolLoading /> }
  ),
  base64: dynamic(
    () =>
      import("@/components/tools/encoding/base64").then((mod) => ({
        default: mod.Base64Tool,
      })),
    { loading: () => <ToolLoading /> }
  ),
  "url-encode-decode": dynamic(
    () =>
      import("@/components/tools/encoding/url-encode-decode").then((mod) => ({
        default: mod.UrlEncodeDecode,
      })),
    { loading: () => <ToolLoading /> }
  ),
};

interface ToolRendererProps {
  tool: Tool;
}

/** Resolves and renders the interactive tool workspace for a given tool. */
export function ToolRenderer({ tool }: ToolRendererProps) {
  const Component = TOOL_COMPONENTS[tool.component];

  if (!Component) {
    return <ToolPlaceholder tool={tool} />;
  }

  return <Component tool={tool} />;
}

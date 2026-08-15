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

function lazyTool(
  loader: () => Promise<{ default: ComponentType<ToolComponentProps> }>
) {
  return dynamic(loader, { loading: () => <ToolLoading /> });
}

/**
 * Lazy-loaded tool component registry (client-only).
 * Add new tools here as they are implemented.
 */
const TOOL_COMPONENTS: Record<string, ComponentType<ToolComponentProps>> = {
  "json-formatter": lazyTool(() =>
    import("@/components/tools/json/json-formatter").then((mod) => ({
      default: mod.JsonFormatter,
    }))
  ),
  "json-validator": lazyTool(() =>
    import("@/components/tools/json/json-validator").then((mod) => ({
      default: mod.JsonValidator,
    }))
  ),
  "jwt-decoder": lazyTool(() =>
    import("@/components/tools/security/jwt-decoder").then((mod) => ({
      default: mod.JwtDecoder,
    }))
  ),
  base64: lazyTool(() =>
    import("@/components/tools/encoding/base64").then((mod) => ({
      default: mod.Base64Tool,
    }))
  ),
  "url-encode-decode": lazyTool(() =>
    import("@/components/tools/encoding/url-encode-decode").then((mod) => ({
      default: mod.UrlEncodeDecode,
    }))
  ),
  "json-yaml": lazyTool(() =>
    import("@/components/tools/converters/json-yaml").then((mod) => ({
      default: mod.JsonYamlConverter,
    }))
  ),
  "json-xml": lazyTool(() =>
    import("@/components/tools/converters/json-xml").then((mod) => ({
      default: mod.JsonXmlConverter,
    }))
  ),
  "csv-json": lazyTool(() =>
    import("@/components/tools/converters/csv-json").then((mod) => ({
      default: mod.CsvJsonConverter,
    }))
  ),
  "markdown-html": lazyTool(() =>
    import("@/components/tools/converters/markdown-html").then((mod) => ({
      default: mod.MarkdownHtmlConverter,
    }))
  ),
  "hex-rgb": lazyTool(() =>
    import("@/components/tools/converters/hex-rgb").then((mod) => ({
      default: mod.HexRgbConverter,
    }))
  ),
  "timestamp-converter": lazyTool(() =>
    import("@/components/tools/web/timestamp-converter").then((mod) => ({
      default: mod.TimestampConverter,
    }))
  ),
  "json-toml": lazyTool(() =>
    import("@/components/tools/converters/json-toml").then((mod) => ({
      default: mod.JsonTomlConverter,
    }))
  ),
  "env-json": lazyTool(() =>
    import("@/components/tools/converters/env-json").then((mod) => ({
      default: mod.EnvJsonConverter,
    }))
  ),
  "yaml-xml": lazyTool(() =>
    import("@/components/tools/converters/yaml-xml").then((mod) => ({
      default: mod.YamlXmlConverter,
    }))
  ),
  "csv-xml": lazyTool(() =>
    import("@/components/tools/converters/csv-xml").then((mod) => ({
      default: mod.CsvXmlConverter,
    }))
  ),
  "html-jsx": lazyTool(() =>
    import("@/components/tools/converters/html-jsx").then((mod) => ({
      default: mod.HtmlJsxConverter,
    }))
  ),
  "css-scss": lazyTool(() =>
    import("@/components/tools/converters/css-scss").then((mod) => ({
      default: mod.CssScssConverter,
    }))
  ),
  "cjs-esm": lazyTool(() =>
    import("@/components/tools/converters/cjs-esm").then((mod) => ({
      default: mod.CjsEsmConverter,
    }))
  ),
  "sql-json": lazyTool(() =>
    import("@/components/tools/converters/sql-json").then((mod) => ({
      default: mod.SqlJsonConverter,
    }))
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

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
  "image-converter": lazyTool(() =>
    import("@/components/tools/images/image-format-converter").then((mod) => ({
      default: mod.ImageFormatConverter,
    }))
  ),
  "svg-converter": lazyTool(() =>
    import("@/components/tools/images/svg-converter").then((mod) => ({
      default: mod.SvgConverter,
    }))
  ),
  "ico-converter": lazyTool(() =>
    import("@/components/tools/images/ico-converter").then((mod) => ({
      default: mod.IcoConverter,
    }))
  ),
  "json-to-model": lazyTool(() =>
    import("@/components/tools/mobile/json-model-generator").then((mod) => ({
      default: mod.JsonModelGenerator,
    }))
  ),
  "hash-generator": lazyTool(() =>
    import("@/components/tools/security/hash-generator").then((mod) => ({
      default: mod.HashGenerator,
    }))
  ),
  "uuid-generator": lazyTool(() =>
    import("@/components/tools/encoding/uuid-generator").then((mod) => ({
      default: mod.UuidGenerator,
    }))
  ),
  "color-converter": lazyTool(() =>
    import("@/components/tools/design/color-converter").then((mod) => ({
      default: mod.ColorConverter,
    }))
  ),
  "color-palette-generator": lazyTool(() =>
    import("@/components/tools/design/color-palette-generator").then((mod) => ({
      default: mod.ColorPaletteGenerator,
    }))
  ),
  "unit-converter": lazyTool(() =>
    import("@/components/tools/web/unit-converter").then((mod) => ({
      default: mod.UnitConverter,
    }))
  ),
  "currency-converter": lazyTool(() =>
    import("@/components/tools/web/currency-converter").then((mod) => ({
      default: mod.CurrencyConverter,
    }))
  ),
  "text-case-converter": lazyTool(() =>
    import("@/components/tools/web/text-case-converter").then((mod) => ({
      default: mod.TextCaseConverter,
    }))
  ),
  "word-counter": lazyTool(() =>
    import("@/components/tools/web/word-counter").then((mod) => ({
      default: mod.WordCounter,
    }))
  ),
  "percentage-calculator": lazyTool(() =>
    import("@/components/tools/web/percentage-calculator").then((mod) => ({
      default: mod.PercentageCalculator,
    }))
  ),
  "number-base-converter": lazyTool(() =>
    import("@/components/tools/encoding/number-base-converter").then((mod) => ({
      default: mod.NumberBaseConverter,
    }))
  ),
  "qr-generator": lazyTool(() =>
    import("@/components/tools/web/qr-generator").then((mod) => ({
      default: mod.QrGenerator,
    }))
  ),
  "regex-tester": lazyTool(() =>
    import("@/components/tools/web/regex-tester").then((mod) => ({
      default: mod.RegexTester,
    }))
  ),
  "lottie-viewer": lazyTool(() =>
    import("@/components/tools/design/lottie-viewer").then((mod) => ({
      default: mod.LottieViewer,
    }))
  ),
  "deep-link-generator": lazyTool(() =>
    import("@/components/tools/mobile/deep-link-generator").then((mod) => ({
      default: mod.DeepLinkGenerator,
    }))
  ),
  "api-response-viewer": lazyTool(() =>
    import("@/components/tools/api/api-response-viewer").then((mod) => ({
      default: mod.ApiResponseViewer,
    }))
  ),
  "markdown-to-pdf": lazyTool(() =>
    import("@/components/tools/documents/markdown-to-pdf").then((mod) => ({
      default: mod.MarkdownToPdf,
    }))
  ),
  "html-to-pdf": lazyTool(() =>
    import("@/components/tools/documents/html-to-pdf").then((mod) => ({
      default: mod.HtmlToPdf,
    }))
  ),
  "image-to-pdf": lazyTool(() =>
    import("@/components/tools/documents/image-to-pdf").then((mod) => ({
      default: mod.ImageToPdf,
    }))
  ),
  "pdf-to-text": lazyTool(() =>
    import("@/components/tools/documents/pdf-to-text").then((mod) => ({
      default: mod.PdfToText,
    }))
  ),
  "pdf-to-image": lazyTool(() =>
    import("@/components/tools/documents/pdf-to-image").then((mod) => ({
      default: mod.PdfToImage,
    }))
  ),
  "zip-tool": lazyTool(() =>
    import("@/components/tools/documents/zip-tool").then((mod) => ({
      default: mod.ZipTool,
    }))
  ),
  "word-to-pdf": lazyTool(() =>
    import("@/components/tools/documents/word-to-pdf").then((mod) => ({
      default: mod.WordToPdf,
    }))
  ),
  "image-compress": lazyTool(() =>
    import("@/components/tools/images/image-compress-resize").then((mod) => ({
      default: mod.ImageCompressResize,
    }))
  ),
  "merge-pdf": lazyTool(() =>
    import("@/components/tools/documents/merge-pdf").then((mod) => ({
      default: mod.MergePdf,
    }))
  ),
  "split-pdf": lazyTool(() =>
    import("@/components/tools/documents/split-pdf").then((mod) => ({
      default: mod.SplitPdf,
    }))
  ),
  "password-generator": lazyTool(() =>
    import("@/components/tools/security/password-generator").then((mod) => ({
      default: mod.PasswordGenerator,
    }))
  ),
  "age-calculator": lazyTool(() =>
    import("@/components/tools/calculators/age-calculator").then((mod) => ({
      default: mod.AgeCalculator,
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

"use client";

import { FileCode2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  MD_HTML_SAMPLE_HTML,
  MD_HTML_SAMPLE_MD,
  convertMarkdownHtml,
  type MarkdownHtmlMode,
} from "@/lib/tools/markdown-html";
import type { ToolComponentProps } from "@/types";

export function MarkdownHtmlConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<MarkdownHtmlMode>
      defaultMode="md-to-html"
      ActionIcon={FileCode2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "md-to-html" ? "html-to-md" : "md-to-html"
      }
      convert={convertMarkdownHtml}
      modes={[
        {
          value: "md-to-html",
          label: "Markdown → HTML",
          inputLabel: "Markdown",
          outputLabel: "HTML",
          placeholder: "# Heading",
          sample: MD_HTML_SAMPLE_MD,
          successMessage: "Converted Markdown to HTML",
        },
        {
          value: "html-to-md",
          label: "HTML → Markdown",
          inputLabel: "HTML",
          outputLabel: "Markdown",
          placeholder: "<h1>Heading</h1>",
          sample: MD_HTML_SAMPLE_HTML,
          successMessage: "Converted HTML to Markdown",
        },
      ]}
    />
  );
}

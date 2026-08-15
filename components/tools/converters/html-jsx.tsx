"use client";

import { FileCode2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  HTML_JSX_SAMPLE_HTML,
  HTML_JSX_SAMPLE_JSX,
  convertHtmlJsx,
  type HtmlJsxMode,
} from "@/lib/tools/html-jsx";
import type { ToolComponentProps } from "@/types";

export function HtmlJsxConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<HtmlJsxMode>
      defaultMode="html-to-jsx"
      ActionIcon={FileCode2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "html-to-jsx" ? "jsx-to-html" : "html-to-jsx"
      }
      convert={convertHtmlJsx}
      modes={[
        {
          value: "html-to-jsx",
          label: "HTML → JSX",
          inputLabel: "HTML",
          outputLabel: "JSX",
          placeholder: '<div class="box">Hi</div>',
          sample: HTML_JSX_SAMPLE_HTML,
          successMessage: "Converted HTML to JSX",
        },
        {
          value: "jsx-to-html",
          label: "JSX → HTML",
          inputLabel: "JSX",
          outputLabel: "HTML",
          placeholder: '<div className="box">Hi</div>',
          sample: HTML_JSX_SAMPLE_JSX,
          successMessage: "Converted JSX to HTML",
        },
      ]}
    />
  );
}

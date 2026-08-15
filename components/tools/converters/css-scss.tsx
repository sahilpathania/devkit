"use client";

import { FileCode2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  CSS_SCSS_SAMPLE_CSS,
  CSS_SCSS_SAMPLE_SCSS,
  convertCssScss,
  type CssScssMode,
} from "@/lib/tools/css-scss";
import type { ToolComponentProps } from "@/types";

export function CssScssConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<CssScssMode>
      defaultMode="css-to-scss"
      ActionIcon={FileCode2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "css-to-scss" ? "scss-to-css" : "css-to-scss"
      }
      convert={convertCssScss}
      modes={[
        {
          value: "css-to-scss",
          label: "CSS → SCSS",
          inputLabel: "CSS",
          outputLabel: "SCSS",
          placeholder: ".card { color: teal; }",
          sample: CSS_SCSS_SAMPLE_CSS,
          successMessage: "Converted CSS to SCSS",
        },
        {
          value: "scss-to-css",
          label: "SCSS → CSS",
          inputLabel: "SCSS",
          outputLabel: "CSS",
          placeholder: ".card { color: teal; & .title { font-size: 18px; } }",
          sample: CSS_SCSS_SAMPLE_SCSS,
          successMessage: "Converted SCSS to CSS",
        },
      ]}
    />
  );
}

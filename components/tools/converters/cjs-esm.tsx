"use client";

import { FileCode2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  CJS_ESM_SAMPLE_CJS,
  CJS_ESM_SAMPLE_ESM,
  convertCjsEsm,
  type CjsEsmMode,
} from "@/lib/tools/cjs-esm";
import type { ToolComponentProps } from "@/types";

export function CjsEsmConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<CjsEsmMode>
      defaultMode="cjs-to-esm"
      ActionIcon={FileCode2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "cjs-to-esm" ? "esm-to-cjs" : "cjs-to-esm"
      }
      convert={convertCjsEsm}
      modes={[
        {
          value: "cjs-to-esm",
          label: "CommonJS → ESM",
          inputLabel: "CommonJS",
          outputLabel: "ESM",
          placeholder: 'const x = require("x");',
          sample: CJS_ESM_SAMPLE_CJS,
          successMessage: "Converted CommonJS to ESM",
        },
        {
          value: "esm-to-cjs",
          label: "ESM → CommonJS",
          inputLabel: "ESM",
          outputLabel: "CommonJS",
          placeholder: 'import x from "x";',
          sample: CJS_ESM_SAMPLE_ESM,
          successMessage: "Converted ESM to CommonJS",
        },
      ]}
    />
  );
}

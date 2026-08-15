"use client";

import { FileCode2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  ENV_JSON_SAMPLE_ENV,
  ENV_JSON_SAMPLE_JSON,
  convertEnvJson,
  type EnvJsonMode,
} from "@/lib/tools/env-json";
import type { ToolComponentProps } from "@/types";

export function EnvJsonConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<EnvJsonMode>
      defaultMode="env-to-json"
      ActionIcon={FileCode2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "env-to-json" ? "json-to-env" : "env-to-json"
      }
      convert={convertEnvJson}
      modes={[
        {
          value: "env-to-json",
          label: ".env → JSON",
          inputLabel: ".env",
          outputLabel: "JSON",
          placeholder: "KEY=value",
          sample: ENV_JSON_SAMPLE_ENV,
          successMessage: "Converted .env to JSON",
        },
        {
          value: "json-to-env",
          label: "JSON → .env",
          inputLabel: "JSON",
          outputLabel: ".env",
          placeholder: '{"KEY":"value"}',
          sample: ENV_JSON_SAMPLE_JSON,
          successMessage: "Converted JSON to .env",
        },
      ]}
    />
  );
}

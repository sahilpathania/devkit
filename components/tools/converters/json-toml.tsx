"use client";

import { Braces } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  JSON_TOML_SAMPLE_JSON,
  JSON_TOML_SAMPLE_TOML,
  convertJsonToml,
  type JsonTomlMode,
} from "@/lib/tools/json-toml";
import type { ToolComponentProps } from "@/types";

export function JsonTomlConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<JsonTomlMode>
      defaultMode="json-to-toml"
      ActionIcon={Braces}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "json-to-toml" ? "toml-to-json" : "json-to-toml"
      }
      convert={convertJsonToml}
      modes={[
        {
          value: "json-to-toml",
          label: "JSON → TOML",
          inputLabel: "JSON",
          outputLabel: "TOML",
          placeholder: '{"name": "DevKit"}',
          sample: JSON_TOML_SAMPLE_JSON,
          successMessage: "Converted JSON to TOML",
        },
        {
          value: "toml-to-json",
          label: "TOML → JSON",
          inputLabel: "TOML",
          outputLabel: "JSON",
          placeholder: 'name = "DevKit"',
          sample: JSON_TOML_SAMPLE_TOML,
          successMessage: "Converted TOML to JSON",
        },
      ]}
    />
  );
}

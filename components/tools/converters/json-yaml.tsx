"use client";

import { Braces } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  JSON_YAML_SAMPLE_JSON,
  JSON_YAML_SAMPLE_YAML,
  convertJsonYaml,
  type JsonYamlMode,
} from "@/lib/tools/json-yaml";
import type { ToolComponentProps } from "@/types";

export function JsonYamlConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<JsonYamlMode>
      defaultMode="json-to-yaml"
      ActionIcon={Braces}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml"
      }
      convert={convertJsonYaml}
      modes={[
        {
          value: "json-to-yaml",
          label: "JSON → YAML",
          inputLabel: "JSON",
          outputLabel: "YAML",
          placeholder: '{"key": "value"}',
          sample: JSON_YAML_SAMPLE_JSON,
          successMessage: "Converted JSON to YAML",
        },
        {
          value: "yaml-to-json",
          label: "YAML → JSON",
          inputLabel: "YAML",
          outputLabel: "JSON",
          placeholder: "key: value",
          sample: JSON_YAML_SAMPLE_YAML,
          successMessage: "Converted YAML to JSON",
        },
      ]}
    />
  );
}

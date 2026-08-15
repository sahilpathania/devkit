"use client";

import { FileCode2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  YAML_XML_SAMPLE_XML,
  YAML_XML_SAMPLE_YAML,
  convertYamlXml,
  type YamlXmlMode,
} from "@/lib/tools/yaml-xml";
import type { ToolComponentProps } from "@/types";

export function YamlXmlConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<YamlXmlMode>
      defaultMode="yaml-to-xml"
      ActionIcon={FileCode2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "yaml-to-xml" ? "xml-to-yaml" : "yaml-to-xml"
      }
      convert={convertYamlXml}
      modes={[
        {
          value: "yaml-to-xml",
          label: "YAML → XML",
          inputLabel: "YAML",
          outputLabel: "XML",
          placeholder: "key: value",
          sample: YAML_XML_SAMPLE_YAML,
          successMessage: "Converted YAML to XML",
        },
        {
          value: "xml-to-yaml",
          label: "XML → YAML",
          inputLabel: "XML",
          outputLabel: "YAML",
          placeholder: "<root><key>value</key></root>",
          sample: YAML_XML_SAMPLE_XML,
          successMessage: "Converted XML to YAML",
        },
      ]}
    />
  );
}

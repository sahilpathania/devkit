"use client";

import { Braces } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  JSON_XML_SAMPLE_JSON,
  JSON_XML_SAMPLE_XML,
  convertJsonXml,
  type JsonXmlMode,
} from "@/lib/tools/json-xml";
import type { ToolComponentProps } from "@/types";

export function JsonXmlConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<JsonXmlMode>
      defaultMode="json-to-xml"
      ActionIcon={Braces}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "json-to-xml" ? "xml-to-json" : "json-to-xml"
      }
      convert={convertJsonXml}
      modes={[
        {
          value: "json-to-xml",
          label: "JSON → XML",
          inputLabel: "JSON",
          outputLabel: "XML",
          placeholder: '{"user":{"name":"DevKit"}}',
          sample: JSON_XML_SAMPLE_JSON,
          successMessage: "Converted JSON to XML",
        },
        {
          value: "xml-to-json",
          label: "XML → JSON",
          inputLabel: "XML",
          outputLabel: "JSON",
          placeholder: "<root><name>DevKit</name></root>",
          sample: JSON_XML_SAMPLE_XML,
          successMessage: "Converted XML to JSON",
        },
      ]}
    />
  );
}

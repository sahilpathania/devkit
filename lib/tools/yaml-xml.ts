import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import type { ConvertResult } from "@/lib/tools/convert-result";
import { convertJsonXml } from "@/lib/tools/json-xml";

export type YamlXmlMode = "yaml-to-xml" | "xml-to-yaml";

export function convertYamlXml(input: string, mode: YamlXmlMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "yaml-to-xml" ? "Paste YAML to convert." : "Paste XML to convert.",
    };
  }

  try {
    if (mode === "yaml-to-xml") {
      const data = parseYaml(trimmed) as unknown;
      return convertJsonXml(JSON.stringify(data), "json-to-xml");
    }

    const jsonResult = convertJsonXml(trimmed, "xml-to-json");
    if (!jsonResult.success) return jsonResult;
    const data = JSON.parse(jsonResult.output) as unknown;
    return { success: true, output: stringifyYaml(data, { lineWidth: 0 }).trimEnd() };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const YAML_XML_SAMPLE_YAML = `user:
  name: ToolBay
  roles:
    - admin
    - editor
`;

export const YAML_XML_SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user>
    <name>ToolBay</name>
    <roles>admin</roles>
    <roles>editor</roles>
  </user>
</root>`;

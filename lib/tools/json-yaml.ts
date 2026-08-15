import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import type { ConvertResult } from "@/lib/tools/convert-result";

export type JsonYamlMode = "json-to-yaml" | "yaml-to-json";

export function convertJsonYaml(input: string, mode: JsonYamlMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "json-to-yaml" ? "Paste JSON to convert." : "Paste YAML to convert.",
    };
  }

  try {
    if (mode === "json-to-yaml") {
      const data = JSON.parse(trimmed) as unknown;
      return { success: true, output: stringifyYaml(data, { lineWidth: 0 }).trimEnd() };
    }

    const data = parseYaml(trimmed) as unknown;
    return { success: true, output: JSON.stringify(data, null, 2) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const JSON_YAML_SAMPLE_JSON = `{
  "name": "DevKit",
  "tools": 100,
  "features": ["json", "yaml"],
  "meta": { "free": true }
}`;

export const JSON_YAML_SAMPLE_YAML = `name: DevKit
tools: 100
features:
  - json
  - yaml
meta:
  free: true
`;

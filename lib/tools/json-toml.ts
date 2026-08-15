import { parse as parseToml, stringify as stringifyToml } from "smol-toml";
import type { ConvertResult } from "@/lib/tools/convert-result";

export type JsonTomlMode = "json-to-toml" | "toml-to-json";

export function convertJsonToml(input: string, mode: JsonTomlMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "json-to-toml" ? "Paste JSON to convert." : "Paste TOML to convert.",
    };
  }

  try {
    if (mode === "json-to-toml") {
      const data = JSON.parse(trimmed) as unknown;
      if (data === null || typeof data !== "object" || Array.isArray(data)) {
        return {
          success: false,
          error: "TOML root must be a JSON object (not an array or primitive).",
        };
      }
      return {
        success: true,
        output: stringifyToml(data as Record<string, unknown>).trimEnd(),
      };
    }

    const data = parseToml(trimmed);
    return { success: true, output: JSON.stringify(data, null, 2) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const JSON_TOML_SAMPLE_JSON = `{
  "name": "DevKit",
  "version": 1,
  "features": ["json", "toml"],
  "meta": { "free": true }
}`;

export const JSON_TOML_SAMPLE_TOML = `name = "DevKit"
version = 1
features = ["json", "toml"]

[meta]
free = true
`;

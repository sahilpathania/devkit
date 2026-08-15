import type { ConvertResult } from "@/lib/tools/convert-result";

export type EnvJsonMode = "env-to-json" | "json-to-env";

function parseEnv(input: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = input.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const cleaned = line.startsWith("export ") ? line.slice(7).trim() : line;
    const eq = cleaned.indexOf("=");
    if (eq <= 0) continue;

    const key = cleaned.slice(0, eq).trim();
    let value = cleaned.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function toEnv(data: Record<string, unknown>): string {
  return Object.entries(data)
    .map(([key, value]) => {
      const raw =
        value === null || value === undefined
          ? ""
          : typeof value === "object"
            ? JSON.stringify(value)
            : String(value);
      const needsQuotes = /[\s#"'\\]/.test(raw) || raw === "";
      const escaped = raw.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return needsQuotes ? `${key}="${escaped}"` : `${key}=${raw}`;
    })
    .join("\n");
}

export function convertEnvJson(input: string, mode: EnvJsonMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "env-to-json" ? "Paste .env content to convert." : "Paste JSON to convert.",
    };
  }

  try {
    if (mode === "env-to-json") {
      return { success: true, output: JSON.stringify(parseEnv(trimmed), null, 2) };
    }

    const parsed = JSON.parse(trimmed) as unknown;
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { success: false, error: "JSON root must be an object of key/value pairs." };
    }
    return { success: true, output: toEnv(parsed as Record<string, unknown>) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const ENV_JSON_SAMPLE_ENV = `NAME=DevKit
TOOLS=100
FREE=true
TAGLINE="Developer tools that just work"`;

export const ENV_JSON_SAMPLE_JSON = `{
  "NAME": "DevKit",
  "TOOLS": "100",
  "FREE": "true",
  "TAGLINE": "Developer tools that just work"
}`;

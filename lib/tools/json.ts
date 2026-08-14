/**
 * Pure JSON formatting helpers — no React dependencies.
 * Keeps tool UI thin and makes logic easy to unit test.
 */

export interface JsonFormatResult {
  success: true;
  output: string;
  stats: JsonStats;
}

export interface JsonFormatError {
  success: false;
  error: string;
  /** 1-based line number when parse position is known */
  line?: number;
  column?: number;
}

export type JsonProcessResult = JsonFormatResult | JsonFormatError;

export interface JsonStats {
  characters: number;
  lines: number;
  sizeLabel: string;
}

export type JsonIndent = 2 | 4 | "\t";

/** Convert a byte length into a short human-readable size. */
export function formatByteSize(chars: number): string {
  if (chars < 1024) return `${chars} B`;
  if (chars < 1024 * 1024) return `${(chars / 1024).toFixed(1)} KB`;
  return `${(chars / (1024 * 1024)).toFixed(2)} MB`;
}

export function getJsonStats(text: string): JsonStats {
  return {
    characters: text.length,
    lines: text.length === 0 ? 0 : text.split("\n").length,
    sizeLabel: formatByteSize(new TextEncoder().encode(text).length),
  };
}

/** Map JSON.parse position to 1-based line/column. */
export function positionToLineColumn(
  source: string,
  position: number
): { line: number; column: number } {
  const slice = source.slice(0, Math.max(0, position));
  const lines = slice.split("\n");
  return {
    line: lines.length,
    column: (lines[lines.length - 1]?.length ?? 0) + 1,
  };
}

function parseJsonError(source: string, error: unknown): JsonFormatError {
  const message = error instanceof Error ? error.message : "Invalid JSON";
  const match = /position\s+(\d+)/i.exec(message);

  if (match) {
    const position = Number(match[1]);
    const { line, column } = positionToLineColumn(source, position);
    return {
      success: false,
      error: message,
      line,
      column,
    };
  }

  return { success: false, error: message };
}

/** Beautify JSON with the given indent. */
export function beautifyJson(input: string, indent: JsonIndent = 2): JsonProcessResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: "Paste JSON to format." };
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    const output = JSON.stringify(parsed, null, indent);
    return { success: true, output, stats: getJsonStats(output) };
  } catch (error) {
    return parseJsonError(trimmed, error);
  }
}

/** Collapse JSON to a single line. */
export function minifyJson(input: string): JsonProcessResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: "Paste JSON to minify." };
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    const output = JSON.stringify(parsed);
    return { success: true, output, stats: getJsonStats(output) };
  } catch (error) {
    return parseJsonError(trimmed, error);
  }
}

/** Validate without transforming — useful for status badges. */
export function validateJson(input: string): JsonProcessResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: "Empty input" };
  }

  try {
    JSON.parse(trimmed);
    return { success: true, output: trimmed, stats: getJsonStats(trimmed) };
  } catch (error) {
    return parseJsonError(trimmed, error);
  }
}

export const JSON_FORMATTER_SAMPLE = `{
  "name": "DevKit",
  "version": 1,
  "features": ["format", "minify", "validate"],
  "meta": {
    "free": true,
    "offline": true
  }
}`;

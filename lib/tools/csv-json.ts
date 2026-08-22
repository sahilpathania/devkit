import type { ConvertResult } from "@/lib/tools/convert-result";

export type CsvJsonMode = "csv-to-json" | "json-to-csv";

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i]!;
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells;
}

function splitCsvRows(input: string): string[] {
  const rows: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i]!;
    if (char === '"') inQuotes = !inQuotes;
    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && input[i + 1] === "\n") i++;
      if (current.trim() !== "" || current.includes(",")) rows.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  if (current.length) rows.push(current);
  return rows;
}

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function convertCsvJson(input: string, mode: CsvJsonMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "csv-to-json" ? "Paste CSV to convert." : "Paste JSON to convert.",
    };
  }

  try {
    if (mode === "csv-to-json") {
      const rows = splitCsvRows(trimmed);
      if (rows.length === 0) return { success: false, error: "CSV is empty." };
      const headers = parseCsvLine(rows[0]!).map((h) => h.trim() || "column");
      const data = rows.slice(1).map((row) => {
        const cells = parseCsvLine(row);
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = cells[index] ?? "";
        });
        return obj;
      });
      return { success: true, output: JSON.stringify(data, null, 2) };
    }

    const parsed = JSON.parse(trimmed) as unknown;
    const rows = Array.isArray(parsed) ? parsed : [parsed];
    if (rows.length === 0) return { success: true, output: "" };

    const headers: string[] = [];
    for (const row of rows) {
      if (row && typeof row === "object" && !Array.isArray(row)) {
        for (const key of Object.keys(row as object)) {
          if (!headers.includes(key)) headers.push(key);
        }
      }
    }
    if (headers.length === 0) {
      return { success: false, error: "JSON must be an object or array of objects." };
    }

    const lines = [
      headers.map(escapeCsvCell).join(","),
      ...rows.map((row) => {
        const record =
          row && typeof row === "object" && !Array.isArray(row)
            ? (row as Record<string, unknown>)
            : {};
        return headers
          .map((header) => {
            const value = record[header];
            if (value === null || value === undefined) return "";
            if (typeof value === "object") return escapeCsvCell(JSON.stringify(value));
            return escapeCsvCell(String(value));
          })
          .join(",");
      }),
    ];

    return { success: true, output: lines.join("\n") };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const CSV_JSON_SAMPLE_CSV = `name,tools,free
ToolBay,100,true
Studio,42,false`;

export const CSV_JSON_SAMPLE_JSON = `[
  { "name": "ToolBay", "tools": 100, "free": true },
  { "name": "Studio", "tools": 42, "free": false }
]`;

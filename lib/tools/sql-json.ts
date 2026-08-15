import type { ConvertResult } from "@/lib/tools/convert-result";

export type SqlJsonMode = "sql-to-json" | "json-to-sql";

function unquoteSql(value: string): string | number | boolean | null {
  const v = value.trim();
  if (/^null$/i.test(v)) return null;
  if (/^true$/i.test(v)) return true;
  if (/^false$/i.test(v)) return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  if (
    (v.startsWith("'") && v.endsWith("'")) ||
    (v.startsWith('"') && v.endsWith('"'))
  ) {
    return v.slice(1, -1).replace(/''/g, "'");
  }
  return v;
}

function sqlLiteral(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  const s = String(value).replace(/'/g, "''");
  return `'${s}'`;
}

/** Parse simple INSERT INTO … VALUES (…) statements into JSON rows. */
function sqlToJson(sql: string): ConvertResult {
  const insertRe =
    /insert\s+into\s+[`"[]?(\w+)[`"\]]?(?:\s*\(([^)]+)\))?\s*values\s*/gi;
  const rows: Record<string, unknown>[] = [];
  let table = "table";
  let columns: string[] | null = null;

  const text = sql.trim();

  // Find first INSERT to get table/columns
  const header = insertRe.exec(text);
  if (!header) {
    return {
      success: false,
      error:
        "Could not parse SQL. Paste INSERT INTO … VALUES (…) statements (best-effort).",
    };
  }

  table = header[1]!;
  columns = header[2]
    ? header[2].split(",").map((c) => c.trim().replace(/^[`"[]|[`"\]]$/g, ""))
    : null;

  // Collect all value tuples after VALUES (and subsequent INSERTs)
  let tuple: RegExpExecArray | null;

  // Also handle multiple INSERT statements
  const statements = text.split(/;\s*(?=insert\s+into)/i);

  for (const stmt of statements) {
    const h = /insert\s+into\s+[`"[]?(\w+)[`"\]]?(?:\s*\(([^)]+)\))?\s*values\s*/i.exec(
      stmt
    );
    if (!h) continue;
    table = h[1]!;
    columns = h[2]
      ? h[2].split(",").map((c) => c.trim().replace(/^[`"[]|[`"\]]$/g, ""))
      : columns;

    const after = stmt.slice(h.index! + h[0].length);
    const localTupleRe = /\(([^()]*)\)/g;
    while ((tuple = localTupleRe.exec(after)) !== null) {
      const cells = splitSqlValues(tuple[1]!);
      const row: Record<string, unknown> = {};
      cells.forEach((cell, i) => {
        const key = columns?.[i] ?? `col${i + 1}`;
        row[key] = unquoteSql(cell);
      });
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return { success: false, error: "No VALUE tuples found in SQL." };
  }

  return {
    success: true,
    output: JSON.stringify({ table, rows }, null, 2),
  };
}

function splitSqlValues(inner: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuote: "'" | '"' | null = null;

  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i]!;
    const next = inner[i + 1];
    if (inQuote) {
      if (ch === inQuote && next === inQuote) {
        current += ch + next;
        i++;
        continue;
      }
      if (ch === inQuote) {
        inQuote = null;
        current += ch;
        continue;
      }
      current += ch;
      continue;
    }
    if (ch === "'" || ch === '"') {
      inQuote = ch;
      current += ch;
      continue;
    }
    if (ch === ",") {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim() || cells.length > 0) cells.push(current.trim());
  return cells;
}

function jsonToSql(input: string): ConvertResult {
  const parsed = JSON.parse(input) as unknown;
  let table = "table";
  let rows: Record<string, unknown>[] = [];

  if (Array.isArray(parsed)) {
    rows = parsed.filter((r) => r && typeof r === "object") as Record<
      string,
      unknown
    >[];
  } else if (parsed && typeof parsed === "object") {
    const obj = parsed as Record<string, unknown>;
    if (typeof obj.table === "string") table = obj.table;
    if (Array.isArray(obj.rows)) {
      rows = obj.rows.filter((r) => r && typeof r === "object") as Record<
        string,
        unknown
      >[];
    } else if (Array.isArray(obj.data)) {
      rows = obj.data.filter((r) => r && typeof r === "object") as Record<
        string,
        unknown
      >[];
    } else {
      rows = [obj];
    }
  }

  if (rows.length === 0) {
    return { success: false, error: "JSON must be an array of objects or { table, rows }." };
  }

  const columns = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  );

  const colList = columns.map((c) => `"${c}"`).join(", ");
  const valueLines = rows.map((row) => {
    const vals = columns.map((c) => sqlLiteral(row[c])).join(", ");
    return `(${vals})`;
  });

  const sql = `INSERT INTO "${table}" (${colList})\nVALUES\n  ${valueLines.join(",\n  ")};`;
  return { success: true, output: sql };
}

export function convertSqlJson(input: string, mode: SqlJsonMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "sql-to-json" ? "Paste SQL INSERT statements." : "Paste JSON to convert.",
    };
  }

  try {
    return mode === "sql-to-json" ? sqlToJson(trimmed) : jsonToSql(trimmed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const SQL_JSON_SAMPLE_SQL = `INSERT INTO users (id, name, active)
VALUES
  (1, 'Ada', TRUE),
  (2, 'Linus', FALSE);`;

export const SQL_JSON_SAMPLE_JSON = `{
  "table": "users",
  "rows": [
    { "id": 1, "name": "Ada", "active": true },
    { "id": 2, "name": "Linus", "active": false }
  ]
}`;

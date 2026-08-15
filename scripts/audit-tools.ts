import { TOOLS } from "../services/tools";

const implemented = new Set([
  "json-formatter",
  "json-validator",
  "jwt-decoder",
  "base64",
  "url-encode-decode",
  "json-yaml",
  "json-xml",
  "csv-json",
  "markdown-html",
  "hex-rgb",
  "timestamp-converter",
  "json-toml",
  "env-json",
  "yaml-xml",
  "csv-xml",
  "html-jsx",
  "css-scss",
  "cjs-esm",
  "sql-json",
  "image-converter",
  "svg-converter",
  "ico-converter",
  "json-to-model",
  "hash-generator",
  "uuid-generator",
  "color-converter",
  "color-palette-generator",
  "unit-converter",
  "currency-converter",
  "text-case-converter",
  "word-counter",
  "percentage-calculator",
  "number-base-converter",
]);

const placeholders = TOOLS.filter((t) => !implemented.has(t.component)).map(
  (t) => `${t.slug} -> ${t.component}`
);
const counts = new Map<string, number>();
for (const t of TOOLS) counts.set(t.slug, (counts.get(t.slug) ?? 0) + 1);
const dupes = [...counts.entries()].filter(([, c]) => c > 1);

console.log("tools:", TOOLS.length);
console.log("placeholders:", placeholders.length ? placeholders.join("\n") : "none");
console.log("duplicate slugs:", dupes.length ? JSON.stringify(dupes) : "none");

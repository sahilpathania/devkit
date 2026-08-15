import type { ConvertResult } from "@/lib/tools/convert-result";

export type CjsEsmMode = "cjs-to-esm" | "esm-to-cjs";

function cjsToEsm(input: string): string {
  let out = input;

  out = out.replace(
    /(?:const|let|var)\s+(\w+)\s*=\s*require\(\s*['"]([^'"]+)['"]\s*\)\.(\w+)\s*;?/g,
    'import { $3 as $1 } from "$2";'
  );
  out = out.replace(
    /(?:const|let|var)\s+\{\s*([^}]+)\s*\}\s*=\s*require\(\s*['"]([^'"]+)['"]\s*\)\s*;?/g,
    'import { $1 } from "$2";'
  );
  out = out.replace(
    /(?:const|let|var)\s+(\w+)\s*=\s*require\(\s*['"]([^'"]+)['"]\s*\)\s*;?/g,
    'import $1 from "$2";'
  );

  out = out.replace(/module\.exports\s*=\s*\{([\s\S]*?)\}\s*;?/g, "export {$1};");
  out = out.replace(/module\.exports\s*=\s*([^;]+);?/g, "export default $1;");
  out = out.replace(/exports\.(\w+)\s*=\s*([^;]+);?/g, "export const $1 = $2;");

  return out.trim();
}

function esmToCjs(input: string): string {
  let out = input;

  out = out.replace(
    /import\s+(\w+)\s*,\s*\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"]\s*;?/g,
    'const $1 = require("$3");\nconst { $2 } = require("$3");'
  );
  out = out.replace(
    /import\s+\*\s+as\s+(\w+)\s+from\s*['"]([^'"]+)['"]\s*;?/g,
    'const $1 = require("$2");'
  );
  out = out.replace(
    /import\s+\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"]\s*;?/g,
    'const { $1 } = require("$2");'
  );
  out = out.replace(
    /import\s+(\w+)\s+from\s*['"]([^'"]+)['"]\s*;?/g,
    'const $1 = require("$2");'
  );
  out = out.replace(/import\s*['"]([^'"]+)['"]\s*;?/g, 'require("$1");');

  out = out.replace(/export\s+default\s+/g, "module.exports = ");
  out = out.replace(
    /export\s+const\s+(\w+)\s*=\s*([^;]+);?/g,
    "const $1 = $2;\nexports.$1 = $1;"
  );
  out = out.replace(/export\s+function\s+(\w+)/g, "function $1");
  out = out.replace(/export\s+\{([^}]+)\}\s*;?/g, (_m, names: string) =>
    names
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .map((n) => {
        const asMatch = n.match(/^(\w+)\s+as\s+(\w+)$/);
        if (asMatch) return `exports.${asMatch[2]} = ${asMatch[1]};`;
        return `exports.${n} = ${n};`;
      })
      .join("\n")
  );

  return out.trim();
}

export function convertCjsEsm(input: string, mode: CjsEsmMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error:
        mode === "cjs-to-esm"
          ? "Paste CommonJS code to convert."
          : "Paste ESM code to convert.",
    };
  }

  try {
    const output = mode === "cjs-to-esm" ? cjsToEsm(trimmed) : esmToCjs(trimmed);
    return { success: true, output };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const CJS_ESM_SAMPLE_CJS = `const fs = require("fs");
const { join } = require("path");

function read(name) {
  return fs.readFileSync(join(__dirname, name), "utf8");
}

module.exports = { read };
exports.version = "1.0.0";`;

export const CJS_ESM_SAMPLE_ESM = `import fs from "fs";
import { join } from "path";

function read(name) {
  return fs.readFileSync(join(__dirname, name), "utf8");
}

export { read };
export const version = "1.0.0";`;

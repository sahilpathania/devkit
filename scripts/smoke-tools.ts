/**
 * Smoke tests for Phase 2–5 pure converters (no test runner required).
 * Run: npx tsx scripts/smoke-tools.ts
 */
import { convertJsonToml } from "../lib/tools/json-toml";
import { convertEnvJson } from "../lib/tools/env-json";
import { convertYamlXml } from "../lib/tools/yaml-xml";
import { convertCsvXml } from "../lib/tools/csv-xml";
import { convertHtmlJsx } from "../lib/tools/html-jsx";
import { convertCssScss } from "../lib/tools/css-scss";
import { convertCjsEsm } from "../lib/tools/cjs-esm";
import { convertSqlJson } from "../lib/tools/sql-json";
import { convertJsonToModel } from "../lib/tools/json-model";
import { md5, hashText } from "../lib/tools/hash";
import { generateUuidV4, generateUuids } from "../lib/tools/uuid";
import { fromHex, complementary, generatePalette } from "../lib/tools/color";
import { convertUnit } from "../lib/tools/units";
import { convertTextCase, analyzeText } from "../lib/tools/text";
import { calculatePercentage, convertNumberBase } from "../lib/tools/calculators";
import { convertJsonYaml } from "../lib/tools/json-yaml";
import { convertJsonXml } from "../lib/tools/json-xml";
import { convertCsvJson } from "../lib/tools/csv-json";

let failed = 0;
let passed = 0;

function assert(name: string, cond: boolean, detail?: string) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

async function main() {
  console.log("\nPhase 1–2 converters");
  {
    const r = convertJsonYaml('{"a":1}', "json-to-yaml");
    assert("json-yaml", r.success && r.output.includes("a:"));
  }
  {
    const r = convertJsonXml('{"user":{"name":"x"}}', "json-to-xml");
    assert("json-xml", r.success && r.output.includes("<user>"));
  }
  {
    const r = convertCsvJson("a,b\n1,2", "csv-to-json");
    assert("csv-json", r.success && r.output.includes('"a"'));
  }
  {
    const r = convertJsonToml('{"name":"DevKit","v":1}', "json-to-toml");
    assert("json-toml", r.success && r.output.includes("name"));
  }
  {
    const r = convertEnvJson("A=1\nB=two", "env-to-json");
    assert("env-json", r.success && r.output.includes('"A"'));
  }
  {
    const r = convertYamlXml("name: DevKit\n", "yaml-to-xml");
    assert("yaml-xml", r.success && r.output.toLowerCase().includes("name"));
  }
  {
    const r = convertCsvXml("a,b\n1,2", "csv-to-xml");
    assert("csv-xml", r.success && r.output.includes("<"));
  }
  {
    const r = convertHtmlJsx('<div class="x"></div>', "html-to-jsx");
    assert("html-jsx", r.success && r.output.includes("className"));
  }
  {
    const r = convertCssScss(".a { color: red; }\n.a .b { color: blue; }", "css-to-scss");
    assert("css-scss", r.success && r.output.includes(".a"));
  }
  {
    const r = convertCjsEsm('const fs = require("fs");', "cjs-to-esm");
    assert("cjs-esm", r.success && r.output.includes("import"));
  }
  {
    const r = convertSqlJson(
      "INSERT INTO users (id, name) VALUES (1, 'Ada');",
      "sql-to-json"
    );
    assert("sql-json", r.success && r.output.includes("Ada"));
  }

  console.log("\nPhase 4 models");
  for (const lang of [
    "typescript",
    "swift",
    "kotlin",
    "dart",
    "csharp",
    "java",
    "go",
    "rust",
  ] as const) {
    const r = convertJsonToModel(
      '{"id":1,"owner":{"email":"a@b.com"},"tags":["x"]}',
      lang,
      "Root"
    );
    assert(`json-to-${lang}`, r.success && r.output.length > 20, r.success ? undefined : r.error);
  }

  console.log("\nPhase 5 utilities");
  assert("md5-known", md5("") === "d41d8cd98f00b204e9800998ecf8427e");
  assert("md5-len", md5("DevKit").length === 32);
  {
    const h = await hashText("DevKit", "sha-256");
    assert("sha-256", h.length === 64);
  }
  {
    const id = generateUuidV4();
    assert("uuid-v4-format", /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id));
    assert("uuid-bulk", generateUuids(5).length === 5);
  }
  {
    const c = fromHex("#0d9488");
    assert("color-from-hex", Boolean(c && c.rgb.r === 13));
    assert("color-complement", Boolean(complementary("#0d9488")));
    assert("color-palette", (generatePalette("#0d9488")?.length ?? 0) === 9);
  }
  assert("unit-km-m", Math.abs(convertUnit(1, "length", "km", "m") - 1000) < 1e-9);
  assert("unit-c-f", Math.abs(convertUnit(0, "temperature", "C", "F") - 32) < 1e-9);
  assert("text-camel", convertTextCase("hello world", "camel") === "helloWorld");
  assert("text-snake", convertTextCase("Hello World", "snake") === "hello_world");
  {
    const s = analyzeText("One two three. Four five.");
    assert("word-count", s.words === 5);
  }
  {
    const r = calculatePercentage("percent-of", 15, 200);
    assert("percent-of", r.result === 30);
  }
  assert("base-dec-hex", convertNumberBase("255", 10, 16) === "FF");
  assert("base-hex-bin", convertNumberBase("FF", 16, 2) === "11111111");

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

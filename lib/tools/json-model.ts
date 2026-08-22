import type { ConvertResult } from "@/lib/tools/convert-result";

export type ModelLanguage =
  | "typescript"
  | "swift"
  | "kotlin"
  | "dart"
  | "csharp"
  | "java"
  | "go"
  | "rust";

export const MODEL_LANGUAGES: { value: ModelLanguage; label: string }[] = [
  { value: "typescript", label: "TypeScript" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "dart", label: "Dart" },
  { value: "csharp", label: "C#" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

type JsonSchema =
  | { kind: "null" }
  | { kind: "boolean" }
  | { kind: "number"; integer: boolean }
  | { kind: "string" }
  | { kind: "array"; element: JsonSchema }
  | { kind: "object"; fields: Map<string, JsonSchema> }
  | { kind: "any" };

function isInteger(n: number): boolean {
  return Number.isInteger(n) && Number.isFinite(n);
}

function inferValue(value: unknown): JsonSchema {
  if (value === null) return { kind: "null" };
  if (typeof value === "boolean") return { kind: "boolean" };
  if (typeof value === "number") {
    return { kind: "number", integer: isInteger(value) };
  }
  if (typeof value === "string") return { kind: "string" };
  if (Array.isArray(value)) {
    if (value.length === 0) return { kind: "array", element: { kind: "any" } };
    let element = inferValue(value[0]);
    for (let i = 1; i < value.length; i++) {
      element = mergeSchemas(element, inferValue(value[i]));
    }
    return { kind: "array", element };
  }
  if (typeof value === "object") {
    const fields = new Map<string, JsonSchema>();
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      fields.set(key, inferValue(val));
    }
    return { kind: "object", fields };
  }
  return { kind: "any" };
}

function mergeSchemas(a: JsonSchema, b: JsonSchema): JsonSchema {
  if (a.kind === "any") return b;
  if (b.kind === "any") return a;
  if (a.kind === "null") return makeOptional(b);
  if (b.kind === "null") return makeOptional(a);

  if (a.kind === b.kind) {
    if (a.kind === "number" && b.kind === "number") {
      return { kind: "number", integer: a.integer && b.integer };
    }
    if (a.kind === "array" && b.kind === "array") {
      return { kind: "array", element: mergeSchemas(a.element, b.element) };
    }
    if (a.kind === "object" && b.kind === "object") {
      const fields = new Map<string, JsonSchema>();
      const keys = new Set([...a.fields.keys(), ...b.fields.keys()]);
      for (const key of keys) {
        const left = a.fields.get(key);
        const right = b.fields.get(key);
        if (left && right) fields.set(key, mergeSchemas(left, right));
        else if (left) fields.set(key, makeOptional(left));
        else if (right) fields.set(key, makeOptional(right));
      }
      return { kind: "object", fields };
    }
    return a;
  }

  // Mixed primitives → any (best-effort)
  return { kind: "any" };
}

/** Represent optional/nullable by wrapping object fields; for primitives use any or keep as-is with null union in emitters. */
function makeOptional(schema: JsonSchema): JsonSchema {
  if (schema.kind === "null") return schema;
  // Mark via a synthetic: merge with null is handled in emitters by checking for null in unions.
  // Store as object field metadata isn't available — use a tagged any with comment.
  // Simpler: return schema and let missing keys be optional; for null values in array merge we use any.
  if (schema.kind === "object" || schema.kind === "array") return schema;
  return { kind: "any" };
}

function toPascalCase(input: string): string {
  const cleaned = input.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  if (!cleaned) return "Model";
  const parts = cleaned.split(/\s+/);
  const joined = parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return /^[0-9]/.test(joined) ? `N${joined}` : joined;
}

function toCamelCase(input: string): string {
  const pascal = toPascalCase(input);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toSnakeCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase() || "field";
}

interface NamedObject {
  name: string;
  fields: Map<string, JsonSchema>;
}

function typeNameFor(
  schema: JsonSchema,
  keyHint: string,
  objectNames: Map<JsonSchema, string>,
  lang: ModelLanguage
): string {
  switch (schema.kind) {
    case "null":
      return nullablePrimitive(lang);
    case "boolean":
      return boolType(lang);
    case "number":
      return numberType(lang, schema.integer);
    case "string":
      return stringType(lang);
    case "any":
      return anyType(lang);
    case "array": {
      const inner = typeNameFor(schema.element, keyHint, objectNames, lang);
      return arrayType(lang, inner);
    }
    case "object": {
      const named = objectNames.get(schema);
      return named ?? toPascalCase(keyHint);
    }
    default:
      return anyType(lang);
  }
}

function boolType(lang: ModelLanguage): string {
  switch (lang) {
    case "typescript":
      return "boolean";
    case "swift":
      return "Bool";
    case "kotlin":
    case "java":
      return "Boolean";
    case "dart":
      return "bool";
    case "csharp":
      return "bool";
    case "go":
      return "bool";
    case "rust":
      return "bool";
  }
}

function numberType(lang: ModelLanguage, integer: boolean): string {
  switch (lang) {
    case "typescript":
      return "number";
    case "swift":
      return integer ? "Int" : "Double";
    case "kotlin":
      return integer ? "Int" : "Double";
    case "dart":
      return integer ? "int" : "double";
    case "csharp":
      return integer ? "int" : "double";
    case "java":
      return integer ? "Integer" : "Double";
    case "go":
      return integer ? "int64" : "float64";
    case "rust":
      return integer ? "i64" : "f64";
  }
}

function stringType(lang: ModelLanguage): string {
  switch (lang) {
    case "typescript":
    case "dart":
    case "go":
      return "string";
    case "swift":
    case "kotlin":
    case "csharp":
    case "java":
    case "rust":
      return "String";
  }
}

function anyType(lang: ModelLanguage): string {
  switch (lang) {
    case "typescript":
      return "unknown";
    case "swift":
      return "Any";
    case "kotlin":
      return "Any";
    case "dart":
      return "dynamic";
    case "csharp":
      return "object";
    case "java":
      return "Object";
    case "go":
      return "interface{}";
    case "rust":
      return "serde_json::Value";
  }
}

function arrayType(lang: ModelLanguage, inner: string): string {
  switch (lang) {
    case "typescript":
      return `${inner}[]`;
    case "swift":
      return `[${inner}]`;
    case "kotlin":
      return `List<${inner}>`;
    case "dart":
      return `List<${inner}>`;
    case "csharp":
      return `List<${inner}>`;
    case "java":
      return `List<${inner}>`;
    case "go":
      return `[]${inner}`;
    case "rust":
      return `Vec<${inner}>`;
  }
}

function nullablePrimitive(lang: ModelLanguage): string {
  switch (lang) {
    case "typescript":
      return "null";
    case "swift":
      return "Any?";
    case "kotlin":
      return "Any?";
    case "dart":
      return "dynamic";
    case "csharp":
      return "object";
    case "java":
      return "Object";
    case "go":
      return "interface{}";
    case "rust":
      return "Option<serde_json::Value>";
  }
}

function buildObjectNameMap(
  root: JsonSchema,
  rootName: string
): { objects: NamedObject[]; names: Map<JsonSchema, string> } {
  const objects: NamedObject[] = [];
  const used = new Set<string>();
  const names = new Map<JsonSchema, string>();

  function walk(schema: JsonSchema, hint: string, isRoot: boolean) {
    if (schema.kind === "array") {
      walk(schema.element, hint, false);
      return;
    }
    if (schema.kind !== "object") return;

    const base = isRoot ? rootName : toPascalCase(hint);
    let name = base;
    let i = 2;
    while (used.has(name)) name = `${base}${i++}`;
    used.add(name);
    objects.push({ name, fields: schema.fields });
    names.set(schema, name);

    for (const [key, field] of schema.fields) {
      walk(field, key, false);
    }
  }

  // If root is array, wrap conceptually
  if (root.kind === "array") {
    walk(root.element, rootName, true);
  } else if (root.kind === "object") {
    walk(root, rootName, true);
  }

  return { objects, names };
}

function generateTypeScript(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  if (objects.length === 0) {
    return `export type ${rootName} = ${typeNameFor(root, rootName, names, "typescript")};\n`;
  }

  // Emit nested types first (reverse so root last)
  const lines: string[] = [];
  for (const obj of [...objects].reverse()) {
    lines.push(`export interface ${obj.name} {`);
    for (const [key, field] of obj.fields) {
      const optional =
        field.kind === "null" || field.kind === "any" ? "?" : "";
      const t = typeNameFor(field, key, names, "typescript");
      const safeKey = /^[a-zA-Z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
      lines.push(`  ${safeKey}${optional}: ${t};`);
    }
    lines.push(`}\n`);
  }

  if (root.kind === "array") {
    const inner = typeNameFor(root.element, rootName, names, "typescript");
    lines.push(`export type ${rootName} = ${inner}[];\n`);
  }

  return lines.join("\n");
}

function generateSwift(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  const lines: string[] = [];
  for (const obj of [...objects].reverse()) {
    lines.push(`struct ${obj.name}: Codable {`);
    for (const [key, field] of obj.fields) {
      const t = typeNameFor(field, key, names, "swift");
      const prop = toCamelCase(key);
      if (prop !== key) {
        lines.push(`  let ${prop}: ${t} // json: ${key}`);
      } else {
        lines.push(`  let ${prop}: ${t}`);
      }
    }
    // CodingKeys if needed
    const needsKeys = [...obj.fields.keys()].some((k) => toCamelCase(k) !== k);
    if (needsKeys) {
      lines.push(`  enum CodingKeys: String, CodingKey {`);
      for (const key of obj.fields.keys()) {
        const prop = toCamelCase(key);
        if (prop === key) lines.push(`    case ${prop}`);
        else lines.push(`    case ${prop} = "${key}"`);
      }
      lines.push(`  }`);
    }
    lines.push(`}\n`);
  }
  if (root.kind === "array" && objects.length) {
    lines.push(`typealias ${rootName} = [${objects[0]!.name}]\n`);
  } else if (objects.length === 0) {
    lines.push(`typealias ${rootName} = ${typeNameFor(root, rootName, names, "swift")}\n`);
  }
  return lines.join("\n");
}

function generateKotlin(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  const lines: string[] = [`import kotlinx.serialization.SerialName`, `import kotlinx.serialization.Serializable`, ``];
  for (const obj of [...objects].reverse()) {
    lines.push(`@Serializable`);
    lines.push(`data class ${obj.name}(`);
    const entries = [...obj.fields.entries()];
    entries.forEach(([key, field], idx) => {
      const t = typeNameFor(field, key, names, "kotlin");
      const prop = toCamelCase(key);
      const comma = idx < entries.length - 1 ? "," : "";
      if (prop !== key) {
        lines.push(`  @SerialName("${key}") val ${prop}: ${t}${comma}`);
      } else {
        lines.push(`  val ${prop}: ${t}${comma}`);
      }
    });
    lines.push(`)\n`);
  }
  if (root.kind === "array" && objects.length) {
    lines.push(`typealias ${rootName} = List<${objects[0]!.name}>\n`);
  } else if (objects.length === 0) {
    lines.push(`typealias ${rootName} = ${typeNameFor(root, rootName, names, "kotlin")}\n`);
  }
  return lines.join("\n");
}

function generateDart(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  const lines: string[] = [];
  for (const obj of [...objects].reverse()) {
    lines.push(`class ${obj.name} {`);
    for (const [key, field] of obj.fields) {
      const t = typeNameFor(field, key, names, "dart");
      const prop = toCamelCase(key);
      lines.push(`  final ${t} ${prop};`);
    }
    lines.push(``);
    lines.push(`  ${obj.name}({`);
    for (const key of obj.fields.keys()) {
      lines.push(`    required this.${toCamelCase(key)},`);
    }
    lines.push(`  });`);
    lines.push(``);
    lines.push(`  factory ${obj.name}.fromJson(Map<String, dynamic> json) {`);
    lines.push(`    return ${obj.name}(`);
    for (const [key, field] of obj.fields) {
      const prop = toCamelCase(key);
      const cast = dartFromJsonExpr(field, key, names);
      lines.push(`      ${prop}: ${cast},`);
    }
    lines.push(`    );`);
    lines.push(`  }`);
    lines.push(``);
    lines.push(`  Map<String, dynamic> toJson() => {`);
    for (const [key, field] of obj.fields) {
      const prop = toCamelCase(key);
      lines.push(`    '${key}': ${dartToJsonExpr(field, prop)},`);
    }
    lines.push(`  };`);
    lines.push(`}\n`);
  }
  if (root.kind === "array" && objects.length) {
    lines.push(`typedef ${rootName} = List<${objects[0]!.name}>;\n`);
  } else if (objects.length === 0) {
    lines.push(`typedef ${rootName} = ${typeNameFor(root, rootName, names, "dart")};\n`);
  }
  return lines.join("\n");
}

function dartFromJsonExpr(
  field: JsonSchema,
  key: string,
  names: Map<JsonSchema, string>
): string {
  if (field.kind === "object") {
    const name = names.get(field) ?? toPascalCase(key);
    return `${name}.fromJson(json['${key}'] as Map<String, dynamic>)`;
  }
  if (field.kind === "array") {
    if (field.element.kind === "object") {
      const name = names.get(field.element) ?? toPascalCase(key);
      return `(json['${key}'] as List<dynamic>).map((e) => ${name}.fromJson(e as Map<String, dynamic>)).toList()`;
    }
    const inner = typeNameFor(field.element, key, names, "dart");
    return `(json['${key}'] as List<dynamic>).cast<${inner}>()`;
  }
  const t = typeNameFor(field, key, names, "dart");
  return `json['${key}'] as ${t}`;
}

function dartToJsonExpr(field: JsonSchema, prop: string): string {
  if (field.kind === "object") return `${prop}.toJson()`;
  if (field.kind === "array" && field.element.kind === "object") {
    return `${prop}.map((e) => e.toJson()).toList()`;
  }
  return prop;
}

function generateCSharp(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  const lines: string[] = [
    `using System.Collections.Generic;`,
    `using System.Text.Json.Serialization;`,
    ``,
  ];
  for (const obj of [...objects].reverse()) {
    lines.push(`public class ${obj.name}`);
    lines.push(`{`);
    for (const [key, field] of obj.fields) {
      const t = typeNameFor(field, key, names, "csharp");
      const prop = toPascalCase(key);
      lines.push(`  [JsonPropertyName("${key}")]`);
      lines.push(`  public ${t} ${prop} { get; set; }`);
      lines.push(``);
    }
    lines.push(`}\n`);
  }
  if (root.kind === "array" && objects.length) {
    lines.push(`// Root is an array of ${objects[0]!.name}`);
  } else if (objects.length === 0) {
    lines.push(`// Root type: ${typeNameFor(root, rootName, names, "csharp")}`);
  }
  return lines.join("\n");
}

function generateJava(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  const lines: string[] = [
    `import com.fasterxml.jackson.annotation.JsonProperty;`,
    `import java.util.List;`,
    ``,
  ];
  for (const obj of [...objects].reverse()) {
    lines.push(`public class ${obj.name} {`);
    for (const [key, field] of obj.fields) {
      const t = typeNameFor(field, key, names, "java");
      const prop = toCamelCase(key);
      lines.push(`  @JsonProperty("${key}")`);
      lines.push(`  public ${t} ${prop};`);
      lines.push(``);
    }
    lines.push(`}\n`);
  }
  if (objects.length === 0) {
    lines.push(`// Root type: ${typeNameFor(root, rootName, names, "java")}`);
  }
  return lines.join("\n");
}

function generateGo(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  const lines: string[] = [`package models`, ``];
  for (const obj of [...objects].reverse()) {
    lines.push(`type ${obj.name} struct {`);
    for (const [key, field] of obj.fields) {
      const t = typeNameFor(field, key, names, "go");
      const prop = toPascalCase(key);
      lines.push(`\t${prop} ${t} \`json:"${key}"\``);
    }
    lines.push(`}\n`);
  }
  if (root.kind === "array" && objects.length) {
    lines.push(`type ${rootName} []${objects[0]!.name}\n`);
  } else if (objects.length === 0) {
    lines.push(`type ${rootName} ${typeNameFor(root, rootName, names, "go")}\n`);
  }
  return lines.join("\n");
}

function generateRust(
  root: JsonSchema,
  rootName: string,
  objects: NamedObject[],
  names: Map<JsonSchema, string>
): string {
  const lines: string[] = [
    `use serde::{Deserialize, Serialize};`,
    `use serde_json::Value;`,
    ``,
  ];
  for (const obj of [...objects].reverse()) {
    lines.push(`#[derive(Debug, Clone, Serialize, Deserialize)]`);
    lines.push(`pub struct ${obj.name} {`);
    for (const [key, field] of obj.fields) {
      const t = typeNameFor(field, key, names, "rust");
      const prop = toSnakeCase(key);
      if (prop !== key) {
        lines.push(`  #[serde(rename = "${key}")]`);
      }
      lines.push(`  pub ${prop}: ${t},`);
    }
    lines.push(`}\n`);
  }
  if (root.kind === "array" && objects.length) {
    lines.push(`pub type ${rootName} = Vec<${objects[0]!.name}>;\n`);
  } else if (objects.length === 0) {
    lines.push(`pub type ${rootName} = ${typeNameFor(root, rootName, names, "rust")};\n`);
  }
  return lines.join("\n");
}

export function convertJsonToModel(
  input: string,
  language: ModelLanguage,
  rootName = "Root"
): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: "Paste JSON to generate a model." };
  }

  let data: unknown;
  try {
    data = JSON.parse(trimmed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON";
    return { success: false, error: message };
  }

  const name = toPascalCase(rootName || "Root");
  const schema = inferValue(data);
  const { objects, names } = buildObjectNameMap(schema, name);

  let output: string;
  switch (language) {
    case "typescript":
      output = generateTypeScript(schema, name, objects, names);
      break;
    case "swift":
      output = generateSwift(schema, name, objects, names);
      break;
    case "kotlin":
      output = generateKotlin(schema, name, objects, names);
      break;
    case "dart":
      output = generateDart(schema, name, objects, names);
      break;
    case "csharp":
      output = generateCSharp(schema, name, objects, names);
      break;
    case "java":
      output = generateJava(schema, name, objects, names);
      break;
    case "go":
      output = generateGo(schema, name, objects, names);
      break;
    case "rust":
      output = generateRust(schema, name, objects, names);
      break;
  }

  return { success: true, output: output.trimEnd() + "\n" };
}

export const JSON_MODEL_SAMPLE = `{
  "id": 42,
  "name": "ToolBay",
  "free": true,
  "tags": ["json", "mobile"],
  "owner": {
    "email": "dev@example.com",
    "role": "admin"
  },
  "stats": {
    "tools": 100,
    "rating": 4.9
  }
}`;

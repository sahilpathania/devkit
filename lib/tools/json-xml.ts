import type { ConvertResult } from "@/lib/tools/convert-result";

export type JsonXmlMode = "json-to-xml" | "xml-to-json";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toXml(value: unknown, nodeName = "root", indent = 0): string {
  const pad = "  ".repeat(indent);

  if (value === null || value === undefined) {
    return `${pad}<${nodeName} />`;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return `${pad}<${nodeName}>${escapeXml(String(value))}</${nodeName}>`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}<${nodeName} />`;
    return value.map((item) => toXml(item, nodeName, indent)).join("\n");
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${pad}<${nodeName} />`;
    const children = entries
      .map(([key, child]) => toXml(child, sanitizeTag(key), indent + 1))
      .join("\n");
    return `${pad}<${nodeName}>\n${children}\n${pad}</${nodeName}>`;
  }

  return `${pad}<${nodeName}>${escapeXml(String(value))}</${nodeName}>`;
}

function sanitizeTag(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9_\-.]/g, "_");
  if (!/^[A-Za-z_]/.test(cleaned)) return `item_${cleaned}`;
  return cleaned || "item";
}

function parseAttributes(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([^\s=]+)\s*=\s*"([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw))) {
    attrs[match[1]!] = match[2]!;
  }
  return attrs;
}

type XmlNode = {
  name: string;
  attrs: Record<string, string>;
  children: Array<XmlNode | string>;
};

function tokenizeXml(xml: string): string[] {
  const tokens: string[] = [];
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\/?[^>]+>|[^<]+/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml))) {
    const token = match[0]!.trim();
    if (!token || token.startsWith("<!--")) continue;
    tokens.push(match[0]!);
  }
  return tokens;
}

function parseXmlToTree(xml: string): XmlNode {
  const cleaned = xml
    .replace(/<\?xml[\s\S]*?\?>/i, "")
    .replace(/<!DOCTYPE[\s\S]*?>/i, "")
    .trim();

  const tokens = tokenizeXml(cleaned);
  const root: XmlNode = { name: "root", attrs: {}, children: [] };
  const stack: XmlNode[] = [root];

  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("<![CDATA[")) {
      const text = trimmed.slice(9, -3);
      stack[stack.length - 1]!.children.push(text);
      continue;
    }

    if (trimmed.startsWith("</")) {
      stack.pop();
      continue;
    }

    if (trimmed.startsWith("<")) {
      const selfClosing = /\/>$/.test(trimmed);
      const inner = trimmed.replace(/^<\//, "").replace(/^</, "").replace(/\/>$/, "").replace(/>$/, "");
      const [namePart, ...rest] = inner.trim().split(/\s+/);
      const name = namePart!;
      const attrs = parseAttributes(rest.join(" "));
      const node: XmlNode = { name, attrs, children: [] };
      stack[stack.length - 1]!.children.push(node);
      if (!selfClosing) stack.push(node);
      continue;
    }

    stack[stack.length - 1]!.children.push(token);
  }

  const top = root.children.find((c) => typeof c !== "string") as XmlNode | undefined;
  if (!top) throw new Error("No root element found in XML");
  return top;
}

function nodeToJson(node: XmlNode): unknown {
  const textParts = node.children
    .filter((c): c is string => typeof c === "string")
    .map((t) => t.trim())
    .filter(Boolean);
  const childNodes = node.children.filter((c): c is XmlNode => typeof c !== "string");

  if (childNodes.length === 0) {
    const text = textParts.join(" ");
    if (Object.keys(node.attrs).length === 0) return text;
    return { ...node.attrs, ...(text ? { "#text": text } : {}) };
  }

  const obj: Record<string, unknown> = { ...node.attrs };
  for (const child of childNodes) {
    const value = nodeToJson(child);
    if (child.name in obj) {
      const existing = obj[child.name];
      obj[child.name] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else {
      obj[child.name] = value;
    }
  }
  if (textParts.length) obj["#text"] = textParts.join(" ");
  return obj;
}

export function convertJsonXml(input: string, mode: JsonXmlMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "json-to-xml" ? "Paste JSON to convert." : "Paste XML to convert.",
    };
  }

  try {
    if (mode === "json-to-xml") {
      const data = JSON.parse(trimmed) as unknown;
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(data, "root")}`;
      return { success: true, output: xml };
    }

    const tree = parseXmlToTree(trimmed);
    const json = { [tree.name]: nodeToJson(tree) };
    return { success: true, output: JSON.stringify(json, null, 2) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const JSON_XML_SAMPLE_JSON = `{
  "user": {
    "name": "DevKit",
    "roles": ["admin", "editor"],
    "active": true
  }
}`;

export const JSON_XML_SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user>
    <name>DevKit</name>
    <roles>admin</roles>
    <roles>editor</roles>
    <active>true</active>
  </user>
</root>`;

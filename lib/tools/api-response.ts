export type ApiPayloadKind = "json" | "xml" | "text";

export interface ApiTreeNode {
  id: string;
  key: string;
  type: string;
  preview?: string;
  children?: ApiTreeNode[];
}

export type ApiParseResult =
  | { success: true; kind: ApiPayloadKind; formatted: string; tree: ApiTreeNode[] }
  | { success: false; error: string };

function previewValue(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") {
    return value.length > 60 ? `${JSON.stringify(value.slice(0, 57))}…` : JSON.stringify(value);
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (typeof value === "object") return "Object";
  return String(value);
}

function typeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function jsonToTree(value: unknown, key: string, path: string): ApiTreeNode {
  const id = path;
  const type = typeOf(value);

  if (value !== null && typeof value === "object") {
    const entries = Array.isArray(value)
      ? value.map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, unknown>);

    return {
      id,
      key,
      type,
      preview: previewValue(value),
      children: entries.map(([k, v]) => jsonToTree(v, k, `${path}.${k}`)),
    };
  }

  return { id, key, type, preview: previewValue(value) };
}

function looksLikeXml(input: string): boolean {
  return /^\s*</.test(input);
}

/** Minimal XML → nested object for tree view (best-effort). */
function parseXmlToObject(xml: string): Record<string, unknown> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const err = doc.querySelector("parsererror");
  if (err) throw new Error(err.textContent?.trim() || "Invalid XML.");

  function walk(node: Element): unknown {
    const children = [...node.children];
    if (children.length === 0) {
      const text = node.textContent?.trim() ?? "";
      return text;
    }
    const obj: Record<string, unknown> = {};
    for (const child of children) {
      const name = child.tagName;
      const value = walk(child);
      if (name in obj) {
        const existing = obj[name];
        obj[name] = Array.isArray(existing) ? [...existing, value] : [existing, value];
      } else {
        obj[name] = value;
      }
    }
    return obj;
  }

  const root = doc.documentElement;
  return { [root.tagName]: walk(root) };
}

function formatXml(xml: string): string {
  const trimmed = xml.trim();
  let formatted = "";
  let indent = 0;
  const parts = trimmed.replace(/>\s*</g, ">\n<").split("\n");
  for (const part of parts) {
    if (/^<\/\w/.test(part)) indent = Math.max(0, indent - 1);
    formatted += `${"  ".repeat(indent)}${part}\n`;
    if (/^<\w[^>]*[^/]>$/.test(part)) indent++;
  }
  return formatted.trimEnd();
}

export function parseApiResponse(input: string): ApiParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: "Paste a JSON or XML API response." };
  }

  try {
    if (looksLikeXml(trimmed)) {
      if (typeof DOMParser === "undefined") {
        return { success: false, error: "XML parsing requires a browser environment." };
      }
      const obj = parseXmlToObject(trimmed);
      return {
        success: true,
        kind: "xml",
        formatted: formatXml(trimmed),
        tree: [jsonToTree(obj, "root", "root")],
      };
    }

    const data = JSON.parse(trimmed) as unknown;
    return {
      success: true,
      kind: "json",
      formatted: JSON.stringify(data, null, 2),
      tree: [jsonToTree(data, "root", "root")],
    };
  } catch {
    // Fall back to plain text view
    return {
      success: true,
      kind: "text",
      formatted: trimmed,
      tree: [
        {
          id: "root",
          key: "body",
          type: "string",
          preview: previewValue(trimmed),
        },
      ],
    };
  }
}

export function filterTree(nodes: ApiTreeNode[], query: string): ApiTreeNode[] {
  const q = query.trim().toLowerCase();
  if (!q) return nodes;

  function walk(node: ApiTreeNode): ApiTreeNode | null {
    const selfHit =
      node.key.toLowerCase().includes(q) ||
      (node.preview?.toLowerCase().includes(q) ?? false) ||
      node.type.toLowerCase().includes(q);

    const kids = (node.children ?? [])
      .map(walk)
      .filter((n): n is ApiTreeNode => n !== null);

    if (selfHit || kids.length > 0) {
      return { ...node, children: kids.length ? kids : node.children };
    }
    return null;
  }

  return nodes.map(walk).filter((n): n is ApiTreeNode => n !== null);
}

export const API_SAMPLE_JSON = `{
  "id": 1,
  "name": "ToolBay",
  "full_name": "toolbay/toolbay",
  "private": false,
  "owner": {
    "login": "toolbay",
    "id": 42
  },
  "topics": ["tools", "developer", "nextjs"]
}`;

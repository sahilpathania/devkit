import type { ConvertResult } from "@/lib/tools/convert-result";

export type CssScssMode = "css-to-scss" | "scss-to-css";

/** Best-effort CSS → nested SCSS by grouping shared selectors. */
function cssToScss(css: string): string {
  const ruleRe = /([^{}@]+)\{([^{}]*)\}/g;
  const rules: { selector: string; body: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = ruleRe.exec(css)) !== null) {
    const selector = match[1]!.trim();
    const body = match[2]!.trim();
    if (!selector || selector.startsWith("@")) continue;
    rules.push({ selector, body });
  }

  if (rules.length === 0) {
    return css.trim();
  }

  // Group by first simple segment when selectors share a root class/id/element
  type NestNode = { decls: string[]; children: Map<string, NestNode> };
  const root: NestNode = { decls: [], children: new Map() };

  function ensure(map: Map<string, NestNode>, key: string): NestNode {
    let node = map.get(key);
    if (!node) {
      node = { decls: [], children: new Map() };
      map.set(key, node);
    }
    return node;
  }

  for (const rule of rules) {
    const parts = rule.selector.split(/\s+/).filter(Boolean);
    if (parts.length === 0) continue;

    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!;
      // Child combinator approximation: treat "a > b" as separate tokens already split
      if (i === 0) {
        node = ensure(node.children, part);
      } else {
        node = ensure(node.children, `& ${part}`);
      }
    }
    if (rule.body) node.decls.push(rule.body);
  }

  function emit(node: NestNode, indent: number): string {
    const pad = "  ".repeat(indent);
    const lines: string[] = [];
    for (const decl of node.decls) {
      const cleaned = decl
        .split(";")
        .map((d) => d.trim())
        .filter(Boolean)
        .map((d) => `${pad}${d};`)
        .join("\n");
      if (cleaned) lines.push(cleaned);
    }
    for (const [sel, child] of node.children) {
      lines.push(`${pad}${sel} {`);
      lines.push(emit(child, indent + 1));
      lines.push(`${pad}}`);
    }
    return lines.join("\n");
  }

  const nested = emit(root, 0).trim();
  return nested || css.trim();
}

/** Flatten simple nested SCSS (no mixins/vars) back to CSS. */
function scssToCss(scss: string): string {
  const lines = scss.replace(/\r\n/g, "\n").split("\n");
  const stack: string[] = [];
  const output: string[] = [];
  let buffer = "";

  function currentSelector(): string {
    let sel = "";
    for (const seg of stack) {
      if (!sel) sel = seg;
      else if (seg.startsWith("&")) sel = `${sel}${seg.slice(1)}`;
      else sel = `${sel} ${seg}`;
    }
    return sel.trim();
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("//")) continue;

    if (line.endsWith("{")) {
      const sel = line.slice(0, -1).trim();
      if (buffer.trim() && stack.length) {
        output.push(`${currentSelector()} {\n  ${buffer.trim()}\n}\n`);
        buffer = "";
      }
      stack.push(sel);
      continue;
    }

    if (line === "}") {
      if (buffer.trim() && stack.length) {
        output.push(`${currentSelector()} {\n  ${buffer.trim()}\n}\n`);
        buffer = "";
      }
      stack.pop();
      continue;
    }

    buffer += (buffer ? " " : "") + line;
  }

  if (buffer.trim() && stack.length) {
    output.push(`${currentSelector()} {\n  ${buffer.trim()}\n}\n`);
  }

  return output.join("\n").trim() || scss.trim();
}

export function convertCssScss(input: string, mode: CssScssMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "css-to-scss" ? "Paste CSS to convert." : "Paste SCSS to convert.",
    };
  }

  try {
    const output = mode === "css-to-scss" ? cssToScss(trimmed) : scssToCss(trimmed);
    return { success: true, output };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const CSS_SCSS_SAMPLE_CSS = `.card {
  padding: 16px;
  color: teal;
}
.card .title {
  font-size: 18px;
}
.card .title span {
  font-weight: 600;
}`;

export const CSS_SCSS_SAMPLE_SCSS = `.card {
  padding: 16px;
  color: teal;
  & .title {
    font-size: 18px;
    & span {
      font-weight: 600;
    }
  }
}`;

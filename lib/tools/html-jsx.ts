import type { ConvertResult } from "@/lib/tools/convert-result";

export type HtmlJsxMode = "html-to-jsx" | "jsx-to-html";

const ATTR_MAP: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  colspan: "colSpan",
  rowspan: "rowSpan",
  usemap: "useMap",
  frameborder: "frameBorder",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  datetime: "dateTime",
  enctype: "encType",
  formaction: "formAction",
  formenctype: "formEncType",
  formmethod: "formMethod",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  hreflang: "hrefLang",
  inputmode: "inputMode",
  novalidate: "noValidate",
  radiogroup: "radioGroup",
  spellcheck: "spellCheck",
  srcdoc: "srcDoc",
  srcset: "srcSet",
  autoplay: "autoPlay",
  autofocus: "autoFocus",
  autocomplete: "autoComplete",
  allowfullscreen: "allowFullScreen",
};

const ATTR_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(ATTR_MAP).map(([html, jsx]) => [jsx, html])
);

function styleToObject(style: string): string {
  const entries = style
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((decl) => {
      const colon = decl.indexOf(":");
      if (colon < 0) return null;
      const prop = decl.slice(0, colon).trim();
      const value = decl.slice(colon + 1).trim();
      const camel = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      const quoted = /^-?\d+(\.\d+)?(px|em|rem|%|vh|vw|s|ms)?$/.test(value)
        ? /^[0-9.-]+$/.test(value)
          ? value
          : JSON.stringify(value)
        : JSON.stringify(value);
      return `${camel}: ${quoted}`;
    })
    .filter(Boolean);
  return `{${entries.join(", ")}}`;
}

function objectToStyle(objLiteral: string): string {
  const inner = objLiteral.replace(/^\{|\}$/g, "").trim();
  if (!inner) return "";
  return inner
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((pair) => {
      const colon = pair.indexOf(":");
      if (colon < 0) return "";
      const key = pair.slice(0, colon).trim();
      let value = pair.slice(colon + 1).trim();
      value = value.replace(/^['"]|['"]$/g, "");
      const kebab = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      return `${kebab}: ${value}`;
    })
    .filter(Boolean)
    .join("; ");
}

function htmlToJsx(html: string): string {
  let out = html;

  // Self-closing void tags that may be unclosed in HTML
  out = out.replace(
    /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(\s[^>]*)?>/gi,
    (_, tag: string, attrs = "") => `<${tag}${attrs} />`
  );

  // Comments
  out = out.replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");

  // Attributes
  out = out.replace(
    /([^\s=/>]+)=("([^"]*)"|'([^']*)'|\{[^}]*\})/g,
    (_match, rawName: string, rawValue: string) => {
      const name = rawName.toLowerCase();
      if (name.startsWith("on") && name.length > 2) {
        const event = `on${name.slice(2, 3).toUpperCase()}${name.slice(3)}`;
        return `${event}=${rawValue}`;
      }
      if (name === "style" && (rawValue.startsWith('"') || rawValue.startsWith("'"))) {
        const css = rawValue.slice(1, -1);
        return `style=${styleToObject(css)}`;
      }
      const mapped = ATTR_MAP[name] ?? rawName;
      return `${mapped}=${rawValue}`;
    }
  );

  // Boolean attributes without values (class-less)
  out = out.replace(
    /\s(checked|disabled|selected|required|readonly|multiple|autofocus|autoplay|muted|loop|controls|open|hidden|novalidate|defer|async)(?=[\s>\/])/gi,
    (m, attr: string) => {
      const mapped = ATTR_MAP[attr.toLowerCase()] ?? attr;
      return ` ${mapped}`;
    }
  );

  return out.trim();
}

function jsxToHtml(jsx: string): string {
  let out = jsx;

  out = out.replace(/\{\/\*([\s\S]*?)\*\/\}/g, "<!--$1-->");

  out = out.replace(
    /(className|htmlFor|tabIndex|readOnly|maxLength|minLength|cellPadding|cellSpacing|colSpan|rowSpan|useMap|frameBorder|contentEditable|crossOrigin|dateTime|encType|formAction|formEncType|formMethod|formNoValidate|formTarget|hrefLang|inputMode|noValidate|radioGroup|spellCheck|srcDoc|srcSet|autoPlay|autoFocus|autoComplete|allowFullScreen)=/g,
    (match, name: string) => `${ATTR_REVERSE[name] ?? name}=`
  );

  out = out.replace(/style=\{\{([^}]*)\}\}/g, (_, body: string) => {
    const css = objectToStyle(`{${body}}`);
    return `style="${css}"`;
  });

  // Remove self-closing slash for HTML5 void-ish output preference keep as is
  out = out.replace(/\s*\/>/g, " />");

  return out.trim();
}

export function convertHtmlJsx(input: string, mode: HtmlJsxMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "html-to-jsx" ? "Paste HTML to convert." : "Paste JSX to convert.",
    };
  }

  try {
    const output = mode === "html-to-jsx" ? htmlToJsx(trimmed) : jsxToHtml(trimmed);
    return { success: true, output };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const HTML_JSX_SAMPLE_HTML = `<div class="card" for="x" style="color: teal; font-size: 14px">
  <label for="email">Email</label>
  <input id="email" type="text" maxlength="40" checked>
  <img src="/logo.png" alt="Logo">
</div>`;

export const HTML_JSX_SAMPLE_JSX = `<div className="card" htmlFor="x" style={{color: "teal", fontSize: "14px"}}>
  <label htmlFor="email">Email</label>
  <input id="email" type="text" maxLength="40" checked />
  <img src="/logo.png" alt="Logo" />
</div>`;

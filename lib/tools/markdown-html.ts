import { marked } from "marked";
import type { ConvertResult } from "@/lib/tools/convert-result";

export type MarkdownHtmlMode = "md-to-html" | "html-to-md";

marked.setOptions({ gfm: true, breaks: false });

/** Lightweight HTML → Markdown for common tags (not a full browser DOM parser). */
function htmlToMarkdown(html: string): string {
  let out = html;

  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<style[\s\S]*?<\/style>/gi, "");

  out = out.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n");
  out = out.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n");
  out = out.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n");
  out = out.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n");
  out = out.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "##### $1\n\n");
  out = out.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "###### $1\n\n");

  out = out.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  out = out.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  out = out.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  out = out.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");
  out = out.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

  out = out.replace(
    /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    "[$2]($1)"
  );
  out = out.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*\/?>/gi, "![$1]($2)");
  out = out.replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, "![$2]($1)");

  out = out.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, body: string) => {
    return (
      body
        .replace(/<\/?p[^>]*>/gi, "")
        .split(/\n/)
        .map((line) => `> ${line.trim()}`)
        .join("\n") + "\n\n"
    );
  });

  out = out.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  out = out.replace(/<\/?ul[^>]*>/gi, "\n");
  out = out.replace(/<\/?ol[^>]*>/gi, "\n");
  out = out.replace(/<br\s*\/?>/gi, "\n");
  out = out.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");
  out = out.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n\n");
  out = out.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "```\n$1\n```\n\n");

  out = out.replace(/<\/?[^>]+>/g, "");
  out = out
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return out.replace(/\n{3,}/g, "\n\n").trim();
}

export function convertMarkdownHtml(
  input: string,
  mode: MarkdownHtmlMode
): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error:
        mode === "md-to-html" ? "Paste Markdown to convert." : "Paste HTML to convert.",
    };
  }

  try {
    if (mode === "md-to-html") {
      const html = marked.parse(trimmed, { async: false }) as string;
      return { success: true, output: html.trim() };
    }
    return { success: true, output: htmlToMarkdown(trimmed) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const MD_HTML_SAMPLE_MD = `# ToolBay

**Developer tools** that just work.

- JSON
- YAML
- Markdown

\`\`\`js
console.log("hello");
\`\`\`
`;

export const MD_HTML_SAMPLE_HTML = `<h1>ToolBay</h1>
<p><strong>Developer tools</strong> that just work.</p>
<ul>
  <li>JSON</li>
  <li>YAML</li>
  <li>Markdown</li>
</ul>
`;

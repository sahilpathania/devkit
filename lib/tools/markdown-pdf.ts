import { marked } from "marked";
import { htmlToPdfBlob } from "@/lib/tools/html-pdf";

export async function markdownToPdfBlob(
  markdown: string,
  filename = "document.pdf"
): Promise<{ blob: Blob; filename: string }> {
  const trimmed = markdown.trim();
  if (!trimmed) {
    throw new Error("Markdown is empty.");
  }
  const html = await marked.parse(trimmed, { async: true });
  const wrapped = `<article class="md">${html}</article>`;
  return htmlToPdfBlob(wrapped, filename);
}

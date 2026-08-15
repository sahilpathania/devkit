import mammoth from "mammoth";
import { htmlToPdfBlob } from "@/lib/tools/html-pdf";
import { replaceExtension } from "@/lib/tools/image-convert";

export const ACCEPT_WORD =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx";

const MAX_BYTES = 15 * 1024 * 1024;

/**
 * Convert DOCX → PDF entirely in the browser (mammoth HTML → canvas PDF).
 * Legacy .doc is not supported by mammoth.
 */
export async function wordToPdf(file: File): Promise<{ blob: Blob; filename: string }> {
  if (file.size > MAX_BYTES) {
    throw new Error("File must be 15 MB or smaller.");
  }

  const lower = file.name.toLowerCase();
  if (lower.endsWith(".doc") && !lower.endsWith(".docx")) {
    throw new Error(
      "Legacy .doc is not supported in the browser. Save as .docx in Word, then convert."
    );
  }
  if (!lower.endsWith(".docx")) {
    throw new Error("Upload a .docx file.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
  if (!html.trim()) {
    throw new Error("Could not read content from this DOCX.");
  }

  const filename = replaceExtension(file.name, "pdf");
  return htmlToPdfBlob(`<article class="docx">${html}</article>`, filename);
}

import { PDFDocument } from "pdf-lib";
import { zipSync } from "fflate";

export const ACCEPT_PDF = "application/pdf,.pdf";

function assertPdf(file: File) {
  if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please upload PDF files only.");
  }
}

/** Merge multiple PDFs into one (order preserved). */
export async function mergePdfs(
  files: File[],
  filename = "merged.pdf"
): Promise<{ blob: Blob; filename: string; pageCount: number }> {
  if (files.length < 2) {
    throw new Error("Add at least two PDF files to merge.");
  }

  const out = await PDFDocument.create();
  let pageCount = 0;

  for (const file of files) {
    assertPdf(file);
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await out.copyPages(doc, doc.getPageIndices());
    for (const page of pages) {
      out.addPage(page);
      pageCount += 1;
    }
  }

  const saved = await out.save();
  return {
    blob: new Blob([new Uint8Array(saved)], { type: "application/pdf" }),
    filename,
    pageCount,
  };
}

export type SplitMode = "each-page" | "range";

/**
 * Split a PDF into individual pages (ZIP) or extract a 1-based inclusive range.
 */
export async function splitPdf(
  file: File,
  options: {
    mode: SplitMode;
    /** 1-based inclusive when mode is range */
    fromPage?: number;
    toPage?: number;
  }
): Promise<{ blob: Blob; filename: string; message: string }> {
  assertPdf(file);
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = src.getPageCount();
  if (total < 1) throw new Error("This PDF has no pages.");

  const base = file.name.replace(/\.pdf$/i, "") || "document";

  if (options.mode === "each-page") {
    if (total === 1) {
      const single = await PDFDocument.create();
      const [page] = await single.copyPages(src, [0]);
      single.addPage(page);
      const saved = await single.save();
      return {
        blob: new Blob([new Uint8Array(saved)], { type: "application/pdf" }),
        filename: `${base}-page-1.pdf`,
        message: "1 page extracted",
      };
    }

    const entries: Record<string, Uint8Array> = {};
    for (let i = 0; i < total; i++) {
      const doc = await PDFDocument.create();
      const [page] = await doc.copyPages(src, [i]);
      doc.addPage(page);
      const saved = await doc.save();
      entries[`page-${String(i + 1).padStart(3, "0")}.pdf`] = new Uint8Array(saved);
    }
    const zipped = zipSync(entries, { level: 6 });
    return {
      blob: new Blob([new Uint8Array(zipped)], { type: "application/zip" }),
      filename: `${base}-pages.zip`,
      message: `Split into ${total} pages (ZIP)`,
    };
  }

  const from = Math.max(1, Math.floor(options.fromPage ?? 1));
  const to = Math.min(total, Math.floor(options.toPage ?? total));
  if (from > to) throw new Error("From page must be ≤ to page.");
  if (from > total) throw new Error(`PDF only has ${total} pages.`);

  const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
  const doc = await PDFDocument.create();
  const pages = await doc.copyPages(src, indices);
  for (const page of pages) doc.addPage(page);
  const saved = await doc.save();

  return {
    blob: new Blob([new Uint8Array(saved)], { type: "application/pdf" }),
    filename: `${base}-p${from}-${to}.pdf`,
    message: `Extracted pages ${from}–${to} of ${total}`,
  };
}

export async function getPdfPageCount(file: File): Promise<number> {
  assertPdf(file);
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return src.getPageCount();
}

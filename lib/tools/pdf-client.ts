import { zipSync } from "fflate";

export const ACCEPT_PDF = "application/pdf,.pdf";

async function loadPdfJs() {
  if (typeof window === "undefined") {
    throw new Error("PDF tools only run in the browser.");
  }
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  return pdfjs;
}

async function loadPdf(file: File) {
  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  return pdfjs.getDocument({ data }).promise;
}

/** Extract plain text from every page of a PDF. */
export async function pdfToText(file: File): Promise<string> {
  if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please upload a PDF file.");
  }
  const pdf = await loadPdf(file);
  const parts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const line = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    parts.push(line.trim());
  }
  const text = parts.filter(Boolean).join("\n\n").trim();
  if (!text) {
    throw new Error("No extractable text found (maybe a scanned PDF).");
  }
  return text;
}

export interface PdfPageImage {
  blob: Blob;
  filename: string;
  page: number;
}

/** Render PDF pages to PNG. Multi-page → ZIP of PNGs. */
export async function pdfToImages(
  file: File,
  options?: { scale?: number; maxPages?: number }
): Promise<{ blob: Blob; filename: string; pageCount: number }> {
  if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please upload a PDF file.");
  }

  const scale = options?.scale ?? 2;
  const maxPages = options?.maxPages ?? 50;
  const pdf = await loadPdf(file);
  const pageCount = Math.min(pdf.numPages, maxPages);
  if (pdf.numPages > maxPages) {
    throw new Error(
      `PDF has ${pdf.numPages} pages; max is ${maxPages} for browser conversion.`
    );
  }

  const pages: PdfPageImage[] = [];
  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable.");
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encode failed."))),
        "image/png"
      );
    });
    pages.push({
      blob,
      filename: `page-${String(i).padStart(3, "0")}.png`,
      page: i,
    });
  }

  const base = file.name.replace(/\.pdf$/i, "") || "document";

  if (pages.length === 1) {
    return {
      blob: pages[0].blob,
      filename: `${base}-page-1.png`,
      pageCount: 1,
    };
  }

  const entries: Record<string, Uint8Array> = {};
  for (const p of pages) {
    entries[p.filename] = new Uint8Array(await p.blob.arrayBuffer());
  }
  const zipped = zipSync(entries, { level: 6 });
  return {
    blob: new Blob([new Uint8Array(zipped)], { type: "application/zip" }),
    filename: `${base}-pages.zip`,
    pageCount: pages.length,
  };
}

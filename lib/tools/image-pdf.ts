import { PDFDocument } from "pdf-lib";
import { replaceExtension } from "@/lib/tools/image-convert";

const ACCEPT =
  "image/png,image/jpeg,image/jpg,image/webp,.png,.jpg,.jpeg,.webp";

export const ACCEPT_IMAGE_PDF = ACCEPT;

async function embedImage(
  pdf: PDFDocument,
  bytes: ArrayBuffer,
  type: string
) {
  if (type === "image/png" || type.endsWith(".png")) {
    return pdf.embedPng(bytes);
  }
  if (
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type.endsWith(".jpg") ||
    type.endsWith(".jpeg")
  ) {
    return pdf.embedJpg(bytes);
  }
  // WebP / others: rasterize via canvas first
  const blob = new Blob([bytes], { type: type || "image/png" });
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode image."));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable.");
    ctx.drawImage(img, 0, 0);
    const png = await new Promise<ArrayBuffer>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (!b) {
            reject(new Error("Failed to encode PNG."));
            return;
          }
          void b.arrayBuffer().then(resolve, reject);
        },
        "image/png"
      );
    });
    return pdf.embedPng(png);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** One or more images → single PDF (one page per image). */
export async function imagesToPdf(
  files: File[],
  filename?: string
): Promise<{ blob: Blob; filename: string }> {
  if (!files.length) throw new Error("Choose at least one image.");

  const pdf = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const image = await embedImage(pdf, bytes, file.type || file.name);
    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const out = await pdf.save();
  const name =
    filename ??
    (files.length === 1
      ? replaceExtension(files[0].name, "pdf")
      : "images.pdf");
  const bytes = new Uint8Array(out);
  return {
    blob: new Blob([bytes], { type: "application/pdf" }),
    filename: name,
  };
}

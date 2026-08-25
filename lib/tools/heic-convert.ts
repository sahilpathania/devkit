import {
  canvasToBlob,
  loadImageElement,
  rasterizeToCanvas,
  replaceExtension,
  type ConvertedImage,
} from "@/lib/tools/image-convert";

export const ACCEPT_HEIC =
  "image/heic,image/heif,image/heic-sequence,.heic,.heif,.HEIC,.HEIF";

const HEIC_EXT = /\.(heic|heif)$/i;

export function isHeicFile(file: File): boolean {
  const type = file.type.toLowerCase();
  return (
    type.includes("heic") ||
    type.includes("heif") ||
    HEIC_EXT.test(file.name)
  );
}

async function jpegFromDecodedImage(
  file: File,
  quality: number
): Promise<ConvertedImage> {
  const img = await loadImageElement(file);
  const canvas = await rasterizeToCanvas(img, { background: "#ffffff" });
  const blob = await canvasToBlob(canvas, "jpeg", quality);
  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    mime: "image/jpeg",
    filename: replaceExtension(file.name, "jpg"),
    objectUrl: URL.createObjectURL(blob),
  };
}

async function jpegFromHeicWasm(
  file: File,
  quality: number
): Promise<ConvertedImage> {
  const { heicTo } = await import("heic-to/csp");
  const blob = await heicTo({
    blob: file,
    type: "image/jpeg",
    quality,
  });
  if (!(blob instanceof Blob)) {
    throw new Error("Could not convert this HEIC file.");
  }

  const img = await loadImageElement(blob);
  return {
    blob,
    width: img.naturalWidth,
    height: img.naturalHeight,
    mime: "image/jpeg",
    filename: replaceExtension(file.name, "jpg"),
    objectUrl: URL.createObjectURL(blob),
  };
}

/** Convert HEIC/HEIF to JPEG in the browser. */
export async function convertHeicToJpeg(
  file: File,
  quality = 0.92
): Promise<ConvertedImage> {
  if (!isHeicFile(file)) {
    throw new Error("Upload a .heic or .heif photo.");
  }

  const q = Math.min(1, Math.max(0.1, quality));

  try {
    return await jpegFromDecodedImage(file, q);
  } catch {
    try {
      return await jpegFromHeicWasm(file, q);
    } catch {
      throw new Error(
        "Could not decode this HEIC file. Try another photo, or export JPG from your phone first."
      );
    }
  }
}

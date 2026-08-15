import {
  canvasToBlob,
  loadImageElement,
  rasterizeToCanvas,
  replaceExtension,
  type ConvertedImage,
} from "@/lib/tools/image-convert";

/** Parse a Windows ICO and return the largest PNG/BMP-backed entry as a PNG blob. */
export async function icoToPng(file: File): Promise<ConvertedImage> {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);

  if (view.byteLength < 6 || view.getUint16(0, true) !== 0 || view.getUint16(2, true) !== 1) {
    throw new Error("Not a valid ICO file.");
  }

  const count = view.getUint16(4, true);
  if (count < 1) throw new Error("ICO file has no images.");

  let bestOffset = 0;
  let bestSize = 0;
  let bestW = 0;
  let bestH = 0;

  for (let i = 0; i < count; i++) {
    const entry = 6 + i * 16;
    if (entry + 16 > view.byteLength) break;
    const w = view.getUint8(entry) || 256;
    const h = view.getUint8(entry + 1) || 256;
    const size = view.getUint32(entry + 8, true);
    const offset = view.getUint32(entry + 12, true);
    const area = w * h;
    if (area >= bestW * bestH && size > 0 && offset + size <= view.byteLength) {
      bestW = w;
      bestH = h;
      bestSize = size;
      bestOffset = offset;
    }
  }

  if (!bestSize) throw new Error("Could not find an image entry in this ICO.");

  const slice = buffer.slice(bestOffset, bestOffset + bestSize);
  const bytes = new Uint8Array(slice);
  const isPng =
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47;

  let pngBlob: Blob;
  if (isPng) {
    pngBlob = new Blob([slice], { type: "image/png" });
  } else {
    // BMP-in-ICO: convert via canvas after synthesizing a BMP header if needed
    const bmpBlob = decodeIcoBmp(slice);
    const img = await loadImageElement(bmpBlob);
    const canvas = await rasterizeToCanvas(img);
    pngBlob = await canvasToBlob(canvas, "png");
    bestW = canvas.width;
    bestH = canvas.height;
  }

  // Normalize through canvas for dimensions
  const img = await loadImageElement(pngBlob);
  const canvas = await rasterizeToCanvas(img);
  const blob = await canvasToBlob(canvas, "png");

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    mime: "image/png",
    filename: replaceExtension(file.name, "png"),
    objectUrl: URL.createObjectURL(blob),
  };
}

function decodeIcoBmp(dib: ArrayBuffer): Blob {
  const view = new DataView(dib);
  // ICO stores a BITMAPINFOHEADER (40 bytes) then XOR bitmap (+ optional AND mask)
  const headerSize = view.getUint32(0, true);
  if (headerSize !== 40) {
    // Fall back: treat as raw BMP file
    return new Blob([dib], { type: "image/bmp" });
  }

  const width = view.getInt32(4, true);
  const height = Math.abs(view.getInt32(8, true)) / 2; // ICO stores height*2 (XOR+AND)
  const bitCount = view.getUint16(14, true);
  const compression = view.getUint32(16, true);
  if (compression !== 0) {
    throw new Error("Compressed BMP icons are not supported.");
  }

  const rowSize = Math.floor((bitCount * width + 31) / 32) * 4;
  const xorSize = rowSize * height;
  const pixelOffset = 14 + 40;
  const fileSize = pixelOffset + xorSize;

  const bmp = new ArrayBuffer(fileSize);
  const out = new DataView(bmp);
  // BITMAPFILEHEADER
  out.setUint8(0, 0x42); // B
  out.setUint8(1, 0x4d); // M
  out.setUint32(2, fileSize, true);
  out.setUint32(10, pixelOffset, true);
  // BITMAPINFOHEADER with corrected height
  new Uint8Array(bmp, 14, 40).set(new Uint8Array(dib, 0, 40));
  out.setInt32(22, height, true); // positive height

  new Uint8Array(bmp, pixelOffset, xorSize).set(
    new Uint8Array(dib, headerSize, xorSize)
  );

  return new Blob([bmp], { type: "image/bmp" });
}

/** Encode a PNG/raster file as a single-size ICO (PNG-compressed entry). */
export async function pngToIco(
  file: File,
  size = 256
): Promise<ConvertedImage> {
  const img = await loadImageElement(file);
  const canvas = await rasterizeToCanvas(img, { width: size, height: size });
  const pngBlob = await canvasToBlob(canvas, "png");
  const pngBuffer = await pngBlob.arrayBuffer();
  const pngBytes = new Uint8Array(pngBuffer);

  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize;
  const ico = new ArrayBuffer(dataOffset + pngBytes.byteLength);
  const view = new DataView(ico);

  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type = icon
  view.setUint16(4, 1, true); // count

  const stored = size >= 256 ? 0 : size;
  view.setUint8(6, stored); // width
  view.setUint8(7, stored); // height
  view.setUint8(8, 0); // color count
  view.setUint8(9, 0); // reserved
  view.setUint16(10, 1, true); // planes
  view.setUint16(12, 32, true); // bit count
  view.setUint32(14, pngBytes.byteLength, true);
  view.setUint32(18, dataOffset, true);

  new Uint8Array(ico, dataOffset).set(pngBytes);

  const blob = new Blob([ico], { type: "image/x-icon" });
  return {
    blob,
    width: size,
    height: size,
    mime: "image/x-icon",
    filename: replaceExtension(file.name, "ico"),
    objectUrl: URL.createObjectURL(blob),
  };
}

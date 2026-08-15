export type OutputImageFormat = "png" | "jpeg" | "webp";

export const OUTPUT_MIME: Record<OutputImageFormat, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

export const OUTPUT_EXTENSION: Record<OutputImageFormat, string> = {
  png: "png",
  jpeg: "jpg",
  webp: "webp",
};

export const ACCEPT_RASTER =
  "image/png,image/jpeg,image/jpg,image/webp,image/gif,image/bmp,image/x-ms-bmp,image/avif,.png,.jpg,.jpeg,.webp,.gif,.bmp,.avif";

export const ACCEPT_SVG = "image/svg+xml,.svg";

export interface ConvertedImage {
  blob: Blob;
  width: number;
  height: number;
  mime: string;
  filename: string;
  objectUrl: string;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function replaceExtension(name: string, ext: string): string {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  return `${base}.${ext}`;
}

/** Load a browser-decodable image (raster or SVG blob) into an HTMLImageElement. */
export function loadImageElement(source: Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    const url = typeof source === "string" ? source : URL.createObjectURL(source);
    const revoke = typeof source === "string" ? false : true;

    img.onload = () => {
      if (revoke) URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      if (revoke) URL.revokeObjectURL(url);
      reject(new Error("Could not decode this image. Try PNG, JPG, WebP, GIF, BMP, or SVG."));
    };
    img.src = url;
  });
}

export async function rasterizeToCanvas(
  img: HTMLImageElement,
  options?: {
    width?: number;
    height?: number;
    /** Background fill for formats without alpha (jpeg). Default transparent. */
    background?: string;
  }
): Promise<HTMLCanvasElement> {
  const width = Math.max(1, Math.round(options?.width ?? img.naturalWidth));
  const height = Math.max(1, Math.round(options?.height ?? img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");

  if (options?.background) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: OutputImageFormat,
  quality = 0.92
): Promise<Blob> {
  const mime = OUTPUT_MIME[format];
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(
              format === "webp"
                ? "WebP export is not supported in this browser."
                : `Could not encode as ${format.toUpperCase()}.`
            )
          );
          return;
        }
        resolve(blob);
      },
      mime,
      format === "png" ? undefined : quality
    );
  });
}

export async function convertRasterFile(
  file: File,
  format: OutputImageFormat,
  options?: {
    quality?: number;
    width?: number;
    height?: number;
    background?: string;
  }
): Promise<ConvertedImage> {
  const img = await loadImageElement(file);
  const needsBg = format === "jpeg";
  const canvas = await rasterizeToCanvas(img, {
    width: options?.width,
    height: options?.height,
    background: needsBg ? (options?.background ?? "#ffffff") : options?.background,
  });
  const blob = await canvasToBlob(canvas, format, options?.quality ?? 0.92);
  const filename = replaceExtension(file.name, OUTPUT_EXTENSION[format]);
  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    mime: blob.type || OUTPUT_MIME[format],
    filename,
    objectUrl: URL.createObjectURL(blob),
  };
}

export async function convertSvgText(
  svgText: string,
  format: OutputImageFormat,
  options?: {
    quality?: number;
    width?: number;
    height?: number;
    background?: string;
    filename?: string;
  }
): Promise<ConvertedImage> {
  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const img = await loadImageElement(blob);

  let width = options?.width;
  let height = options?.height;
  if (!width || !height) {
    width = width ?? (img.naturalWidth || 512);
    height = height ?? (img.naturalHeight || 512);
  }

  const needsBg = format === "jpeg";
  const canvas = await rasterizeToCanvas(img, {
    width,
    height,
    background: needsBg ? (options?.background ?? "#ffffff") : options?.background,
  });
  const out = await canvasToBlob(canvas, format, options?.quality ?? 0.92);
  const filename = replaceExtension(options?.filename ?? "image.svg", OUTPUT_EXTENSION[format]);
  return {
    blob: out,
    width: canvas.width,
    height: canvas.height,
    mime: out.type || OUTPUT_MIME[format],
    filename,
    objectUrl: URL.createObjectURL(out),
  };
}

/** Wrap a raster image as an SVG with an embedded data URI (not true vectorization). */
export async function pngToEmbeddedSvg(file: File): Promise<ConvertedImage> {
  const img = await loadImageElement(file);
  const canvas = await rasterizeToCanvas(img);
  const pngBlob = await canvasToBlob(canvas, "png");
  const dataUrl = await blobToDataUrl(pngBlob);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image href="${dataUrl}" width="${canvas.width}" height="${canvas.height}" />
</svg>
`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    mime: "image/svg+xml",
    filename: replaceExtension(file.name, "svg"),
    objectUrl: URL.createObjectURL(blob),
  };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read image data."));
    reader.readAsDataURL(blob);
  });
}

import {
  ACCEPT_RASTER,
  OUTPUT_EXTENSION,
  canvasToBlob,
  convertRasterFile,
  formatBytes,
  loadImageElement,
  rasterizeToCanvas,
  replaceExtension,
  type ConvertedImage,
  type OutputImageFormat,
} from "@/lib/tools/image-convert";

export { ACCEPT_RASTER, formatBytes };

export type ResizeMode = "max-width" | "max-height" | "exact" | "percent";

export interface CompressResizeOptions {
  format: OutputImageFormat;
  quality: number;
  mode: ResizeMode;
  /** Used for max-width / exact width / percent base */
  width?: number;
  /** Used for max-height / exact height */
  height?: number;
  /** 1–100 when mode is percent */
  percent?: number;
}

function fitContain(
  srcW: number,
  srcH: number,
  maxW?: number,
  maxH?: number
): { width: number; height: number } {
  let width = srcW;
  let height = srcH;
  if (maxW && width > maxW) {
    height = Math.round((height * maxW) / width);
    width = maxW;
  }
  if (maxH && height > maxH) {
    width = Math.round((width * maxH) / height);
    height = maxH;
  }
  return { width: Math.max(1, width), height: Math.max(1, height) };
}

export async function compressAndResizeImage(
  file: File,
  options: CompressResizeOptions
): Promise<ConvertedImage & { originalSize: number; savedPercent: number }> {
  const img = await loadImageElement(file);
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  let width = srcW;
  let height = srcH;

  switch (options.mode) {
    case "max-width": {
      const maxW = options.width;
      if (maxW && maxW > 0) {
        ({ width, height } = fitContain(srcW, srcH, maxW, undefined));
      }
      break;
    }
    case "max-height": {
      const maxH = options.height;
      if (maxH && maxH > 0) {
        ({ width, height } = fitContain(srcW, srcH, undefined, maxH));
      }
      break;
    }
    case "exact": {
      if (options.width && options.width > 0) width = Math.round(options.width);
      if (options.height && options.height > 0) height = Math.round(options.height);
      else if (options.width && options.width > 0) {
        height = Math.round((srcH * width) / srcW);
      }
      break;
    }
    case "percent": {
      const p = Math.min(100, Math.max(1, options.percent ?? 100)) / 100;
      width = Math.max(1, Math.round(srcW * p));
      height = Math.max(1, Math.round(srcH * p));
      break;
    }
  }

  const format = options.format;
  const needsBg = format === "jpeg";
  const canvas = await rasterizeToCanvas(img, {
    width,
    height,
    background: needsBg ? "#ffffff" : undefined,
  });
  const blob = await canvasToBlob(canvas, format, options.quality);
  const originalSize = file.size;
  const savedPercent =
    originalSize > 0
      ? Math.round(((originalSize - blob.size) / originalSize) * 100)
      : 0;

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    mime: blob.type,
    filename: replaceExtension(
      file.name.replace(/(\.[^.]+)?$/, "") + "-optimized",
      OUTPUT_EXTENSION[format]
    ),
    objectUrl: URL.createObjectURL(blob),
    originalSize,
    savedPercent,
  };
}

/** Re-export for callers that only need convert without custom naming. */
export { convertRasterFile };

"use client";

import { useCallback } from "react";
import { FileConverterShell } from "@/components/tools/shared/file-converter";
import { ACCEPT_IMAGE_PDF, imagesToPdf } from "@/lib/tools/image-pdf";
import { formatBytes } from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";

export function ImageToPdf(_props: ToolComponentProps) {
  const convert = useCallback(async (files: File[]) => {
    const result = await imagesToPdf(files);
    return {
      ...result,
      message: `Ready · ${files.length} page${files.length === 1 ? "" : "s"} · ${formatBytes(result.blob.size)} · ${result.filename}`,
    };
  }, []);

  return (
    <FileConverterShell
      accept={ACCEPT_IMAGE_PDF}
      multiple
      dropLabel="Drop images or click to upload"
      hint="PNG, JPG, or WebP · one page per image · runs in your browser"
      convertLabel="Create PDF"
      convert={convert}
    />
  );
}

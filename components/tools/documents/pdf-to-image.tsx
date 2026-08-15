"use client";

import { useCallback } from "react";
import { FileConverterShell } from "@/components/tools/shared/file-converter";
import { ACCEPT_PDF, pdfToImages } from "@/lib/tools/pdf-client";
import { formatBytes } from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";

export function PdfToImage(_props: ToolComponentProps) {
  const convert = useCallback(async (files: File[]) => {
    const result = await pdfToImages(files[0], { scale: 2, maxPages: 50 });
    return {
      ...result,
      message: `Ready · ${result.pageCount} page${result.pageCount === 1 ? "" : "s"} · ${formatBytes(result.blob.size)} · ${result.filename}`,
    };
  }, []);

  return (
    <FileConverterShell
      accept={ACCEPT_PDF}
      dropLabel="Drop a PDF or click to upload"
      hint="Renders pages to PNG (multi-page → ZIP) · max 50 pages · runs in your browser"
      convertLabel="Convert to images"
      convert={convert}
    />
  );
}

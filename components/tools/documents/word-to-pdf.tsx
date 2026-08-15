"use client";

import { useCallback } from "react";
import { FileConverterShell } from "@/components/tools/shared/file-converter";
import { formatBytes } from "@/lib/tools/image-convert";
import { ACCEPT_WORD, wordToPdf } from "@/lib/tools/word-pdf";
import type { ToolComponentProps } from "@/types";

export function WordToPdf(_props: ToolComponentProps) {
  const convert = useCallback(async (files: File[]) => {
    const result = await wordToPdf(files[0]);
    return {
      ...result,
      message: `Ready · ${formatBytes(result.blob.size)} · ${result.filename}`,
    };
  }, []);

  return (
    <FileConverterShell
      accept={ACCEPT_WORD}
      dropLabel="Drop a DOCX or click to upload"
      hint=".docx only · runs in your browser (layout is approximate, not print-engine perfect)"
      convertLabel="Convert to PDF"
      convert={convert}
    />
  );
}

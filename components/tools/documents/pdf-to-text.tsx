"use client";

import { useCallback, useState } from "react";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileConverterShell } from "@/components/tools/shared/file-converter";
import { ACCEPT_PDF, pdfToText } from "@/lib/tools/pdf-client";
import { downloadBlob } from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";

export function PdfToText(_props: ToolComponentProps) {
  const [text, setText] = useState("");

  const convert = useCallback(async (files: File[]) => {
    const extracted = await pdfToText(files[0]);
    setText(extracted);
    const blob = new Blob([extracted], { type: "text/plain;charset=utf-8" });
    const filename = files[0].name.replace(/\.pdf$/i, "") + ".txt";
    return {
      blob,
      filename,
      message: `Extracted ${extracted.length.toLocaleString()} characters`,
    };
  }, []);

  return (
    <div className="space-y-4">
      <FileConverterShell
        accept={ACCEPT_PDF}
        dropLabel="Drop a PDF or click to upload"
        hint="Extracts selectable text · scanned PDFs may have no text · runs in your browser"
        convertLabel="Extract text"
        convert={convert}
      />

      {text && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="pdf-text-out">Extracted text</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={async () => {
                  await navigator.clipboard.writeText(text);
                  toast.success("Copied");
                }}
              >
                <Copy className="size-3.5" />
                Copy
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() =>
                  downloadBlob(
                    new Blob([text], { type: "text/plain;charset=utf-8" }),
                    "extracted.txt"
                  )
                }
              >
                <Download className="size-3.5" />
                .txt
              </Button>
            </div>
          </div>
          <textarea
            id="pdf-text-out"
            readOnly
            value={text}
            rows={14}
            className="w-full resize-y rounded-xl border border-border/60 bg-muted/20 px-3 py-2 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileConverterShell } from "@/components/tools/shared/file-converter";
import {
  ACCEPT_PDF,
  getPdfPageCount,
  splitPdf,
  type SplitMode,
} from "@/lib/tools/pdf-ops";
import { formatBytes } from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

export function SplitPdf(_props: ToolComponentProps) {
  const [mode, setMode] = useState<SplitMode>("each-page");
  const [fromPage, setFromPage] = useState("1");
  const [toPage, setToPage] = useState("1");
  const [pageCount, setPageCount] = useState<number | null>(null);

  const convert = useCallback(
    async (files: File[]) => {
      const file = files[0]!;
      const total = await getPdfPageCount(file);
      setPageCount(total);
      const result = await splitPdf(file, {
        mode,
        fromPage: Number(fromPage),
        toPage: Number(toPage),
      });
      return {
        blob: result.blob,
        filename: result.filename,
        message: `${result.message} · ${formatBytes(result.blob.size)}`,
      };
    },
    [fromPage, mode, toPage]
  );

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg border border-border/60 p-0.5 w-fit" role="group">
        {(
          [
            { value: "each-page" as const, label: "Every page" },
            { value: "range" as const, label: "Page range" },
          ] as const
        ).map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setMode(option.value)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs transition-colors",
              mode === option.value
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={mode === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      {mode === "range" && (
        <div className="grid max-w-md gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="from">From page</Label>
            <Input
              id="from"
              inputMode="numeric"
              value={fromPage}
              onChange={(e) => setFromPage(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To page</Label>
            <Input
              id="to"
              inputMode="numeric"
              value={toPage}
              onChange={(e) => setToPage(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      )}

      {pageCount !== null && (
        <p className="text-xs text-muted-foreground">Detected {pageCount} pages</p>
      )}

      <FileConverterShell
        key={mode}
        accept={ACCEPT_PDF}
        dropLabel="Drop a PDF or click to upload"
        hint={
          mode === "each-page"
            ? "Splits each page into its own PDF (ZIP if multi-page) · runs locally"
            : "Extract an inclusive page range · runs locally"
        }
        convertLabel="Split PDF"
        convert={convert}
      />
    </div>
  );
}

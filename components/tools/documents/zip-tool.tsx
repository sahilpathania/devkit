"use client";

import { useCallback, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileConverterShell } from "@/components/tools/shared/file-converter";
import {
  ACCEPT_ZIP,
  createZip,
  extractZip,
  packExtracted,
  type ExtractedZipFile,
} from "@/lib/tools/zip";
import { downloadBlob, formatBytes } from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

type Mode = "create" | "extract";

export function ZipTool(_props: ToolComponentProps) {
  const [mode, setMode] = useState<Mode>("create");
  const [extracted, setExtracted] = useState<ExtractedZipFile[]>([]);

  const convert = useCallback(
    async (files: File[]) => {
      if (mode === "create") {
        setExtracted([]);
        const result = await createZip(files);
        return {
          ...result,
          message: `Archived ${result.entries.length} file${result.entries.length === 1 ? "" : "s"} · ${formatBytes(result.blob.size)}`,
        };
      }
      const list = await extractZip(files[0]);
      setExtracted(list);
      const packed = await packExtracted(
        list,
        files[0].name.replace(/\.zip$/i, "") + "-extracted.zip"
      );
      return {
        ...packed,
        message: `Extracted ${list.length} file${list.length === 1 ? "" : "s"} · download ZIP or individual files below`,
      };
    },
    [mode]
  );

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg border border-border/60 p-0.5 w-fit" role="group">
        {(
          [
            { value: "create", label: "Create ZIP" },
            { value: "extract", label: "Extract ZIP" },
          ] as const
        ).map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setMode(option.value);
              setExtracted([]);
            }}
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

      <FileConverterShell
        key={mode}
        accept={mode === "create" ? "*/*" : ACCEPT_ZIP}
        multiple={mode === "create"}
        dropLabel={
          mode === "create"
            ? "Drop files or click to upload"
            : "Drop a ZIP or click to upload"
        }
        hint={
          mode === "create"
            ? "Pack multiple files into a ZIP · runs in your browser"
            : "Unpack a ZIP · runs in your browser"
        }
        convertLabel={mode === "create" ? "Create ZIP" : "Extract"}
        convert={convert}
      />

      {mode === "extract" && extracted.length > 0 && (
        <ul className="space-y-2 rounded-xl border border-border/60 p-3">
          {extracted.map((f) => (
            <li
              key={f.name}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <span className="truncate font-mono text-xs">{f.name}</span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="shrink-0 gap-1.5"
                onClick={() => {
                  const base = f.name.split("/").pop() || f.name;
                  downloadBlob(f.blob, base);
                }}
              >
                <Download className="size-3.5" />
                {formatBytes(f.blob.size)}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

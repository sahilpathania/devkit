"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  Eraser,
  Files,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ACCEPT_PDF, mergePdfs } from "@/lib/tools/pdf-ops";
import { downloadBlob, formatBytes } from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

export function MergePdf(_props: ToolComponentProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ blob: Blob; filename: string; message: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const clear = useCallback(() => {
    setFiles([]);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const addFiles = useCallback((list: FileList | File[] | null) => {
    if (!list) return;
    const next = Array.from(list).filter(
      (f) => f.type.includes("pdf") || f.name.toLowerCase().endsWith(".pdf")
    );
    if (!next.length) {
      toast.error("Please add PDF files.");
      return;
    }
    setFiles((prev) => [...prev, ...next]);
    setResult(null);
    setError(null);
    toast.success(next.length === 1 ? "File ready" : "Files ready", {
      description: `${next.length} PDF${next.length === 1 ? "" : "s"} added`,
    });
  }, []);

  const merge = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const out = await mergePdfs(files);
      const message = `Merged ${files.length} files · ${out.pageCount} pages · ${formatBytes(out.blob.size)}`;
      setResult({ blob: out.blob, filename: out.filename, message });
      toast.success("Merge successful", { description: message });
    } catch (err) {
      setResult(null);
      const message = err instanceof Error ? err.message : "Merge failed.";
      setError(message);
      toast.error("Merge failed", { description: message });
    } finally {
      setBusy(false);
    }
  }, [files]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          onClick={() => void merge()}
          disabled={busy || files.length < 2}
          className="gap-1.5"
        >
          <Files className="size-4" />
          {busy ? "Merging…" : "Merge PDFs"}
        </Button>
        <Button type="button" variant="ghost" onClick={clear} className="gap-1.5 text-muted-foreground">
          <Eraser className="size-4" />
          Clear
        </Button>
        {result && (
          <Button
            type="button"
            variant="outline"
            className="gap-1.5"
            onClick={() => downloadBlob(result.blob, result.filename)}
          >
            <Download className="size-4" />
            Download
          </Button>
        )}
      </div>

      {(error || result) && (
        <div
          role="status"
          className={cn(
            "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm",
            error
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
          )}
        >
          {error ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          )}
          <span>{error ?? result?.message}</span>
        </div>
      )}

      <label
        htmlFor={inputId}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40"
      >
        <Upload className="size-6 text-muted-foreground" />
        <div className="text-sm font-medium">Drop PDFs or click to add</div>
        <p className="text-xs text-muted-foreground">
          Add 2+ files · reorder below · merge in your browser
        </p>
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={ACCEPT_PDF}
          multiple
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {files.length > 0 && (
        <ul className="space-y-2 rounded-xl border border-border/60 p-3">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-6 text-xs text-muted-foreground">{index + 1}.</span>
              <span className="min-w-0 flex-1 truncate font-mono text-xs">
                {file.name} · {formatBytes(file.size)}
              </span>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                disabled={index === 0}
                aria-label="Move up"
                onClick={() =>
                  setFiles((prev) => {
                    const next = [...prev];
                    [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
                    return next;
                  })
                }
              >
                <ArrowUp className="size-3.5" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                disabled={index === files.length - 1}
                aria-label="Move down"
                onClick={() =>
                  setFiles((prev) => {
                    const next = [...prev];
                    [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
                    return next;
                  })
                }
              >
                <ArrowDown className="size-3.5" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Remove"
                onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

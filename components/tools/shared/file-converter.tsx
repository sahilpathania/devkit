"use client";

import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eraser,
  Loader2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/tools/image-convert";
import { cn } from "@/lib/utils";

export interface FileConverterResult {
  blob: Blob;
  filename: string;
  message?: string;
}

interface FileConverterShellProps {
  accept: string;
  hint: string;
  dropLabel?: string;
  multiple?: number | boolean;
  privacyNote?: string;
  convertLabel?: string;
  busyLabel?: string;
  disabled?: boolean;
  maxSizeLabel?: string;
  children?: ReactNode;
  convert: (files: File[]) => Promise<FileConverterResult>;
}

/**
 * Shared dropzone + convert + download shell for file-based tools.
 */
export function FileConverterShell({
  accept,
  hint,
  dropLabel = "Drop a file or click to browse",
  multiple = false,
  privacyNote,
  convertLabel = "Convert",
  busyLabel = "Converting…",
  disabled = false,
  maxSizeLabel = "Processed in your browser",
  children,
  convert,
}: FileConverterShellProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<FileConverterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  const clear = useCallback(() => {
    setFiles([]);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const onFiles = useCallback((list: FileList | File[] | null) => {
    if (!list) return;
    const next = Array.from(list);
    if (!next.length) return;
    setFiles(next);
    setResult(null);
    setError(null);
    setDragging(false);

    if (next.length === 1) {
      toast.success("File ready", {
        description: `${next[0].name} · ${formatBytes(next[0].size)}`,
      });
    } else {
      toast.success("Files ready", {
        description: `${next.length} files selected`,
      });
    }
  }, []);

  const run = useCallback(async () => {
    if (!files.length) {
      setError("Choose a file first.");
      toast.error("Choose a file first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const next = await convert(files);
      setResult(next);
      toast.success("Done", {
        description:
          next.message ?? `${next.filename} · ${formatBytes(next.blob.size)}`,
      });
    } catch (err) {
      setResult(null);
      const message = err instanceof Error ? err.message : "Conversion failed.";
      setError(message);
      toast.error("Something went wrong", { description: message });
    } finally {
      setBusy(false);
    }
  }, [convert, files]);

  const allowMultiple =
    multiple === true || (typeof multiple === "number" && multiple > 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          onClick={() => void run()}
          disabled={busy || disabled || !files.length}
          className="h-10 gap-1.5 rounded-xl"
        >
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {busyLabel}
            </>
          ) : (
            convertLabel
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={clear}
          disabled={busy}
          className="h-10 gap-1.5 rounded-xl text-muted-foreground"
        >
          <Eraser className="size-4" />
          Reset
        </Button>
        {result && (
          <Button
            type="button"
            variant="outline"
            onClick={() => downloadBlob(result.blob, result.filename)}
            className="h-10 gap-1.5 rounded-xl"
          >
            <Download className="size-4" />
            Download
          </Button>
        )}
      </div>

      {children}

      {busy && (
        <div
          className="h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Processing"
          aria-busy="true"
        >
          <div className="h-full w-1/3 animate-pulse rounded-full bg-foreground/40" />
        </div>
      )}

      {(error || result) && (
        <div
          role="status"
          className={cn(
            "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm transition-opacity duration-200",
            error
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
          )}
        >
          {error ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          )}
          <span>
            {error
              ? error
              : result
                ? result.message ??
                  `Ready · ${formatBytes(result.blob.size)} · ${result.filename}`
                : null}
          </span>
        </div>
      )}

      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-12 text-center transition-all duration-200",
          dragging
            ? "scale-[1.01] border-foreground/40 bg-muted/50"
            : files.length > 0
              ? "border-emerald-500/50 bg-emerald-500/5"
              : "border-border/70 bg-muted/15 hover:border-border hover:bg-muted/30"
        )}
      >
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl transition-colors duration-200",
            dragging || files.length > 0 ? "bg-background shadow-sm" : "bg-muted/60"
          )}
        >
          <Upload
            className={cn(
              "size-5 transition-colors duration-200",
              files.length > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground"
            )}
          />
        </span>
        <div className="text-sm font-medium">
          {files.length === 0
            ? dropLabel
            : files.length === 1
              ? files[0].name
              : `${files.length} files selected`}
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{hint}</p>
        <p className="text-[11px] text-muted-foreground/80">{maxSizeLabel}</p>
        {privacyNote && (
          <p className="max-w-md text-xs text-amber-700 dark:text-amber-400">
            {privacyNote}
          </p>
        )}
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={allowMultiple}
          className="sr-only"
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>

      {files.length > 1 && (
        <ul className="max-h-40 space-y-1 overflow-auto rounded-xl border border-border/60 p-2 text-xs text-muted-foreground">
          {files.map((f) => (
            <li key={`${f.name}-${f.size}-${f.lastModified}`}>
              {f.name} · {formatBytes(f.size)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

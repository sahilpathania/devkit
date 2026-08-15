"use client";

import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eraser,
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
  /** Extra controls rendered above the dropzone */
  children?: ReactNode;
  convert: (files: File[]) => Promise<FileConverterResult>;
}

/**
 * Shared dropzone + convert + download shell for file-based tools.
 */
export function FileConverterShell({
  accept,
  hint,
  dropLabel = "Drop a file or click to upload",
  multiple = false,
  privacyNote,
  convertLabel = "Convert",
  busyLabel = "Converting…",
  disabled = false,
  children,
  convert,
}: FileConverterShellProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<FileConverterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
      toast.success("Conversion successful", {
        description:
          next.message ??
          `${next.filename} · ${formatBytes(next.blob.size)}`,
      });
    } catch (err) {
      setResult(null);
      const message = err instanceof Error ? err.message : "Conversion failed.";
      setError(message);
      toast.error("Conversion failed", { description: message });
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
          className="gap-1.5"
        >
          {busy ? busyLabel : convertLabel}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={clear}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
        {result && (
          <Button
            type="button"
            variant="outline"
            onClick={() => downloadBlob(result.blob, result.filename)}
            className="gap-1.5"
          >
            <Download className="size-4" />
            Download
          </Button>
        )}
      </div>

      {children}

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
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40",
          files.length > 0 && "border-emerald-500/40 bg-emerald-500/5"
        )}
      >
        <Upload
          className={cn(
            "size-6 text-muted-foreground",
            files.length > 0 && "text-emerald-600 dark:text-emerald-400"
          )}
        />
        <div className="text-sm font-medium">
          {files.length === 0
            ? dropLabel
            : files.length === 1
              ? files[0].name
              : `${files.length} files selected`}
        </div>
        <p className="text-xs text-muted-foreground">{hint}</p>
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
        <ul className="max-h-40 space-y-1 overflow-auto rounded-lg border border-border/60 p-2 text-xs text-muted-foreground">
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

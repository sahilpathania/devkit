"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eraser,
  ImageIcon,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { downloadBlob, formatBytes, type ConvertedImage } from "@/lib/tools/image-convert";
import { ACCEPT_HEIC, convertHeicToJpeg, isHeicFile } from "@/lib/tools/heic-convert";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Convert iPhone HEIC/HEIF photos to JPG in the browser.
 */
export function HeicToJpg(_props: ToolComponentProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.92);
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const resultUrlRef = useRef<string | null>(null);

  useEffect(() => {
    resultUrlRef.current = result?.objectUrl ?? null;
  }, [result]);

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const clear = useCallback(() => {
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    setFile(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const onFile = useCallback((next: File | null) => {
    if (!next) return;
    if (!isHeicFile(next)) {
      toast.error("Upload a .heic or .heif file.");
      return;
    }
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    setFile(next);
    setResult(null);
    setError(null);
    toast.success("File ready", {
      description: `${next.name} · ${formatBytes(next.size)}`,
    });
  }, []);

  const convert = useCallback(async () => {
    if (!file) {
      setError("Choose a HEIC photo first.");
      toast.error("Choose a HEIC photo first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const next = await convertHeicToJpeg(file, quality);
      setResult(next);
      toast.success("Converted to JPG", {
        description: `${next.filename} · ${formatBytes(next.blob.size)}`,
      });
    } catch (err) {
      setResult(null);
      const message = err instanceof Error ? err.message : "Conversion failed.";
      setError(message);
      toast.error("Conversion failed", { description: message });
    } finally {
      setBusy(false);
    }
  }, [file, quality]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => void convert()} disabled={busy || !file} className="gap-1.5">
          <ImageIcon className="size-4" />
          {busy ? "Converting…" : "Convert to JPG"}
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
            Download JPG
          </Button>
        )}
      </div>

      {(error || result) && (
        <div
          role="status"
          className={cn(
            "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
            error
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
          )}
        >
          {error ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          )}
          <span>
            {error
              ? error
              : result
                ? `Ready · ${result.width}×${result.height} · ${formatBytes(result.blob.size)} · ${result.filename}`
                : null}
          </span>
        </div>
      )}

      <label
        htmlFor={inputId}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) onFile(dropped);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40",
          file && "border-border bg-muted/10"
        )}
      >
        <Upload className="size-6 text-muted-foreground" />
        <div className="text-sm font-medium">
          {file ? file.name : "Drop a HEIC photo or click to upload"}
        </div>
        <p className="text-xs text-muted-foreground">
          .heic / .heif · converted in your browser
        </p>
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={ACCEPT_HEIC}
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>

      <div className="space-y-2">
        <Label htmlFor="heic-quality">JPG quality ({Math.round(quality * 100)}%)</Label>
        <input
          id="heic-quality"
          type="range"
          min={0.1}
          max={1}
          step={0.01}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-teal-600"
        />
      </div>

      {result && (
        <figure className="space-y-2">
          <figcaption className="text-xs font-medium text-muted-foreground">
            JPG preview · {formatBytes(result.blob.size)}
          </figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.objectUrl}
            alt="Converted JPG preview"
            className="max-h-72 w-full rounded-xl border border-border/60 bg-muted/20 object-contain"
          />
        </figure>
      )}
    </div>
  );
}

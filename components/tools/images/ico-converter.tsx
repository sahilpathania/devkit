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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  downloadBlob,
  formatBytes,
  type ConvertedImage,
} from "@/lib/tools/image-convert";
import { icoToPng, pngToIco } from "@/lib/tools/ico";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

type Mode = "ico-to-png" | "png-to-ico";

const SIZES = [16, 32, 48, 64, 128, 256] as const;

/**
 * Convert Windows ICO icons to PNG and PNG/JPG rasters to ICO.
 */
export function IcoConverter(_props: ToolComponentProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("ico-to-png");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [size, setSize] = useState<(typeof SIZES)[number]>(256);
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
    };
  }, [previewUrl, result]);

  const clear = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, [previewUrl, result]);

  const onFile = useCallback(
    (next: File | null) => {
      if (!next) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
      setFile(next);
      setPreviewUrl(URL.createObjectURL(next));
      setResult(null);
      setError(null);
    },
    [previewUrl, result]
  );

  const convert = useCallback(async () => {
    if (!file) {
      setError(mode === "ico-to-png" ? "Choose an .ico file." : "Choose a PNG/JPG image.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
      const next =
        mode === "ico-to-png" ? await icoToPng(file) : await pngToIco(file, size);
      setResult(next);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }, [file, mode, result, size]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={convert} disabled={busy || !file} className="gap-1.5">
            <ImageIcon className="size-4" />
            {busy ? "Converting…" : "Convert"}
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

        <div className="flex rounded-lg border border-border/60 p-0.5" role="group">
          {(
            [
              { value: "ico-to-png" as const, label: "ICO → PNG" },
              { value: "png-to-ico" as const, label: "PNG → ICO" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                if (result?.objectUrl) URL.revokeObjectURL(result.objectUrl);
                setMode(option.value);
                setFile(null);
                setPreviewUrl(null);
                setResult(null);
                setError(null);
                if (fileRef.current) fileRef.current.value = "";
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
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40"
      >
        <Upload className="size-6 text-muted-foreground" />
        <div className="text-sm font-medium">
          {file
            ? file.name
            : mode === "ico-to-png"
              ? "Drop an .ico file or click to upload"
              : "Drop a PNG/JPG or click to upload"}
        </div>
        <p className="text-xs text-muted-foreground">Processed locally in your browser</p>
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={
            mode === "ico-to-png"
              ? "image/x-icon,image/vnd.microsoft.icon,.ico"
              : "image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
          }
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>

      {mode === "png-to-ico" && (
        <div className="space-y-2">
          <Label>Icon size</Label>
          <div className="flex flex-wrap gap-1.5">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs transition-colors",
                  size === s
                    ? "border-border bg-muted font-medium"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={size === s}
              >
                {s}×{s}
              </button>
            ))}
          </div>
        </div>
      )}

      {(previewUrl || result) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {previewUrl && mode === "png-to-ico" && (
            <figure className="space-y-2">
              <figcaption className="text-xs font-medium text-muted-foreground">
                Original
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Original"
                className="max-h-48 w-full rounded-xl border border-border/60 object-contain"
              />
            </figure>
          )}
          {result && (
            <figure className="space-y-2">
              <figcaption className="text-xs font-medium text-muted-foreground">
                Output · {formatBytes(result.blob.size)}
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.objectUrl}
                alt="Converted icon preview"
                className="max-h-48 w-full rounded-xl border border-border/60 object-contain"
              />
            </figure>
          )}
        </div>
      )}
    </div>
  );
}

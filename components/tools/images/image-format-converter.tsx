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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ACCEPT_RASTER,
  convertRasterFile,
  downloadBlob,
  formatBytes,
  type ConvertedImage,
  type OutputImageFormat,
} from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const FORMATS: { value: OutputImageFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPG" },
  { value: "webp", label: "WebP" },
];

/**
 * Convert browser-decodable rasters (PNG/JPG/WebP/GIF/BMP/AVIF) to PNG, JPG, or WebP.
 */
export function ImageFormatConverter(_props: ToolComponentProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<OutputImageFormat>("png");
  const [quality, setQuality] = useState(0.92);
  const [maxWidth, setMaxWidth] = useState("");
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const previewUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);

  useEffect(() => {
    resultUrlRef.current = result?.objectUrl ?? null;
  }, [result]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const clear = useCallback(() => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const onFile = useCallback((next: File | null) => {
    if (!next) return;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setResult(null);
    setError(null);
  }, []);

  const convert = useCallback(async () => {
    if (!file) {
      setError("Choose an image to convert.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const width = maxWidth.trim() ? Number(maxWidth) : undefined;
      if (width !== undefined && (!Number.isFinite(width) || width < 1)) {
        throw new Error("Max width must be a positive number.");
      }
      let height: number | undefined;
      if (width && previewUrl) {
        const dims = await new Promise<{ w: number; h: number }>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
          img.onerror = () => reject(new Error("Could not read image dimensions."));
          img.src = previewUrl;
        });
        height = Math.round((width / dims.w) * dims.h);
      }
      const next = await convertRasterFile(file, format, {
        quality,
        width,
        height,
      });
      setResult(next);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }, [file, format, maxWidth, previewUrl, quality]);

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
          {FORMATS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setFormat(option.value);
                setResult(null);
                setError(null);
              }}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-colors",
                format === option.value
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={format === option.value}
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
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40",
          file && "border-border bg-muted/10"
        )}
      >
        <Upload className="size-6 text-muted-foreground" />
        <div className="text-sm font-medium">
          {file ? file.name : "Drop an image or click to upload"}
        </div>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, WebP, GIF, BMP, AVIF · converted in your browser
        </p>
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={ACCEPT_RASTER}
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        {(format === "jpeg" || format === "webp") && (
          <div className="space-y-2">
            <Label htmlFor="quality">Quality ({Math.round(quality * 100)}%)</Label>
            <input
              id="quality"
              type="range"
              min={0.1}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="max-width">Max width (optional)</Label>
          <Input
            id="max-width"
            inputMode="numeric"
            placeholder="e.g. 1200"
            value={maxWidth}
            onChange={(e) => setMaxWidth(e.target.value)}
            className="font-mono"
          />
        </div>
      </div>

      {(previewUrl || result) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {previewUrl && (
            <figure className="space-y-2">
              <figcaption className="text-xs font-medium text-muted-foreground">
                Original{file ? ` · ${formatBytes(file.size)}` : ""}
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Original upload preview"
                className="max-h-64 w-full rounded-xl border border-border/60 object-contain bg-[length:16px_16px] bg-[linear-gradient(45deg,#0000000d_25%,transparent_25%),linear-gradient(-45deg,#0000000d_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0000000d_75%),linear-gradient(-45deg,transparent_75%,#0000000d_75%)] bg-[position:0_0,0_8px,8px_-8px,-8px_0]"
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
                alt="Converted image preview"
                className="max-h-64 w-full rounded-xl border border-border/60 object-contain bg-[length:16px_16px] bg-[linear-gradient(45deg,#0000000d_25%,transparent_25%),linear-gradient(-45deg,#0000000d_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0000000d_75%),linear-gradient(-45deg,transparent_75%,#0000000d_75%)] bg-[position:0_0,0_8px,8px_-8px,-8px_0]"
              />
            </figure>
          )}
        </div>
      )}
    </div>
  );
}

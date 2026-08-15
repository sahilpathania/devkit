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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ACCEPT_RASTER,
  compressAndResizeImage,
  formatBytes,
  type ResizeMode,
} from "@/lib/tools/image-compress";
import { downloadBlob, type OutputImageFormat } from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const FORMATS: { value: OutputImageFormat; label: string }[] = [
  { value: "jpeg", label: "JPG" },
  { value: "webp", label: "WebP" },
  { value: "png", label: "PNG" },
];

const MODES: { value: ResizeMode; label: string }[] = [
  { value: "max-width", label: "Max width" },
  { value: "max-height", label: "Max height" },
  { value: "exact", label: "Exact size" },
  { value: "percent", label: "Scale %" },
];

export function ImageCompressResize(_props: ToolComponentProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<OutputImageFormat>("jpeg");
  const [quality, setQuality] = useState(0.8);
  const [mode, setMode] = useState<ResizeMode>("max-width");
  const [width, setWidth] = useState("1600");
  const [height, setHeight] = useState("");
  const [percent, setPercent] = useState("80");
  const [result, setResult] = useState<{
    blob: Blob;
    filename: string;
    objectUrl: string;
    width: number;
    height: number;
    originalSize: number;
    savedPercent: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<string | null>(null);
  const resultRef = useRef<string | null>(null);

  useEffect(() => {
    previewRef.current = previewUrl;
  }, [previewUrl]);
  useEffect(() => {
    resultRef.current = result?.objectUrl ?? null;
  }, [result]);
  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    };
  }, []);

  const clear = useCallback(() => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const onFile = useCallback((next: File | null) => {
    if (!next) return;
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
    setResult(null);
    setError(null);
    toast.success("File ready", {
      description: `${next.name} · ${formatBytes(next.size)}`,
    });
  }, []);

  const convert = useCallback(async () => {
    if (!file) {
      setError("Choose an image first.");
      toast.error("Choose an image first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
      const next = await compressAndResizeImage(file, {
        format,
        quality,
        mode,
        width: width.trim() ? Number(width) : undefined,
        height: height.trim() ? Number(height) : undefined,
        percent: percent.trim() ? Number(percent) : undefined,
      });
      setResult(next);
      toast.success("Image optimized", {
        description: `${formatBytes(next.blob.size)} · ${next.savedPercent}% smaller`,
      });
    } catch (err) {
      setResult(null);
      const message = err instanceof Error ? err.message : "Optimization failed.";
      setError(message);
      toast.error("Optimization failed", { description: message });
    } finally {
      setBusy(false);
    }
  }, [file, format, height, mode, percent, quality, width]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => void convert()} disabled={busy || !file} className="gap-1.5">
          <ImageIcon className="size-4" />
          {busy ? "Optimizing…" : "Compress / resize"}
        </Button>
        <Button type="button" variant="ghost" onClick={clear} className="gap-1.5 text-muted-foreground">
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
          <span>
            {error
              ? error
              : result
                ? `${result.width}×${result.height} · ${formatBytes(result.blob.size)} (was ${formatBytes(result.originalSize)}) · ${result.savedPercent}% smaller`
                : null}
          </span>
        </div>
      )}

      <label
        htmlFor={inputId}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFile(e.dataTransfer.files?.[0] ?? null);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40",
          file && "border-emerald-500/40 bg-emerald-500/5"
        )}
      >
        <Upload className="size-6 text-muted-foreground" />
        <div className="text-sm font-medium">
          {file ? file.name : "Drop an image or click to upload"}
        </div>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, WebP, GIF, BMP · compress & resize in your browser
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

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Output format">
        {FORMATS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFormat(option.value)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              format === option.value
                ? "border-border bg-muted font-medium"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

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

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Resize mode">
        {MODES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setMode(option.value)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              mode === option.value
                ? "border-border bg-muted font-medium"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(mode === "max-width" || mode === "exact") && (
          <div className="space-y-2">
            <Label htmlFor="w">Width (px)</Label>
            <Input
              id="w"
              inputMode="numeric"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="font-mono"
            />
          </div>
        )}
        {(mode === "max-height" || mode === "exact") && (
          <div className="space-y-2">
            <Label htmlFor="h">Height (px)</Label>
            <Input
              id="h"
              inputMode="numeric"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="font-mono"
              placeholder={mode === "exact" ? "optional" : ""}
            />
          </div>
        )}
        {mode === "percent" && (
          <div className="space-y-2">
            <Label htmlFor="pct">Scale (%)</Label>
            <Input
              id="pct"
              inputMode="numeric"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="font-mono"
            />
          </div>
        )}
      </div>

      {(previewUrl || result) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {previewUrl && (
            <figure className="space-y-2">
              <figcaption className="text-xs text-muted-foreground">
                Original{file ? ` · ${formatBytes(file.size)}` : ""}
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Original"
                className="max-h-56 w-full rounded-xl border border-border/60 object-contain"
              />
            </figure>
          )}
          {result && (
            <figure className="space-y-2">
              <figcaption className="text-xs text-muted-foreground">
                Result · {formatBytes(result.blob.size)}
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.objectUrl}
                alt="Optimized"
                className="max-h-56 w-full rounded-xl border border-border/60 object-contain"
              />
            </figure>
          )}
        </div>
      )}
    </div>
  );
}

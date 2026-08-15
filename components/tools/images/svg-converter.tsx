"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eraser,
  FileCode2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ACCEPT_SVG,
  convertSvgText,
  downloadBlob,
  formatBytes,
  pngToEmbeddedSvg,
  type ConvertedImage,
  type OutputImageFormat,
} from "@/lib/tools/image-convert";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

type Mode = "svg-to-raster" | "png-to-svg";

const FORMATS: { value: OutputImageFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPG" },
  { value: "webp", label: "WebP" },
];

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <rect width="240" height="240" rx="32" fill="#0d9488"/>
  <circle cx="120" cy="110" r="48" fill="#fff" opacity="0.95"/>
  <text x="120" y="190" text-anchor="middle" fill="#ecfdf5" font-family="system-ui,sans-serif" font-size="22" font-weight="600">DevKit</text>
</svg>`;

/**
 * SVG → PNG/JPG/WebP, plus PNG → embedded SVG helper.
 */
export function SvgConverter(_props: ToolComponentProps) {
  const fileId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("svg-to-raster");
  const [svgText, setSvgText] = useState("");
  const [fileName, setFileName] = useState("image.svg");
  const [rasterFile, setRasterFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputImageFormat>("png");
  const [quality, setQuality] = useState(0.92);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
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
    setSvgText("");
    setFileName("image.svg");
    setRasterFile(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const onSvgFile = useCallback(async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    setSvgText(text);
    setFileName(file.name);
    setResult(null);
    setError(null);
  }, []);

  const convert = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);

      if (mode === "png-to-svg") {
        if (!rasterFile) throw new Error("Choose a PNG/JPG image to embed as SVG.");
        const next = await pngToEmbeddedSvg(rasterFile);
        setResult(next);
        return;
      }

      if (!svgText.trim()) throw new Error("Paste SVG markup or upload an .svg file.");
      const w = width.trim() ? Number(width) : undefined;
      const h = height.trim() ? Number(height) : undefined;
      if (w !== undefined && (!Number.isFinite(w) || w < 1)) {
        throw new Error("Width must be a positive number.");
      }
      if (h !== undefined && (!Number.isFinite(h) || h < 1)) {
        throw new Error("Height must be a positive number.");
      }

      const next = await convertSvgText(svgText, format, {
        quality,
        width: w,
        height: h,
        filename: fileName,
      });
      setResult(next);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }, [fileName, format, height, mode, quality, rasterFile, svgText, width]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={convert} disabled={busy} className="gap-1.5">
            <FileCode2 className="size-4" />
            {busy ? "Converting…" : "Convert"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setMode("svg-to-raster");
              setSvgText(SAMPLE_SVG);
              setFileName("devkit.svg");
              setResult(null);
              setError(null);
            }}
            className="gap-1.5"
          >
            Sample
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
              { value: "svg-to-raster" as const, label: "SVG → Image" },
              { value: "png-to-svg" as const, label: "Image → SVG" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setMode(option.value);
                setResult(null);
                setError(null);
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

      {mode === "svg-to-raster" ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-border/60 p-0.5" role="group">
              {FORMATS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setFormat(option.value);
                    setResult(null);
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
            <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <Upload className="size-3.5" />
              Upload SVG
              <input
                ref={fileRef}
                id={fileId}
                type="file"
                accept={ACCEPT_SVG}
                className="sr-only"
                onChange={(e) => void onSvgFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="svg-input">SVG markup</Label>
            <Textarea
              id="svg-input"
              value={svgText}
              onChange={(e) => {
                setSvgText(e.target.value);
                setResult(null);
              }}
              placeholder="<svg …>"
              className="min-h-[180px] font-mono text-xs"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="svg-w">Width (px)</Label>
              <Input
                id="svg-w"
                inputMode="numeric"
                placeholder="auto"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="svg-h">Height (px)</Label>
              <Input
                id="svg-h"
                inputMode="numeric"
                placeholder="auto"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="font-mono"
              />
            </div>
            {(format === "jpeg" || format === "webp") && (
              <div className="space-y-2">
                <Label htmlFor="svg-q">Quality ({Math.round(quality * 100)}%)</Label>
                <input
                  id="svg-q"
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
          </div>
        </>
      ) : (
        <label
          htmlFor={`${fileId}-raster`}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40"
        >
          <Upload className="size-6 text-muted-foreground" />
          <div className="text-sm font-medium">
            {rasterFile ? rasterFile.name : "Upload PNG/JPG to embed in SVG"}
          </div>
          <p className="text-xs text-muted-foreground">
            Creates an SVG wrapper with a data-URI image (not vector tracing)
          </p>
          <input
            id={`${fileId}-raster`}
            type="file"
            accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
            className="sr-only"
            onChange={(e) => {
              setRasterFile(e.target.files?.[0] ?? null);
              setResult(null);
              setError(null);
            }}
          />
        </label>
      )}

      {result && (
        <figure className="space-y-2">
          <figcaption className="text-xs font-medium text-muted-foreground">
            Preview · {formatBytes(result.blob.size)}
          </figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.objectUrl}
            alt="Conversion preview"
            className="max-h-72 w-full rounded-xl border border-border/60 object-contain bg-[length:16px_16px] bg-[linear-gradient(45deg,#0000000d_25%,transparent_25%),linear-gradient(-45deg,#0000000d_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0000000d_75%),linear-gradient(-45deg,transparent_75%,#0000000d_75%)] bg-[position:0_0,0_8px,8px_-8px,-8px_0]"
          />
        </figure>
      )}
    </div>
  );
}

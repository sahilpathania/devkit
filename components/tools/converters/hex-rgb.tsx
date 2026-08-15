"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eraser,
  Palette,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import {
  hexToRgb,
  parseRgbString,
  rgbToHex,
  type HexRgbResult,
} from "@/lib/tools/hex-rgb";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

type Mode = "hex-to-rgb" | "rgb-to-hex";

/**
 * HEX ↔ RGB color converter with live preview swatch.
 */
export function HexRgbConverter(_props: ToolComponentProps) {
  const [mode, setMode] = useState<Mode>("hex-to-rgb");
  const [hexInput, setHexInput] = useState("#0d9488");
  const [rgbInput, setRgbInput] = useState("13, 148, 136");
  const [result, setResult] = useState<HexRgbResult | null>(null);

  const run = useCallback(() => {
    if (mode === "hex-to-rgb") {
      const next = hexToRgb(hexInput);
      setResult(next);
      if (next.success) {
        setRgbInput(`${next.rgb.r}, ${next.rgb.g}, ${next.rgb.b}`);
      }
      return;
    }

    const parsed = parseRgbString(rgbInput);
    if (!parsed) {
      setResult({ success: false, error: "Enter RGB as r, g, b or rgb(r, g, b)." });
      return;
    }
    const next = rgbToHex(parsed.r, parsed.g, parsed.b);
    setResult(next);
    if (next.success) setHexInput(next.hex);
  }, [hexInput, mode, rgbInput]);

  useKeyboardShortcut(run, { key: "Enter", modifier: "meta" });

  const preview = useMemo(() => {
    if (result?.success) return result.hex;
    const fromHex = hexToRgb(hexInput);
    if (fromHex.success) return fromHex.hex;
    return "#0d9488";
  }, [hexInput, result]);

  const hasError = result !== null && !result.success;
  const isSuccess = result !== null && result.success;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={run} className="gap-1.5">
            <Palette className="size-4" />
            Convert
            <kbd className="ml-1 hidden rounded border border-primary-foreground/20 px-1.5 py-0.5 text-[10px] font-medium opacity-70 sm:inline">
              ⌘↵
            </kbd>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setHexInput("#0d9488");
              setRgbInput("13, 148, 136");
              setResult(null);
            }}
            className="gap-1.5"
          >
            <Sparkles className="size-4" />
            Sample
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setHexInput("");
              setRgbInput("");
              setResult(null);
            }}
            className="gap-1.5 text-muted-foreground"
          >
            <Eraser className="size-4" />
            Clear
          </Button>
        </div>

        <div className="flex rounded-lg border border-border/60 p-0.5" role="group">
          {(
            [
              { value: "hex-to-rgb", label: "HEX → RGB" },
              { value: "rgb-to-hex", label: "RGB → HEX" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setMode(option.value);
                setResult(null);
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

      {(hasError || isSuccess) && (
        <div
          role="status"
          className={cn(
            "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
            hasError
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
          )}
        >
          {hasError ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          )}
          <span>
            {hasError
              ? result.error
              : `${result.hex} · ${result.rgbCss}`}
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="hex-input">HEX</Label>
              <CopyButton value={hexInput} label="Copy HEX" disabled={!hexInput} />
            </div>
            <Input
              id="hex-input"
              value={hexInput}
              onChange={(e) => {
                setHexInput(e.target.value);
                setResult(null);
              }}
              placeholder="#0d9488"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="rgb-input">RGB</Label>
              <CopyButton value={rgbInput} label="Copy RGB" disabled={!rgbInput} />
            </div>
            <Input
              id="rgb-input"
              value={rgbInput}
              onChange={(e) => {
                setRgbInput(e.target.value);
                setResult(null);
              }}
              placeholder="13, 148, 136"
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:pt-6">
          <div
            className="size-24 rounded-2xl border border-border/60 shadow-inner"
            style={{ backgroundColor: preview }}
            aria-label={`Color preview ${preview}`}
          />
          <code className="text-xs text-muted-foreground">{preview}</code>
        </div>
      </div>
    </div>
  );
}

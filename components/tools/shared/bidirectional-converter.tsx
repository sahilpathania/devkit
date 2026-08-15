"use client";

import { useCallback, useId, useState } from "react";
import {
  AlertCircle,
  ArrowLeftRight,
  CheckCircle2,
  Eraser,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import type { ConvertResult } from "@/lib/tools/convert-result";
import { cn } from "@/lib/utils";

export type { ConvertResult } from "@/lib/tools/convert-result";

export interface BidirectionalModeOption<T extends string> {
  value: T;
  label: string;
  inputLabel: string;
  outputLabel: string;
  placeholder: string;
  sample: string;
  successMessage: string;
}

interface BidirectionalConverterProps<T extends string> {
  modes: BidirectionalModeOption<T>[];
  defaultMode: T;
  convert: (input: string, mode: T) => ConvertResult;
  actionLabel?: string;
  ActionIcon?: LucideIcon;
  /** When true, swapping modes also flips which side is "forward" using adjacent mode pairs. */
  invertModeOnSwap?: (mode: T) => T;
}

/**
 * Reusable two-pane converter shell used by format tools (JSON↔YAML, etc.).
 */
export function BidirectionalConverter<T extends string>({
  modes,
  defaultMode,
  convert,
  actionLabel = "Convert",
  ActionIcon = ArrowLeftRight,
  invertModeOnSwap,
}: BidirectionalConverterProps<T>) {
  const inputId = useId();
  const outputId = useId();
  const [mode, setMode] = useState<T>(defaultMode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState<ConvertResult | null>(null);

  const current = modes.find((m) => m.value === mode) ?? modes[0]!;

  const run = useCallback(
    (nextInput = input, nextMode = mode) => {
      const next = convert(nextInput, nextMode);
      setResult(next);
      if (next.success) setOutput(next.output);
    },
    [convert, input, mode]
  );

  const handleModeChange = useCallback((nextMode: T) => {
    setMode(nextMode);
    setResult(null);
    setOutput("");
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setResult(null);
  }, []);

  const handleSample = useCallback(() => {
    setInput(current.sample);
    setOutput("");
    setResult(null);
  }, [current.sample]);

  const handleSwap = useCallback(() => {
    if (!output) return;
    setInput(output);
    setOutput("");
    setResult(null);
    if (invertModeOnSwap) setMode((m) => invertModeOnSwap(m));
  }, [invertModeOnSwap, output]);

  useKeyboardShortcut(() => run(), { key: "Enter", modifier: "meta" });

  const hasError = result !== null && !result.success;
  const isSuccess = result !== null && result.success;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={() => run()} className="gap-1.5">
            <ActionIcon className="size-4" />
            {actionLabel}
            <kbd className="ml-1 hidden rounded border border-primary-foreground/20 px-1.5 py-0.5 text-[10px] font-medium opacity-70 sm:inline">
              ⌘↵
            </kbd>
          </Button>
          <Button type="button" variant="ghost" onClick={handleSample} className="gap-1.5">
            <Sparkles className="size-4" />
            Sample
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleSwap}
            disabled={!output}
            className="gap-1.5 text-muted-foreground"
          >
            Use output as input
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleClear}
            disabled={!input && !output}
            className="gap-1.5 text-muted-foreground"
          >
            <Eraser className="size-4" />
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Conversion mode">
          <Label className="text-xs text-muted-foreground">Mode</Label>
          <div className="flex flex-wrap rounded-lg border border-border/60 p-0.5">
            {modes.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleModeChange(option.value)}
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
          <span>{hasError ? result.error : current.successMessage}</span>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={inputId} className="text-sm font-medium">
              {current.inputLabel}
            </Label>
            <CopyButton value={input} label="Copy input" disabled={!input} />
          </div>
          <Textarea
            id={inputId}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setResult(null);
            }}
            placeholder={current.placeholder}
            spellCheck={false}
            className={cn(
              "min-h-[260px] resize-y rounded-xl border-border/60 bg-muted/20 font-mono text-sm leading-relaxed",
              hasError && "border-destructive/50 focus-visible:ring-destructive/30"
            )}
            aria-invalid={hasError}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={outputId} className="text-sm font-medium">
              {current.outputLabel}
            </Label>
            <CopyButton value={output} label="Copy output" disabled={!output} />
          </div>
          <Textarea
            id={outputId}
            value={output}
            readOnly
            placeholder="Result appears here"
            spellCheck={false}
            className="min-h-[260px] resize-y rounded-xl border-border/60 bg-muted/30 font-mono text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}

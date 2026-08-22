"use client";

import { useCallback, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eraser,
  Link2,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import {
  URL_ENCODING_SAMPLE_ENCODED,
  URL_ENCODING_SAMPLE_TEXT,
  processUrlEncoding,
  type UrlEncodingMode,
  type UrlEncodingResult,
} from "@/lib/tools/url-encoding";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * URL Encode/Decode — percent-encoding for query strings and paths.
 */
export function UrlEncodeDecode(_props: ToolComponentProps) {
  const [mode, setMode] = useState<UrlEncodingMode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState<UrlEncodingResult | null>(null);

  const run = useCallback(
    (nextInput = input, nextMode = mode) => {
      const next = processUrlEncoding(nextInput, nextMode);
      setResult(next);
      if (next.success) setOutput(next.output);
    },
    [input, mode]
  );

  const handleModeChange = useCallback((nextMode: UrlEncodingMode) => {
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
    setInput(mode === "encode" ? URL_ENCODING_SAMPLE_TEXT : URL_ENCODING_SAMPLE_ENCODED);
    setOutput("");
    setResult(null);
  }, [mode]);

  const handleSwap = useCallback(() => {
    if (!output) return;
    setInput(output);
    setOutput("");
    setResult(null);
    setMode((current) => (current === "encode" ? "decode" : "encode"));
  }, [output]);

  useKeyboardShortcut(() => run(), { key: "Enter", modifier: "meta" });

  const hasError = result !== null && !result.success;
  const isSuccess = result !== null && result.success;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={() => run()} className="gap-1.5">
            <Link2 className="size-4" />
            {mode === "encode" ? "Encode" : "Decode"}
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

        <div className="flex items-center gap-2" role="group" aria-label="Mode">
          <Label className="text-xs text-muted-foreground">Mode</Label>
          <div className="flex rounded-lg border border-border/60 p-0.5">
            {(
              [
                { label: "Encode", value: "encode" },
                { label: "Decode", value: "decode" },
              ] as const
            ).map((option) => (
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
          <span>
            {hasError
              ? result.error
              : mode === "encode"
                ? "URL-encoded successfully"
                : "URL-decoded successfully"}
          </span>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="url-encoding-input" className="text-sm font-medium">
              {mode === "encode" ? "Text / URL" : "Encoded string"}
            </Label>
            <CopyButton value={input} label="Copy input" disabled={!input} />
          </div>
          <Textarea
            id="url-encoding-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setResult(null);
            }}
            placeholder={
              mode === "encode"
                ? "Hello ToolBay! query=a&b=c"
                : "Hello%20ToolBay!%20query%3Da%26b%3Dc"
            }
            spellCheck={false}
            className={cn(
              "min-h-[240px] resize-y rounded-xl border-border/60 bg-muted/20 font-mono text-sm leading-relaxed",
              hasError && "border-destructive/50 focus-visible:ring-destructive/30"
            )}
            aria-invalid={hasError}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="url-encoding-output" className="text-sm font-medium">
              {mode === "encode" ? "Encoded" : "Decoded"}
            </Label>
            <CopyButton value={output} label="Copy output" disabled={!output} />
          </div>
          <Textarea
            id="url-encoding-output"
            value={output}
            readOnly
            placeholder="Result appears here"
            spellCheck={false}
            className="min-h-[240px] resize-y rounded-xl border-border/60 bg-muted/30 font-mono text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}

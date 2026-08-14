"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AlertCircle,
  Braces,
  CheckCircle2,
  Eraser,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import {
  JSON_VALIDATOR_INVALID_SAMPLE,
  JSON_VALIDATOR_SAMPLE,
  getJsonStats,
  getJsonValueType,
  validateJson,
  type JsonProcessResult,
} from "@/lib/tools/json";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * JSON Validator — check syntax with line/column errors in the browser.
 */
export function JsonValidator(_props: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<JsonProcessResult | null>(null);

  const inputStats = useMemo(() => getJsonStats(input), [input]);

  const handleValidate = useCallback(() => {
    setResult(validateJson(input));
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult(null);
  }, []);

  const handleSample = useCallback(() => {
    setInput(JSON_VALIDATOR_SAMPLE);
    setResult(null);
  }, []);

  const handleInvalidSample = useCallback(() => {
    setInput(JSON_VALIDATOR_INVALID_SAMPLE);
    setResult(null);
  }, []);

  useKeyboardShortcut(handleValidate, { key: "Enter", modifier: "meta" });

  const hasError = result !== null && !result.success;
  const isValid = result !== null && result.success;
  const valueType = isValid ? getJsonValueType(input) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={handleValidate} className="gap-1.5">
            <ShieldCheck className="size-4" />
            Validate
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
            onClick={handleInvalidSample}
            className="gap-1.5 text-muted-foreground"
          >
            Invalid sample
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleClear}
            disabled={!input}
            className="gap-1.5 text-muted-foreground"
          >
            <Eraser className="size-4" />
            Clear
          </Button>
        </div>
      </div>

      {(hasError || isValid) && (
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
              ? `${result.error}${
                  result.line
                    ? ` (line ${result.line}${result.column ? `, col ${result.column}` : ""})`
                    : ""
                }`
              : `Valid JSON${valueType ? ` — top-level ${valueType}` : ""}`}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="json-validator-input" className="flex items-center gap-1.5 text-sm font-medium">
            <Braces className="size-3.5 text-muted-foreground" />
            JSON input
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {inputStats.lines} lines · {inputStats.sizeLabel}
            </span>
            <CopyButton value={input} label="Copy input" disabled={!input} />
          </div>
        </div>
        <Textarea
          id="json-validator-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setResult(null);
          }}
          placeholder='{"paste": "your JSON here"}'
          spellCheck={false}
          className={cn(
            "min-h-[320px] resize-y rounded-xl border-border/60 bg-muted/20 font-mono text-sm leading-relaxed",
            hasError && "border-destructive/50 focus-visible:ring-destructive/30"
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? "json-validator-error" : undefined}
        />
      </div>

      {hasError && (
        <p id="json-validator-error" className="sr-only">
          {result.error}
        </p>
      )}
    </div>
  );
}

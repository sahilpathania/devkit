"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AlertCircle,
  Braces,
  CheckCircle2,
  Eraser,
  Minimize2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import {
  JSON_FORMATTER_SAMPLE,
  beautifyJson,
  getJsonStats,
  minifyJson,
  type JsonIndent,
  type JsonProcessResult,
} from "@/lib/tools/json";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const INDENT_OPTIONS: { label: string; value: JsonIndent }[] = [
  { label: "2 spaces", value: 2 },
  { label: "4 spaces", value: 4 },
  { label: "Tabs", value: "\t" },
];

/**
 * JSON Formatter — beautify and minify JSON entirely in the browser.
 */
export function JsonFormatter(_props: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<JsonIndent>(2);
  const [result, setResult] = useState<JsonProcessResult | null>(null);

  const inputStats = useMemo(() => getJsonStats(input), [input]);
  const outputStats = useMemo(
    () => (output ? getJsonStats(output) : null),
    [output]
  );

  const applyResult = useCallback((next: JsonProcessResult) => {
    setResult(next);
    if (next.success) {
      setOutput(next.output);
    }
  }, []);

  const handleFormat = useCallback(() => {
    applyResult(beautifyJson(input, indent));
  }, [applyResult, indent, input]);

  const handleMinify = useCallback(() => {
    applyResult(minifyJson(input));
  }, [applyResult, input]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setResult(null);
  }, []);

  const handleSample = useCallback(() => {
    setInput(JSON_FORMATTER_SAMPLE);
    setResult(null);
    setOutput("");
  }, []);

  // ⌘Enter / Ctrl+Enter formats the current input
  useKeyboardShortcut(handleFormat, { key: "Enter", modifier: "meta" });

  const hasError = result !== null && !result.success;
  const isValid = result !== null && result.success;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={handleFormat} className="gap-1.5">
            <Wand2 className="size-4" />
            Format
            <kbd className="ml-1 hidden rounded border border-primary-foreground/20 px-1.5 py-0.5 text-[10px] font-medium opacity-70 sm:inline">
              ⌘↵
            </kbd>
          </Button>
          <Button type="button" variant="outline" onClick={handleMinify} className="gap-1.5">
            <Minimize2 className="size-4" />
            Minify
          </Button>
          <Button type="button" variant="ghost" onClick={handleSample} className="gap-1.5">
            <Sparkles className="size-4" />
            Sample
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

        <div className="flex items-center gap-2" role="group" aria-label="Indentation">
          <Label className="text-xs text-muted-foreground">Indent</Label>
          <div className="flex rounded-lg border border-border/60 p-0.5">
            {INDENT_OPTIONS.map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setIndent(option.value)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs transition-colors",
                  indent === option.value
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={indent === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status */}
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
              : "Valid JSON — formatted successfully"}
          </span>
        </div>
      )}

      {/* Editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="json-input" className="flex items-center gap-1.5 text-sm font-medium">
              <Braces className="size-3.5 text-muted-foreground" />
              Input
            </Label>
            <span className="text-xs text-muted-foreground">
              {inputStats.lines} lines · {inputStats.sizeLabel}
            </span>
          </div>
          <Textarea
            id="json-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setResult(null);
            }}
            placeholder='{"paste": "your JSON here"}'
            spellCheck={false}
            className={cn(
              "min-h-[280px] resize-y rounded-xl border-border/60 bg-muted/20 font-mono text-sm leading-relaxed",
              hasError && "border-destructive/50 focus-visible:ring-destructive/30"
            )}
            aria-invalid={hasError}
            aria-describedby={hasError ? "json-error" : undefined}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="json-output" className="text-sm font-medium">
              Output
            </Label>
            <div className="flex items-center gap-2">
              {outputStats && (
                <span className="text-xs text-muted-foreground">
                  {outputStats.lines} lines · {outputStats.sizeLabel}
                </span>
              )}
              <CopyButton value={output} label="Copy output" disabled={!output} />
            </div>
          </div>
          <Textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="Formatted JSON appears here"
            spellCheck={false}
            className="min-h-[280px] resize-y rounded-xl border-border/60 bg-muted/30 font-mono text-sm leading-relaxed"
          />
        </div>
      </div>

      {hasError && (
        <p id="json-error" className="sr-only">
          {result.error}
        </p>
      )}
    </div>
  );
}

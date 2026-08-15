"use client";

import { useCallback, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eraser,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import {
  TIMESTAMP_SAMPLE_ISO,
  TIMESTAMP_SAMPLE_UNIX,
  convertTimestamp,
  type TimestampMode,
  type TimestampResult,
} from "@/lib/tools/timestamp";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Unix timestamp ↔ date converter with auto unit detection.
 */
export function TimestampConverter(_props: ToolComponentProps) {
  const [mode, setMode] = useState<TimestampMode>("unix-to-date");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TimestampResult | null>(null);

  const run = useCallback(() => {
    setResult(convertTimestamp(input, mode));
  }, [input, mode]);

  useKeyboardShortcut(run, { key: "Enter", modifier: "meta" });

  const hasError = result !== null && !result.success;
  const isSuccess = result !== null && result.success;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={run} className="gap-1.5">
            <Clock className="size-4" />
            Convert
            <kbd className="ml-1 hidden rounded border border-primary-foreground/20 px-1.5 py-0.5 text-[10px] font-medium opacity-70 sm:inline">
              ⌘↵
            </kbd>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setInput(
                mode === "unix-to-date" ? TIMESTAMP_SAMPLE_UNIX : TIMESTAMP_SAMPLE_ISO
              );
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
              setInput(String(Math.floor(Date.now() / 1000)));
              setMode("unix-to-date");
              setResult(null);
            }}
            className="gap-1.5 text-muted-foreground"
          >
            Now
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setInput("");
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
              { value: "unix-to-date", label: "Unix → Date" },
              { value: "date-to-unix", label: "Date → Unix" },
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
              : `Converted successfully${
                  mode === "unix-to-date" ? ` · detected ${result.detectedUnit}` : ""
                }`}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="timestamp-input">
          {mode === "unix-to-date" ? "Unix timestamp" : "Date / ISO string"}
        </Label>
        <Input
          id="timestamp-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setResult(null);
          }}
          placeholder={
            mode === "unix-to-date" ? "1704067200" : "2024-01-01T00:00:00.000Z"
          }
          className="font-mono"
        />
      </div>

      {isSuccess && (
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { label: "ISO (UTC)", value: result.iso },
              { label: "Local", value: result.local },
              { label: "Unix (seconds)", value: String(result.unixSeconds) },
              { label: "Unix (milliseconds)", value: String(result.unixMilliseconds) },
            ] as const
          ).map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-border/60 bg-muted/20 p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-muted-foreground">{row.label}</p>
                <CopyButton value={row.value} label={`Copy ${row.label}`} />
              </div>
              <p className="break-all font-mono text-sm">{row.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

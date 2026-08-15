"use client";

import { useMemo, useState } from "react";
import { Eraser, Sparkles, Type } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  TEXT_CASE_MODES,
  convertTextCase,
  type TextCaseMode,
} from "@/lib/tools/text";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const SAMPLE = "DevKit developer tools that just work";

/**
 * Convert text between common case styles and URL slugs.
 */
export function TextCaseConverter(_props: ToolComponentProps) {
  const [mode, setMode] = useState<TextCaseMode>("camel");
  const [input, setInput] = useState("");
  const output = useMemo(() => convertTextCase(input, mode), [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setInput(SAMPLE)}
          className="gap-1.5"
        >
          <Sparkles className="size-4" />
          Sample
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setInput("")}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Type className="size-3.5" />
          Live convert
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Case style">
        {TEXT_CASE_MODES.map((option) => (
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
            aria-pressed={mode === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="case-in">Input</Label>
          <Textarea
            id="case-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text…"
            className="min-h-[200px]"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="case-out">Output</Label>
            <CopyButton value={output} label="Copy output" disabled={!output} />
          </div>
          <Textarea
            id="case-out"
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm"
            placeholder="Converted text"
          />
        </div>
      </div>
    </div>
  );
}

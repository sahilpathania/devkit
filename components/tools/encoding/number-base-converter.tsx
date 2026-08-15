"use client";

import { useMemo, useState } from "react";
import { Binary, Eraser, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertNumberBase, type NumberBase } from "@/lib/tools/calculators";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const BASES: { value: NumberBase; label: string }[] = [
  { value: 2, label: "Binary" },
  { value: 8, label: "Octal" },
  { value: 10, label: "Decimal" },
  { value: 16, label: "Hex" },
];

/**
 * Convert numbers between binary, octal, decimal, and hexadecimal.
 */
export function NumberBaseConverter(_props: ToolComponentProps) {
  const [from, setFrom] = useState<NumberBase>(10);
  const [input, setInput] = useState("255");

  const outputs = useMemo(() => {
    const map: Partial<Record<NumberBase, string>> = {};
    let error: string | null = null;
    for (const { value } of BASES) {
      try {
        map[value] = convertNumberBase(input, from, value);
      } catch (err) {
        error = err instanceof Error ? err.message : "Invalid number.";
        break;
      }
    }
    return { map, error };
  }, [from, input]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setFrom(10);
            setInput("255");
          }}
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
          <Binary className="size-3.5" />
          Live convert
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Input base">
        {BASES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFrom(option.value)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              from === option.value
                ? "border-border bg-muted font-medium"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={from === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="base-input">Input ({BASES.find((b) => b.value === from)?.label})</Label>
        <Input
          id="base-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono"
          placeholder={from === 16 ? "FF" : from === 2 ? "11111111" : "255"}
        />
      </div>

      {outputs.error ? (
        <p className="text-sm text-destructive">{outputs.error}</p>
      ) : (
        <div className="space-y-3">
          {BASES.map(({ value, label }) => (
            <div key={value} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">{label}</Label>
                <CopyButton
                  value={outputs.map[value] ?? ""}
                  label={`Copy ${label}`}
                  disabled={!outputs.map[value]}
                />
              </div>
              <code className="block break-all rounded-lg border border-border/60 bg-muted/20 px-3 py-2 font-mono text-sm">
                {outputs.map[value] ?? "—"}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

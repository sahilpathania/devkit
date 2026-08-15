"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PERCENTAGE_MODES,
  calculatePercentage,
  type PercentageMode,
} from "@/lib/tools/calculators";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Percentage calculator for common math scenarios.
 */
export function PercentageCalculator(_props: ToolComponentProps) {
  const [mode, setMode] = useState<PercentageMode>("percent-of");
  const [a, setA] = useState("15");
  const [b, setB] = useState("200");

  const labels =
    mode === "percent-of"
      ? { a: "Percent (X)", b: "Of value (Y)" }
      : mode === "is-what-percent"
        ? { a: "Value (X)", b: "Of total (Y)" }
        : mode === "percent-change"
          ? { a: "From (X)", b: "To (Y)" }
          : { a: "Value (X)", b: "Percent (Y)" };

  const computed = useMemo(() => {
    try {
      const result = calculatePercentage(mode, Number(a), Number(b));
      return {
        ok: true as const,
        value: Number(result.result.toPrecision(12)),
        label: result.label,
      };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Invalid input.",
      };
    }
  }, [a, b, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Mode">
        {PERCENTAGE_MODES.map((option) => (
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pct-a">{labels.a}</Label>
          <Input
            id="pct-a"
            inputMode="decimal"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pct-b">{labels.b}</Label>
          <Input
            id="pct-b"
            inputMode="decimal"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="font-mono"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calculator className="size-4" />
            {computed.ok ? computed.label : "Result"}
          </div>
          {computed.ok && (
            <CopyButton value={String(computed.value)} label="Copy result" />
          )}
        </div>
        <div className="mt-2 font-mono text-2xl font-semibold tabular-nums">
          {computed.ok
            ? mode === "is-what-percent" || mode === "percent-change"
              ? `${computed.value}%`
              : computed.value
            : "—"}
        </div>
        {!computed.ok && (
          <p className="mt-1 text-sm text-destructive">{computed.error}</p>
        )}
      </div>
    </div>
  );
}

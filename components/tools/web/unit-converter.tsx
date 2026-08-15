"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  convertUnit,
  formatUnitValue,
  getUnitCategories,
  getUnits,
  type UnitCategory,
} from "@/lib/tools/units";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Convert length, mass, temperature, data, and time units.
 */
export function UnitConverter(_props: ToolComponentProps) {
  const categories = getUnitCategories();
  const [category, setCategory] = useState<UnitCategory>("length");
  const units = getUnits(category);
  const [from, setFrom] = useState(units[0]!.id);
  const [to, setTo] = useState(units[1]?.id ?? units[0]!.id);
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const n = Number(value);
    if (!Number.isFinite(n)) return { ok: false as const, error: "Enter a number." };
    try {
      const out = convertUnit(n, category, from, to);
      return { ok: true as const, value: formatUnitValue(out) };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Conversion failed.",
      };
    }
  }, [category, from, to, value]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Unit category">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setCategory(c.id);
              const next = getUnits(c.id);
              setFrom(next[0]!.id);
              setTo(next[1]?.id ?? next[0]!.id);
            }}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              category === c.id
                ? "border-border bg-muted font-medium"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={category === c.id}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="unit-from-val">From</Label>
          <Input
            id="unit-from-val"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="font-mono"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm"
            aria-label="From unit"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="mb-0 sm:mb-8"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          aria-label="Swap units"
        >
          <ArrowLeftRight className="size-4" />
        </Button>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>To</Label>
            {result.ok && <CopyButton value={result.value} label="Copy result" />}
          </div>
          <Input
            readOnly
            value={result.ok ? result.value : ""}
            className="font-mono"
            placeholder="—"
          />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm"
            aria-label="To unit"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!result.ok && (
        <p className="text-sm text-destructive">{result.error}</p>
      )}
    </div>
  );
}

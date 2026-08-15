"use client";

import { useMemo, useState } from "react";
import { Cake } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateAge, todayIso } from "@/lib/tools/age-calc";
import type { ToolComponentProps } from "@/types";

export function AgeCalculator(_props: ToolComponentProps) {
  const [birth, setBirth] = useState("2000-01-15");
  const [asOf, setAsOf] = useState(todayIso());

  const result = useMemo(() => {
    try {
      return { ok: true as const, data: calculateAge(birth, asOf) };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Invalid dates.",
      };
    }
  }, [asOf, birth]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="birth">Date of birth</Label>
          <Input
            id="birth"
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="asof">As of</Label>
          <Input
            id="asof"
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
          />
        </div>
      </div>

      {result.ok ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Years" value={String(result.data.years)} />
          <Stat label="Months" value={String(result.data.months)} />
          <Stat label="Days" value={String(result.data.days)} />
          <Stat label="Total days" value={result.data.totalDays.toLocaleString()} />
          <Stat label="Total months" value={result.data.totalMonths.toLocaleString()} />
          <Stat
            label="Next birthday"
            value={`${result.data.nextBirthdayInDays} days`}
            hint={result.data.nextBirthdayDate}
          />
        </div>
      ) : (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {result.error}
        </p>
      )}

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Cake className="size-3.5" aria-hidden />
        Calculated locally — nothing is stored or uploaded.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

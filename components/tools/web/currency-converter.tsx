"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, ArrowLeftRight, RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CURRENCY_CODES,
  convertCurrency,
  fetchFxRates,
  type CurrencyCode,
  type FxRates,
} from "@/lib/tools/currency";
import type { ToolComponentProps } from "@/types";

/**
 * Convert currencies using ECB rates via Frankfurter API.
 */
export function CurrencyConverter(_props: ToolComponentProps) {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("EUR");
  const [rates, setRates] = useState<FxRates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  // Fetch in effect; setState only inside async callbacks (not sync in effect body).
  useEffect(() => {
    let cancelled = false;
    fetchFxRates(from).then(
      (data) => {
        if (cancelled) return;
        setRates(data);
        setError(null);
        setBusy(false);
      },
      (err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load rates.");
        setRates(null);
        setBusy(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [from]);

  const changeFrom = useCallback((code: CurrencyCode) => {
    setBusy(true);
    setError(null);
    setFrom(code);
  }, []);

  const refresh = useCallback(() => {
    setBusy(true);
    setError(null);
    fetchFxRates(from).then(
      (data) => {
        setRates(data);
        setError(null);
        setBusy(false);
      },
      (err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load rates.");
        setRates(null);
        setBusy(false);
      }
    );
  }, [from]);

  let result = "";
  let resultError: string | null = null;
  if (rates) {
    try {
      const n = Number(amount);
      const converted = convertCurrency(n, from, to, rates);
      result = converted.toLocaleString(undefined, {
        maximumFractionDigits: 6,
      });
    } catch (err) {
      resultError = err instanceof Error ? err.message : "Conversion failed.";
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={refresh}
          disabled={busy}
          className="gap-1.5"
        >
          <RefreshCw className={`size-4 ${busy ? "animate-spin" : ""}`} />
          Refresh rates
        </Button>
        {rates && (
          <span className="text-xs text-muted-foreground">
            ECB rates · {rates.date} · base {rates.base}
          </span>
        )}
        {busy && !rates && (
          <span className="text-xs text-muted-foreground">Loading rates…</span>
        )}
      </div>

      {(error || resultError) && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error || resultError}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="fx-amount">Amount</Label>
          <Input
            id="fx-amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-mono"
          />
          <select
            value={from}
            onChange={(e) => changeFrom(e.target.value as CurrencyCode)}
            className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm"
            aria-label="From currency"
          >
            {CURRENCY_CODES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="sm:mb-8"
          onClick={() => {
            const nextFrom = to;
            const nextTo = from;
            setTo(nextTo);
            changeFrom(nextFrom);
          }}
          aria-label="Swap currencies"
        >
          <ArrowLeftRight className="size-4" />
        </Button>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Converted</Label>
            <CopyButton value={result} label="Copy amount" disabled={!result} />
          </div>
          <Input readOnly value={result} className="font-mono" placeholder="—" />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as CurrencyCode)}
            className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm"
            aria-label="To currency"
          >
            {CURRENCY_CODES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { AlertCircle, Eraser, Hash, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HASH_ALGOS, hashAll, type HashAlgo } from "@/lib/tools/hash";
import type { ToolComponentProps } from "@/types";

/**
 * Hash text with MD5 and SHA family algorithms (browser-local).
 */
export function HashGenerator(_props: ToolComponentProps) {
  const inputId = useId();
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Partial<Record<HashAlgo, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const run = useCallback(async (text: string) => {
    if (!text) {
      setHashes({});
      setError(null);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      setHashes(await hashAll(text));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hashing failed.");
      setHashes({});
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => void run(input), 150);
    return () => clearTimeout(t);
  }, [input, run]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setInput("DevKit — developer tools that just work")}
          className="gap-1.5"
        >
          <Sparkles className="size-4" />
          Sample
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput("");
            setHashes({});
            setError(null);
          }}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
        {busy && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Hash className="size-3.5 animate-pulse" />
            Hashing…
          </span>
        )}
      </div>

      {error && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={inputId}>Input</Label>
        <Textarea
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to hash"
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      <div className="space-y-3">
        {HASH_ALGOS.map(({ value, label }) => (
          <div key={value} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-xs text-muted-foreground">{label}</Label>
              <CopyButton
                value={hashes[value] ?? ""}
                label={`Copy ${label}`}
                disabled={!hashes[value]}
              />
            </div>
            <code className="block break-all rounded-lg border border-border/60 bg-muted/20 px-3 py-2 font-mono text-xs">
              {hashes[value] || "—"}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

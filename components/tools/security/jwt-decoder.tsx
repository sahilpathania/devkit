"use client";

import { useCallback, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Eraser,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import {
  JWT_SAMPLE,
  decodeJwt,
  type JwtDecodeResult,
} from "@/lib/tools/jwt";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * JWT Decoder — inspect header and payload locally (no signature verification).
 */
export function JwtDecoder(_props: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<JwtDecodeResult | null>(null);

  const handleDecode = useCallback(() => {
    setResult(decodeJwt(input));
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult(null);
  }, []);

  const handleSample = useCallback(() => {
    setInput(JWT_SAMPLE);
    setResult(null);
  }, []);

  useKeyboardShortcut(handleDecode, { key: "Enter", modifier: "meta" });

  const hasError = result !== null && !result.success;
  const isSuccess = result !== null && result.success;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={handleDecode} className="gap-1.5">
          <KeyRound className="size-4" />
          Decode
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
          onClick={handleClear}
          disabled={!input}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
      </div>

      <div
        role="note"
        className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-amber-800 dark:text-amber-200"
      >
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <span>
          Tokens are decoded locally. Signature is <strong>not</strong> verified — never paste
          production secrets into any online tool.
        </span>
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
              : `Decoded JWT${
                  typeof result.header.alg === "string" ? ` · alg ${result.header.alg}` : ""
                }`}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="jwt-input" className="text-sm font-medium">
            Token
          </Label>
          <CopyButton value={input} label="Copy token" disabled={!input} />
        </div>
        <Textarea
          id="jwt-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setResult(null);
          }}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          spellCheck={false}
          className={cn(
            "min-h-[120px] resize-y rounded-xl border-border/60 bg-muted/20 font-mono text-sm leading-relaxed",
            hasError && "border-destructive/50 focus-visible:ring-destructive/30"
          )}
          aria-invalid={hasError}
        />
      </div>

      {isSuccess && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="jwt-header" className="text-sm font-medium">
                Header
              </Label>
              <CopyButton value={result.headerJson} label="Copy header" />
            </div>
            <Textarea
              id="jwt-header"
              value={result.headerJson}
              readOnly
              spellCheck={false}
              className="min-h-[180px] resize-y rounded-xl border-border/60 bg-muted/30 font-mono text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="jwt-payload" className="text-sm font-medium">
                Payload
              </Label>
              <CopyButton value={result.payloadJson} label="Copy payload" />
            </div>
            <Textarea
              id="jwt-payload"
              value={result.payloadJson}
              readOnly
              spellCheck={false}
              className="min-h-[180px] resize-y rounded-xl border-border/60 bg-muted/30 font-mono text-sm leading-relaxed"
            />
          </div>

          {result.claims.length > 0 && (
            <div className="space-y-2 lg:col-span-2">
              <h3 className="text-sm font-medium">Common claims</h3>
              <ul className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60">
                {result.claims.map((claim) => (
                  <li
                    key={claim.key}
                    className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <code className="text-sm font-medium">{claim.key}</code>
                    <div className="text-sm text-muted-foreground sm:text-right">
                      <div className="break-all font-mono text-foreground">{claim.value}</div>
                      {claim.hint && (
                        <div className="text-xs text-muted-foreground">{claim.hint}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2 lg:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="jwt-signature" className="text-sm font-medium">
                Signature (unverified)
              </Label>
              <CopyButton value={result.signature} label="Copy signature" />
            </div>
            <Textarea
              id="jwt-signature"
              value={result.signature}
              readOnly
              spellCheck={false}
              className="min-h-[80px] resize-y rounded-xl border-border/60 bg-muted/30 font-mono text-xs leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
}

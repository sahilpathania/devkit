"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Eraser, Regex, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  REGEX_SAMPLE_PATTERN,
  REGEX_SAMPLE_TEXT,
  highlightSegments,
  testRegex,
} from "@/lib/tools/regex";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const FLAG_OPTIONS = [
  { key: "g", label: "g", title: "Global" },
  { key: "i", label: "i", title: "Ignore case" },
  { key: "m", label: "m", title: "Multiline" },
  { key: "s", label: "s", title: "Dotall" },
  { key: "u", label: "u", title: "Unicode" },
] as const;

/**
 * Live JavaScript regex tester with match highlighting and groups.
 */
export function RegexTester(_props: ToolComponentProps) {
  const [pattern, setPattern] = useState(REGEX_SAMPLE_PATTERN);
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState(REGEX_SAMPLE_TEXT);

  const result = useMemo(() => testRegex(pattern, flags, text), [pattern, flags, text]);
  const segments =
    result.success ? highlightSegments(text, result.matches) : [{ text, hit: false }];

  function toggleFlag(key: string) {
    setFlags((prev) => (prev.includes(key) ? prev.replace(key, "") : `${prev}${key}`));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Regex className="size-3.5" />
          Live match · ECMAScript
        </span>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setPattern(REGEX_SAMPLE_PATTERN);
            setFlags("gi");
            setText(REGEX_SAMPLE_TEXT);
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
            setPattern("");
            setText("");
            setFlags("g");
          }}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="regex-pattern">Pattern</Label>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g. \\d+"
            className="font-mono"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <Label>Flags</Label>
          <div className="flex gap-1">
            {FLAG_OPTIONS.map((f) => (
              <button
                key={f.key}
                type="button"
                title={f.title}
                onClick={() => toggleFlag(f.key)}
                className={cn(
                  "size-8 rounded-md border font-mono text-xs transition-colors",
                  flags.includes(f.key)
                    ? "border-border bg-muted font-medium"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={flags.includes(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!result.success && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{result.error}</span>
        </div>
      )}

      {result.success && (
        <p className="text-sm text-muted-foreground">
          {result.matches.length} match{result.matches.length === 1 ? "" : "es"}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="regex-text">Test string</Label>
          <Textarea
            id="regex-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[220px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <Label>Highlight</Label>
          <div className="min-h-[220px] whitespace-pre-wrap break-words rounded-xl border border-border/60 bg-muted/20 p-3 font-mono text-sm leading-relaxed">
            {segments.map((seg, i) =>
              seg.hit ? (
                <mark
                  key={i}
                  className="rounded-sm bg-teal-500/30 px-0.5 text-foreground"
                >
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </div>
        </div>
      </div>

      {result.success && result.matches.length > 0 && (
        <div className="space-y-2">
          <Label>Matches</Label>
          <div className="max-h-64 space-y-2 overflow-auto">
            {result.matches.map((m, i) => (
              <div
                key={`${m.index}-${i}`}
                className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 font-mono text-xs"
              >
                <div>
                  <span className="text-muted-foreground">#{i + 1}</span>{" "}
                  <span className="font-medium">{JSON.stringify(m.match)}</span>{" "}
                  <span className="text-muted-foreground">@ {m.index}</span>
                </div>
                {m.groups.length > 0 && (
                  <div className="mt-1 text-muted-foreground">
                    groups: {m.groups.map((g, gi) => `$${gi + 1}=${JSON.stringify(g)}`).join(", ")}
                  </div>
                )}
                {m.named && (
                  <div className="mt-1 text-muted-foreground">
                    named:{" "}
                    {Object.entries(m.named)
                      .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
                      .join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

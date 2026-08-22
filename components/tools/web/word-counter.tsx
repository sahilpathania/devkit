"use client";

import { useMemo, useState } from "react";
import { Eraser, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { analyzeText } from "@/lib/tools/text";
import type { ToolComponentProps } from "@/types";

const SAMPLE =
  "ToolBay is a collection of free developer tools that run in your browser. Format JSON, convert data, and ship faster.";

/**
 * Word, character, sentence, and reading-time stats.
 */
export function WordCounter(_props: ToolComponentProps) {
  const [input, setInput] = useState("");
  const stats = useMemo(() => analyzeText(input), [input]);

  const cards = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Chars (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Lines", value: stats.lines },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time", value: `${stats.readingMinutes} min` },
  ];

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
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border/60 bg-muted/20 px-3 py-3"
          >
            <div className="text-xs text-muted-foreground">{card.label}</div>
            <div className="mt-1 font-mono text-lg font-medium tabular-nums">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="word-count-input">Text</Label>
        <Textarea
          id="word-count-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type text…"
          className="min-h-[240px]"
        />
      </div>
    </div>
  );
}

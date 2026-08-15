"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertCircle,
  Eraser,
  Pause,
  Play,
  Sparkles,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ToolComponentProps } from "@/types";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SAMPLE_LOTTIE = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "DevKit Pulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [60, 60, 100], e: [100, 100, 100] },
            { t: 30, s: [100, 100, 100], e: [60, 60, 100] },
            { t: 60, s: [60, 60, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [80, 80] },
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.051, 0.58, 0.533, 1] },
          o: { a: 0, k: 100 },
          r: 1,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

type ParseState =
  | { ok: true; data: object }
  | { ok: false; error: string };

/**
 * Preview Lottie JSON animations with play/pause and speed controls.
 */
export function LottieViewer(_props: ToolComponentProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const lottieRef = useRef<{
    play: () => void;
    pause: () => void;
    setSpeed: (n: number) => void;
  } | null>(null);
  const [jsonText, setJsonText] = useState(() => JSON.stringify(SAMPLE_LOTTIE, null, 2));
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);

  const parsed: ParseState = useMemo(() => {
    const trimmed = jsonText.trim();
    if (!trimmed) return { ok: false, error: "Paste Lottie JSON to preview." };
    try {
      const data = JSON.parse(trimmed) as unknown;
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return { ok: false, error: "Lottie JSON must be an object." };
      }
      return { ok: true, data: data as object };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Invalid JSON.",
      };
    }
  }, [jsonText]);

  const onFile = useCallback(async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    setJsonText(text);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          onClick={() => {
            if (!lottieRef.current) return;
            if (playing) {
              lottieRef.current.pause();
              setPlaying(false);
            } else {
              lottieRef.current.play();
              setPlaying(true);
            }
          }}
          className="gap-1.5"
          disabled={!parsed.ok}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          {playing ? "Pause" : "Play"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setJsonText(JSON.stringify(SAMPLE_LOTTIE, null, 2));
            setPlaying(true);
            setSpeed(1);
            setLoop(true);
          }}
          className="gap-1.5"
        >
          <Sparkles className="size-4" />
          Sample
        </Button>
        <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <Upload className="size-4" />
          Upload JSON
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setJsonText("")}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="space-y-1">
          <Label htmlFor="lottie-speed">Speed ({speed.toFixed(1)}x)</Label>
          <input
            id="lottie-speed"
            type="range"
            min={0.25}
            max={3}
            step={0.25}
            value={speed}
            onChange={(e) => {
              const next = Number(e.target.value);
              setSpeed(next);
              lottieRef.current?.setSpeed(next);
            }}
            className="w-40 accent-teal-600"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
          />
          Loop
        </label>
      </div>

      {!parsed.ok && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{parsed.error}</span>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lottie-json">Lottie JSON</Label>
          <Textarea
            id="lottie-json"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="min-h-[320px] font-mono text-xs"
            spellCheck={false}
          />
        </div>
        <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-border/60 bg-muted/20 p-4">
          {parsed.ok ? (
            <Lottie
              lottieRef={lottieRef as never}
              animationData={parsed.data}
              loop={loop}
              autoplay
              style={{ width: 240, height: 240 }}
              onDOMLoaded={() => lottieRef.current?.setSpeed(speed)}
            />
          ) : (
            <p className="text-sm text-muted-foreground">Paste valid Lottie JSON to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useId, useState } from "react";
import { AlertCircle, Eraser, Palette, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  cmykToRgb,
  fromHex,
  fromRgb,
  hslToRgb,
  hsvToRgb,
  type ColorModel,
} from "@/lib/tools/color";
import type { ToolComponentProps } from "@/types";

const SAMPLE = "#0d9488";

/**
 * Live HEX / RGB / HSL / HSV / CMYK color converter.
 */
export function ColorConverter(_props: ToolComponentProps) {
  const [model, setModel] = useState<ColorModel>(() => fromHex(SAMPLE)!);
  const [error, setError] = useState<string | null>(null);
  const hexId = useId();

  const applyRgb = useCallback((r: number, g: number, b: number) => {
    setModel(fromRgb({ r, g, b }));
    setError(null);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setModel(fromHex(SAMPLE)!);
            setError(null);
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
            setModel(fromHex("#000000")!);
            setError(null);
          }}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Reset
        </Button>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Palette className="size-3.5" />
          Edit any field
        </span>
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

      <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <Field
            id={hexId}
            label="HEX"
            value={model.hex}
            onChange={(v) => {
              const next = fromHex(v);
              if (!next) {
                setError("Enter a valid HEX color.");
                return;
              }
              setModel(next);
              setError(null);
            }}
          />
          <Triple
            label="RGB"
            values={[model.rgb.r, model.rgb.g, model.rgb.b]}
            labels={["R", "G", "B"]}
            onChange={(vals) => applyRgb(vals[0]!, vals[1]!, vals[2]!)}
          />
          <Triple
            label="HSL"
            values={[model.hsl.h, model.hsl.s, model.hsl.l]}
            labels={["H", "S", "L"]}
            onChange={(vals) => {
              const rgb = hslToRgb(vals[0]!, vals[1]!, vals[2]!);
              applyRgb(rgb.r, rgb.g, rgb.b);
            }}
          />
          <Triple
            label="HSV"
            values={[model.hsv.h, model.hsv.s, model.hsv.v]}
            labels={["H", "S", "V"]}
            onChange={(vals) => {
              const rgb = hsvToRgb(vals[0]!, vals[1]!, vals[2]!);
              applyRgb(rgb.r, rgb.g, rgb.b);
            }}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CMYK</Label>
              <CopyButton
                value={`${model.cmyk.c}, ${model.cmyk.m}, ${model.cmyk.y}, ${model.cmyk.k}`}
                label="Copy CMYK"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(["c", "m", "y", "k"] as const).map((key, i) => (
                <Input
                  key={key}
                  aria-label={key.toUpperCase()}
                  inputMode="numeric"
                  value={model.cmyk[key]}
                  onChange={(e) => {
                    const next = { ...model.cmyk, [key]: Number(e.target.value) };
                    const vals = [next.c, next.m, next.y, next.k];
                    if (vals.some((n) => !Number.isFinite(n))) return;
                    const rgb = cmykToRgb(next.c, next.m, next.y, next.k);
                    applyRgb(rgb.r, rgb.g, rgb.b);
                  }}
                  className="font-mono"
                  placeholder={["C", "M", "Y", "K"][i]}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:pt-6">
          <div
            className="size-28 rounded-2xl border border-border/60 shadow-inner"
            style={{ backgroundColor: model.hex }}
            aria-label={`Preview ${model.hex}`}
          />
          <code className="text-xs text-muted-foreground">{model.hex}</code>
          <code className="text-xs text-muted-foreground">
            rgb({model.rgb.r}, {model.rgb.g}, {model.rgb.b})
          </code>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <CopyButton value={value} label={`Copy ${label}`} />
      </div>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono"
      />
    </div>
  );
}

function Triple({
  label,
  values,
  labels,
  onChange,
}: {
  label: string;
  values: number[];
  labels: string[];
  onChange: (vals: number[]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <CopyButton value={values.join(", ")} label={`Copy ${label}`} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {values.map((v, i) => (
          <Input
            key={labels[i]}
            aria-label={labels[i]}
            inputMode="numeric"
            value={v}
            onChange={(e) => {
              const next = [...values];
              next[i] = Number(e.target.value);
              if (next.every((n) => Number.isFinite(n))) onChange(next);
            }}
            className="font-mono"
            placeholder={labels[i]}
          />
        ))}
      </div>
    </div>
  );
}

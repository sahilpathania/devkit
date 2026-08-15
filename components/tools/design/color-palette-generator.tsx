"use client";

import { useMemo, useState } from "react";
import { Eraser, Palette, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { complementary, fromHex, generatePalette } from "@/lib/tools/color";
import type { ToolComponentProps } from "@/types";

/**
 * Generate shade scales and complementary colors from a base HEX.
 */
export function ColorPaletteGenerator(_props: ToolComponentProps) {
  const [hex, setHex] = useState("#0d9488");
  const palette = useMemo(() => generatePalette(hex), [hex]);
  const complement = useMemo(() => complementary(hex), [hex]);
  const valid = Boolean(fromHex(hex));

  const cssVars = palette
    ? palette.map((s) => `  --color-${s.name}: ${s.hex};`).join("\n")
    : "";
  const json = palette ? JSON.stringify(Object.fromEntries(palette.map((s) => [s.name, s.hex])), null, 2) : "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setHex("#0d9488")}
          className="gap-1.5"
        >
          <Sparkles className="size-4" />
          Sample
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setHex("#000000")}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <Label htmlFor="palette-hex">Base color</Label>
          <div className="flex gap-2">
            <Input
              id="palette-hex"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-36 font-mono"
            />
            <input
              type="color"
              value={valid ? (fromHex(hex)?.hex ?? "#000000") : "#000000"}
              onChange={(e) => setHex(e.target.value)}
              className="size-9 cursor-pointer rounded-lg border border-border/60 bg-transparent p-0.5"
              aria-label="Pick color"
            />
          </div>
        </div>
        {complement && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Complement</span>
            <span
              className="size-8 rounded-lg border border-border/60"
              style={{ backgroundColor: complement }}
            />
            <code className="font-mono text-xs">{complement}</code>
            <CopyButton value={complement} label="Copy complement" />
          </div>
        )}
      </div>

      {!valid && (
        <p className="text-sm text-destructive">Enter a valid HEX color.</p>
      )}

      {palette && (
        <>
          <div className="flex flex-wrap gap-2">
            {palette.map((swatch) => (
              <div key={swatch.name} className="flex w-16 flex-col items-center gap-1">
                <div
                  className="size-14 rounded-xl border border-border/60"
                  style={{ backgroundColor: swatch.hex }}
                  title={swatch.hex}
                />
                <code className="text-[10px] text-muted-foreground">{swatch.name}</code>
                <code className="text-[10px] font-mono">{swatch.hex}</code>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5">
                  <Palette className="size-3.5" />
                  CSS variables
                </Label>
                <CopyButton value={`:root {\n${cssVars}\n}`} label="Copy CSS" />
              </div>
              <pre className="overflow-auto rounded-xl border border-border/60 bg-muted/20 p-3 font-mono text-xs">
                {`:root {\n${cssVars}\n}`}
              </pre>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>JSON tokens</Label>
                <CopyButton value={json} label="Copy JSON" />
              </div>
              <pre className="overflow-auto rounded-xl border border-border/60 bg-muted/20 p-3 font-mono text-xs">
                {json}
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

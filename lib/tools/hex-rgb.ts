export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export type HexRgbResult =
  | { success: true; hex: string; rgb: RgbColor; rgbCss: string }
  | { success: false; error: string };

function clampByte(n: number): number {
  return Math.min(255, Math.max(0, Math.round(n)));
}

export function hexToRgb(input: string): HexRgbResult {
  const raw = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) {
    return { success: false, error: "Enter a valid HEX color (#RGB or #RRGGBB)." };
  }

  const hex =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const normalized = `#${hex.toLowerCase()}`;

  return {
    success: true,
    hex: normalized,
    rgb: { r, g, b },
    rgbCss: `rgb(${r}, ${g}, ${b})`,
  };
}

export function rgbToHex(r: number, g: number, b: number): HexRgbResult {
  if (![r, g, b].every((n) => Number.isFinite(n))) {
    return { success: false, error: "RGB values must be numbers." };
  }

  const rr = clampByte(r);
  const gg = clampByte(g);
  const bb = clampByte(b);
  const hex = `#${[rr, gg, bb]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")}`;

  return {
    success: true,
    hex,
    rgb: { r: rr, g: gg, b: bb },
    rgbCss: `rgb(${rr}, ${gg}, ${bb})`,
  };
}

export function parseRgbString(input: string): { r: number; g: number; b: number } | null {
  const trimmed = input.trim();
  const css = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i.exec(trimmed);
  if (css) {
    return { r: Number(css[1]), g: Number(css[2]), b: Number(css[3]) };
  }
  const parts = trimmed.split(/[\s,]+/).filter(Boolean);
  if (parts.length === 3 && parts.every((p) => /^-?\d+(\.\d+)?$/.test(p))) {
    return { r: Number(parts[0]), g: Number(parts[1]), b: Number(parts[2]) };
  }
  return null;
}

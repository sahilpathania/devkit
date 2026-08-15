import { hexToRgb, rgbToHex, type RgbColor } from "@/lib/tools/hex-rgb";

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface CmykColor {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColorModel {
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  hsv: HsvColor;
  cmyk: CmykColor;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

export function rgbToHsl(r: number, g: number, b: number): HslColor {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rr:
        h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6;
        break;
      case gg:
        h = ((bb - rr) / d + 2) / 6;
        break;
      default:
        h = ((rr - gg) / d + 4) / 6;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h: number, s: number, l: number): RgbColor {
  const hh = ((h % 360) + 360) % 360 / 360;
  const ss = clamp01(s / 100);
  const ll = clamp01(l / 100);
  if (ss === 0) {
    const v = Math.round(ll * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
  const p = 2 * ll - q;
  return {
    r: Math.round(hue2rgb(p, q, hh + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hh) * 255),
    b: Math.round(hue2rgb(p, q, hh - 1 / 3) * 255),
  };
}

export function rgbToHsv(r: number, g: number, b: number): HsvColor {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case rr:
        h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6;
        break;
      case gg:
        h = ((bb - rr) / d + 2) / 6;
        break;
      default:
        h = ((rr - gg) / d + 4) / 6;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export function hsvToRgb(h: number, s: number, v: number): RgbColor {
  const hh = (((h % 360) + 360) % 360) / 60;
  const ss = clamp01(s / 100);
  const vv = clamp01(v / 100);
  const c = vv * ss;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = vv - c;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hh >= 0 && hh < 1) [rp, gp, bp] = [c, x, 0];
  else if (hh < 2) [rp, gp, bp] = [x, c, 0];
  else if (hh < 3) [rp, gp, bp] = [0, c, x];
  else if (hh < 4) [rp, gp, bp] = [0, x, c];
  else if (hh < 5) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

export function rgbToCmyk(r: number, g: number, b: number): CmykColor {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rr - k) / (1 - k)) * 100),
    m: Math.round(((1 - gg - k) / (1 - k)) * 100),
    y: Math.round(((1 - bb - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

export function cmykToRgb(c: number, m: number, y: number, k: number): RgbColor {
  const cc = clamp01(c / 100);
  const mm = clamp01(m / 100);
  const yy = clamp01(y / 100);
  const kk = clamp01(k / 100);
  return {
    r: Math.round(255 * (1 - cc) * (1 - kk)),
    g: Math.round(255 * (1 - mm) * (1 - kk)),
    b: Math.round(255 * (1 - yy) * (1 - kk)),
  };
}

export function fromRgb(rgb: RgbColor): ColorModel {
  const hexResult = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hex = hexResult.success ? hexResult.hex : "#000000";
  return {
    hex,
    rgb,
    hsl: rgbToHsl(rgb.r, rgb.g, rgb.b),
    hsv: rgbToHsv(rgb.r, rgb.g, rgb.b),
    cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
  };
}

export function fromHex(input: string): ColorModel | null {
  const result = hexToRgb(input);
  if (!result.success) return null;
  return fromRgb(result.rgb);
}

export function generatePalette(hex: string): { name: string; hex: string }[] | null {
  const base = fromHex(hex);
  if (!base) return null;
  const { h, s } = base.hsl;
  const steps = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  return steps.map((l) => {
    const rgb = hslToRgb(h, s, l);
    const model = fromRgb(rgb);
    return { name: `${l}`, hex: model.hex };
  });
}

export function complementary(hex: string): string | null {
  const base = fromHex(hex);
  if (!base) return null;
  return fromRgb(hslToRgb((base.hsl.h + 180) % 360, base.hsl.s, base.hsl.l)).hex;
}

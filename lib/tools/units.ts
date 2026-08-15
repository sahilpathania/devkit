export type UnitCategory = "length" | "mass" | "temperature" | "data" | "time";

interface UnitDef {
  id: string;
  label: string;
  /** Multiply by this to get base unit (except temperature). */
  toBase: number;
}

const CATEGORIES: Record<
  UnitCategory,
  { label: string; base: string; units: UnitDef[] }
> = {
  length: {
    label: "Length",
    base: "m",
    units: [
      { id: "m", label: "Meters (m)", toBase: 1 },
      { id: "km", label: "Kilometers (km)", toBase: 1000 },
      { id: "cm", label: "Centimeters (cm)", toBase: 0.01 },
      { id: "mm", label: "Millimeters (mm)", toBase: 0.001 },
      { id: "mi", label: "Miles (mi)", toBase: 1609.344 },
      { id: "yd", label: "Yards (yd)", toBase: 0.9144 },
      { id: "ft", label: "Feet (ft)", toBase: 0.3048 },
      { id: "in", label: "Inches (in)", toBase: 0.0254 },
    ],
  },
  mass: {
    label: "Mass",
    base: "kg",
    units: [
      { id: "kg", label: "Kilograms (kg)", toBase: 1 },
      { id: "g", label: "Grams (g)", toBase: 0.001 },
      { id: "mg", label: "Milligrams (mg)", toBase: 0.000001 },
      { id: "lb", label: "Pounds (lb)", toBase: 0.45359237 },
      { id: "oz", label: "Ounces (oz)", toBase: 0.028349523125 },
      { id: "t", label: "Metric tons (t)", toBase: 1000 },
    ],
  },
  temperature: {
    label: "Temperature",
    base: "C",
    units: [
      { id: "C", label: "Celsius (°C)", toBase: 1 },
      { id: "F", label: "Fahrenheit (°F)", toBase: 1 },
      { id: "K", label: "Kelvin (K)", toBase: 1 },
    ],
  },
  data: {
    label: "Data",
    base: "byte",
    units: [
      { id: "bit", label: "Bits", toBase: 0.125 },
      { id: "byte", label: "Bytes", toBase: 1 },
      { id: "KB", label: "Kilobytes (KB)", toBase: 1024 },
      { id: "MB", label: "Megabytes (MB)", toBase: 1024 ** 2 },
      { id: "GB", label: "Gigabytes (GB)", toBase: 1024 ** 3 },
      { id: "TB", label: "Terabytes (TB)", toBase: 1024 ** 4 },
    ],
  },
  time: {
    label: "Time",
    base: "s",
    units: [
      { id: "ms", label: "Milliseconds", toBase: 0.001 },
      { id: "s", label: "Seconds", toBase: 1 },
      { id: "min", label: "Minutes", toBase: 60 },
      { id: "h", label: "Hours", toBase: 3600 },
      { id: "d", label: "Days", toBase: 86400 },
      { id: "wk", label: "Weeks", toBase: 604800 },
    ],
  },
};

export function getUnitCategories(): { id: UnitCategory; label: string }[] {
  return (Object.keys(CATEGORIES) as UnitCategory[]).map((id) => ({
    id,
    label: CATEGORIES[id].label,
  }));
}

export function getUnits(category: UnitCategory): UnitDef[] {
  return CATEGORIES[category].units;
}

function tempToCelsius(value: number, from: string): number {
  if (from === "C") return value;
  if (from === "F") return ((value - 32) * 5) / 9;
  if (from === "K") return value - 273.15;
  throw new Error("Unknown temperature unit");
}

function celsiusToTemp(value: number, to: string): number {
  if (to === "C") return value;
  if (to === "F") return (value * 9) / 5 + 32;
  if (to === "K") return value + 273.15;
  throw new Error("Unknown temperature unit");
}

export function convertUnit(
  value: number,
  category: UnitCategory,
  from: string,
  to: string
): number {
  if (!Number.isFinite(value)) throw new Error("Enter a valid number.");
  if (category === "temperature") {
    return celsiusToTemp(tempToCelsius(value, from), to);
  }
  const units = CATEGORIES[category].units;
  const fromUnit = units.find((u) => u.id === from);
  const toUnit = units.find((u) => u.id === to);
  if (!fromUnit || !toUnit) throw new Error("Unknown unit.");
  const base = value * fromUnit.toBase;
  return base / toUnit.toBase;
}

export function formatUnitValue(n: number): string {
  if (!Number.isFinite(n)) return "";
  if (Math.abs(n) >= 1e6 || (Math.abs(n) > 0 && Math.abs(n) < 1e-4)) {
    return n.toExponential(6);
  }
  const rounded = Number(n.toPrecision(12));
  return String(rounded);
}

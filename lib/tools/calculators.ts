export type PercentageMode =
  | "percent-of"
  | "is-what-percent"
  | "percent-change"
  | "increase-by"
  | "decrease-by";

export const PERCENTAGE_MODES: { value: PercentageMode; label: string }[] = [
  { value: "percent-of", label: "What is X% of Y?" },
  { value: "is-what-percent", label: "X is what % of Y?" },
  { value: "percent-change", label: "% change from X to Y" },
  { value: "increase-by", label: "Increase X by Y%" },
  { value: "decrease-by", label: "Decrease X by Y%" },
];

export function calculatePercentage(
  mode: PercentageMode,
  a: number,
  b: number
): { result: number; label: string } {
  if (![a, b].every((n) => Number.isFinite(n))) {
    throw new Error("Enter valid numbers.");
  }
  switch (mode) {
    case "percent-of":
      return { result: (a / 100) * b, label: `${a}% of ${b}` };
    case "is-what-percent":
      if (b === 0) throw new Error("Cannot divide by zero.");
      return { result: (a / b) * 100, label: `${a} is this % of ${b}` };
    case "percent-change":
      if (a === 0) throw new Error("Starting value cannot be zero.");
      return { result: ((b - a) / a) * 100, label: "Percent change" };
    case "increase-by":
      return { result: a * (1 + b / 100), label: `${a} increased by ${b}%` };
    case "decrease-by":
      return { result: a * (1 - b / 100), label: `${a} decreased by ${b}%` };
  }
}

export type NumberBase = 2 | 8 | 10 | 16;

export function convertNumberBase(
  input: string,
  from: NumberBase,
  to: NumberBase
): string {
  const cleaned = input.trim().replace(/\s+/g, "");
  if (!cleaned) throw new Error("Enter a number.");
  const normalized = cleaned.replace(/^0x/i, "");
  const value = Number.parseInt(normalized, from);
  if (!Number.isFinite(value)) throw new Error("Invalid number for the selected base.");
  if (to === 16) return value.toString(16).toUpperCase();
  return value.toString(to);
}

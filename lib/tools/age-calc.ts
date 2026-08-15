export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  nextBirthdayInDays: number;
  nextBirthdayDate: string;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parseDateInput(value: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!m) throw new Error("Use a valid date (YYYY-MM-DD).");
  const year = Number(m[1]);
  const month = Number(m[2]) - 1;
  const day = Number(m[3]);
  const d = new Date(year, month, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month ||
    d.getDate() !== day
  ) {
    throw new Error("That date does not exist.");
  }
  return startOfDay(d);
}

function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / 86_400_000);
}

/** Compute age between birth date and an “as of” date (default today). */
export function calculateAge(
  birthDateStr: string,
  asOfStr?: string
): AgeResult {
  const birth = parseDateInput(birthDateStr);
  const asOf = asOfStr ? parseDateInput(asOfStr) : startOfDay(new Date());

  if (birth > asOf) {
    throw new Error("Birth date cannot be in the future.");
  }

  let years = asOf.getFullYear() - birth.getFullYear();
  let months = asOf.getMonth() - birth.getMonth();
  let days = asOf.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = daysBetween(birth, asOf);
  const totalMonths = years * 12 + months;

  let next = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate());
  if (next <= asOf) {
    next = new Date(asOf.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  // Handle Feb 29 → Feb 28 in non-leap years
  if (birth.getMonth() === 1 && birth.getDate() === 29) {
    const y = next.getFullYear();
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    next = new Date(y, 1, isLeap ? 29 : 28);
    if (next <= asOf) {
      const y2 = y + 1;
      const leap2 = (y2 % 4 === 0 && y2 % 100 !== 0) || y2 % 400 === 0;
      next = new Date(y2, 1, leap2 ? 29 : 28);
    }
  }

  const nextBirthdayInDays = daysBetween(asOf, next);
  const nextBirthdayDate = next.toISOString().slice(0, 10);

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    nextBirthdayInDays,
    nextBirthdayDate,
  };
}

export function todayIso(): string {
  return startOfDay(new Date()).toISOString().slice(0, 10);
}

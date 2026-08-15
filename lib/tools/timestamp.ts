export type TimestampMode = "unix-to-date" | "date-to-unix";

export type TimestampUnit = "seconds" | "milliseconds";

export interface TimestampSuccess {
  success: true;
  iso: string;
  local: string;
  unixSeconds: number;
  unixMilliseconds: number;
  detectedUnit: TimestampUnit;
}

export interface TimestampError {
  success: false;
  error: string;
}

export type TimestampResult = TimestampSuccess | TimestampError;

function detectUnit(value: number): TimestampUnit {
  // 13+ digits ≈ milliseconds; 10 digits ≈ seconds
  return Math.abs(value) >= 1e12 ? "milliseconds" : "seconds";
}

export function unixToDate(input: string): TimestampResult {
  const trimmed = input.trim();
  if (!trimmed) return { success: false, error: "Enter a Unix timestamp." };

  const numeric = Number(trimmed);
  if (!Number.isFinite(numeric)) {
    return { success: false, error: "Timestamp must be a number." };
  }

  const unit = detectUnit(numeric);
  const ms = unit === "milliseconds" ? numeric : numeric * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    return { success: false, error: "Invalid timestamp value." };
  }

  return {
    success: true,
    iso: date.toISOString(),
    local: date.toString(),
    unixSeconds: Math.floor(date.getTime() / 1000),
    unixMilliseconds: date.getTime(),
    detectedUnit: unit,
  };
}

export function dateToUnix(input: string): TimestampResult {
  const trimmed = input.trim();
  if (!trimmed) return { success: false, error: "Enter a date/time string or ISO date." };

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) {
    return {
      success: false,
      error: "Could not parse date. Try ISO format like 2024-01-01T00:00:00.000Z",
    };
  }

  return {
    success: true,
    iso: date.toISOString(),
    local: date.toString(),
    unixSeconds: Math.floor(date.getTime() / 1000),
    unixMilliseconds: date.getTime(),
    detectedUnit: "milliseconds",
  };
}

export function convertTimestamp(input: string, mode: TimestampMode): TimestampResult {
  return mode === "unix-to-date" ? unixToDate(input) : dateToUnix(input);
}

export const TIMESTAMP_SAMPLE_UNIX = "1704067200";
export const TIMESTAMP_SAMPLE_ISO = "2024-01-01T00:00:00.000Z";

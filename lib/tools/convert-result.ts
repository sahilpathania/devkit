/** Shared result shape for bidirectional format converters. */
export type ConvertResult =
  | { success: true; output: string }
  | { success: false; error: string };

/**
 * Pure Base64 encode/decode helpers with UTF-8 support.
 */

export type Base64Mode = "encode" | "decode";

export interface Base64Success {
  success: true;
  output: string;
}

export interface Base64Error {
  success: false;
  error: string;
}

export type Base64Result = Base64Success | Base64Error;

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const normalized = base64.replace(/\s+/g, "");
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Encode UTF-8 text to standard Base64. */
export function encodeBase64(input: string): Base64Result {
  if (!input) {
    return { success: false, error: "Enter text to encode." };
  }

  try {
    const bytes = new TextEncoder().encode(input);
    return { success: true, output: bytesToBase64(bytes) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to encode";
    return { success: false, error: message };
  }
}

/** Decode standard Base64 (whitespace ignored) to UTF-8 text. */
export function decodeBase64(input: string): Base64Result {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: "Enter Base64 to decode." };
  }

  try {
    const bytes = base64ToBytes(trimmed);
    return { success: true, output: new TextDecoder().decode(bytes) };
  } catch {
    return {
      success: false,
      error: "Invalid Base64. Check padding and characters.",
    };
  }
}

export function processBase64(input: string, mode: Base64Mode): Base64Result {
  return mode === "encode" ? encodeBase64(input) : decodeBase64(input);
}

export const BASE64_SAMPLE_TEXT = "Hello, ToolBay!";
export const BASE64_SAMPLE_ENCODED = "SGVsbG8sIFRvb2xCYXkh";

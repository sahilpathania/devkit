/**
 * URL encode/decode helpers (encodeURIComponent / decodeURIComponent).
 */

export type UrlEncodingMode = "encode" | "decode";

export interface UrlEncodingSuccess {
  success: true;
  output: string;
}

export interface UrlEncodingError {
  success: false;
  error: string;
}

export type UrlEncodingResult = UrlEncodingSuccess | UrlEncodingError;

/** Encode text for use in query strings and path segments. */
export function encodeUrl(input: string): UrlEncodingResult {
  if (!input) {
    return { success: false, error: "Enter text to encode." };
  }

  try {
    return { success: true, output: encodeURIComponent(input) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to encode";
    return { success: false, error: message };
  }
}

/** Decode a percent-encoded string. */
export function decodeUrl(input: string): UrlEncodingResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: "Enter a URL-encoded string to decode." };
  }

  try {
    return { success: true, output: decodeURIComponent(trimmed.replace(/\+/g, " ")) };
  } catch {
    return {
      success: false,
      error: "Invalid percent-encoding. Check for incomplete % sequences.",
    };
  }
}

export function processUrlEncoding(
  input: string,
  mode: UrlEncodingMode
): UrlEncodingResult {
  return mode === "encode" ? encodeUrl(input) : decodeUrl(input);
}

export const URL_ENCODING_SAMPLE_TEXT = "Hello DevKit! query=a&b=c";
export const URL_ENCODING_SAMPLE_ENCODED =
  "Hello%20DevKit!%20query%3Da%26b%3Dc";

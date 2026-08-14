/**
 * Pure JWT decode helpers — no signature verification.
 * Decoding only; never trust unverified claims in production auth flows.
 */

export interface JwtDecodeSuccess {
  success: true;
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  headerJson: string;
  payloadJson: string;
  claims: JwtClaimSummary[];
}

export interface JwtDecodeError {
  success: false;
  error: string;
}

export type JwtDecodeResult = JwtDecodeSuccess | JwtDecodeError;

export interface JwtClaimSummary {
  key: string;
  value: string;
  hint?: string;
}

function base64UrlToBytes(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function decodeBase64UrlJson(segment: string): Record<string, unknown> {
  const bytes = base64UrlToBytes(segment);
  const json = new TextDecoder().decode(bytes);
  const parsed = JSON.parse(json) as unknown;
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("JWT segment must be a JSON object");
  }
  return parsed as Record<string, unknown>;
}

function formatUnixClaim(value: unknown): string | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const date = new Date(value * 1000);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function buildClaimSummary(payload: Record<string, unknown>): JwtClaimSummary[] {
  const keys = ["iss", "sub", "aud", "exp", "nbf", "iat", "jti"] as const;
  const summaries: JwtClaimSummary[] = [];

  for (const key of keys) {
    if (!(key in payload)) continue;
    const raw = payload[key];
    const value =
      typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean"
        ? String(raw)
        : JSON.stringify(raw);

    const hint =
      key === "exp" || key === "nbf" || key === "iat"
        ? formatUnixClaim(raw)
        : undefined;

    summaries.push({ key, value, hint });
  }

  return summaries;
}

/** Decode a JWT without verifying the signature. */
export function decodeJwt(token: string): JwtDecodeResult {
  const trimmed = token.trim();
  if (!trimmed) {
    return { success: false, error: "Paste a JWT to decode." };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3 || parts.some((part) => !part)) {
    return {
      success: false,
      error: "Invalid JWT format. Expected three Base64URL segments separated by dots.",
    };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  try {
    const header = decodeBase64UrlJson(headerPart);
    const payload = decodeBase64UrlJson(payloadPart);
    return {
      success: true,
      header,
      payload,
      signature: signaturePart,
      headerJson: JSON.stringify(header, null, 2),
      payloadJson: JSON.stringify(payload, null, 2),
      claims: buildClaimSummary(payload),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to decode JWT";
    return { success: false, error: message };
  }
}

export const JWT_SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldktpdCIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNzE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

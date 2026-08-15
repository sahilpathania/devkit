export type PasswordCharset = {
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
};

export const DEFAULT_CHARSET: PasswordCharset = {
  lower: true,
  upper: true,
  digits: true,
  symbols: true,
};

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*-_=+?.,",
} as const;

function randomIndex(max: number): number {
  if (max <= 0) return 0;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function pick(pool: string): string {
  return pool[randomIndex(pool.length)]!;
}

/** Cryptographically strong password using Web Crypto. */
export function generatePassword(
  length: number,
  charset: PasswordCharset = DEFAULT_CHARSET
): string {
  const len = Math.min(128, Math.max(4, Math.floor(length)));
  const pools: string[] = [];
  if (charset.lower) pools.push(SETS.lower);
  if (charset.upper) pools.push(SETS.upper);
  if (charset.digits) pools.push(SETS.digits);
  if (charset.symbols) pools.push(SETS.symbols);
  if (!pools.length) {
    throw new Error("Select at least one character set.");
  }

  const all = pools.join("");
  const chars: string[] = pools.map((p) => pick(p));
  while (chars.length < len) {
    chars.push(pick(all));
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j]!, chars[i]!];
  }

  return chars.join("");
}

export function estimateStrength(password: string): {
  label: "Weak" | "Fair" | "Strong" | "Excellent";
  score: number;
} {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { label: "Weak", score };
  if (score <= 3) return { label: "Fair", score };
  if (score <= 5) return { label: "Strong", score };
  return { label: "Excellent", score };
}

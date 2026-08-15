/**
 * Compact MD5 implementation for checksums (not password hashing).
 * RFC 1321 — validated against empty string and "abc" test vectors.
 */
export function md5(message: string): string {
  const bytes = utf8Bytes(message);
  const bitLen = bytes.length * 8;

  // Padding: 0x80 then zeros, then 64-bit length
  const withOne = bytes.length + 1;
  const paddedLen = ((withOne + 8 + 63) & ~63) || 64;
  const buffer = new Uint8Array(paddedLen);
  buffer.set(bytes);
  buffer[bytes.length] = 0x80;
  const view = new DataView(buffer.buffer);
  // length in bits as little-endian 64-bit (low 32 first)
  view.setUint32(paddedLen - 8, bitLen >>> 0, true);
  view.setUint32(paddedLen - 4, Math.floor(bitLen / 2 ** 32), true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
    9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
    16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
    15, 21,
  ];
  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(2 ** 32 * Math.abs(Math.sin(i + 1))) >>> 0;
  }

  const M = new Uint32Array(16);
  for (let offset = 0; offset < paddedLen; offset += 64) {
    for (let i = 0; i < 16; i++) {
      M[i] = view.getUint32(offset + i * 4, true);
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }

      F = (F + A + K[i]! + M[g]!) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, s[i]!)) >>> 0;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  return [a0, b0, c0, d0].map(toHexLE).join("");
}

function rotl(x: number, n: number): number {
  return ((x << n) | (x >>> (32 - n))) >>> 0;
}

function toHexLE(n: number): string {
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, "0");
  }
  return out;
}

function utf8Bytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export type HashAlgo = "md5" | "sha-1" | "sha-256" | "sha-384" | "sha-512";

export const HASH_ALGOS: { value: HashAlgo; label: string }[] = [
  { value: "md5", label: "MD5" },
  { value: "sha-1", label: "SHA-1" },
  { value: "sha-256", label: "SHA-256" },
  { value: "sha-384", label: "SHA-384" },
  { value: "sha-512", label: "SHA-512" },
];

export async function hashText(input: string, algo: HashAlgo): Promise<string> {
  if (algo === "md5") return md5(input);
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algo.toUpperCase() as AlgorithmIdentifier, data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashAll(input: string): Promise<Record<HashAlgo, string>> {
  const entries = await Promise.all(
    HASH_ALGOS.map(async ({ value }) => [value, await hashText(input, value)] as const)
  );
  return Object.fromEntries(entries) as Record<HashAlgo, string>;
}

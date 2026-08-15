/** Minimal MD5 for browser hashing (not for password storage). */
export function md5(message: string): string {
  const utf8 = unescape(encodeURIComponent(message));
  const msg: number[] = [];
  for (let i = 0; i < utf8.length; i++) msg[i >> 2] |= utf8.charCodeAt(i) << ((i % 4) * 8);
  const bitLen = utf8.length * 8;
  msg[bitLen >> 5] |= 0x80 << (bitLen % 32);
  msg[(((bitLen + 64) >>> 9) << 4) + 14] = bitLen;

  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < msg.length; i += 16) {
    const oa = a;
    const ob = b;
    const oc = c;
    const od = d;

    a = ff(a, b, c, d, msg[i + 0]!, 7, -680876936);
    d = ff(d, a, b, c, msg[i + 1]!, 12, -389564586);
    c = ff(c, d, a, b, msg[i + 2]!, 17, 606105819);
    b = ff(b, c, d, a, msg[i + 3]!, 22, -1044525330);
    a = ff(a, b, c, d, msg[i + 4]!, 7, -176418897);
    d = ff(d, a, b, c, msg[i + 5]!, 12, 1200080426);
    c = ff(c, d, a, b, msg[i + 6]!, 17, -1473231341);
    b = ff(b, c, d, a, msg[i + 7]!, 22, -45705983);
    a = ff(a, b, c, d, msg[i + 8]!, 7, 1770035416);
    d = ff(d, a, b, c, msg[i + 9]!, 12, -1958414417);
    c = ff(c, d, a, b, msg[i + 10]!, 17, -42063);
    b = ff(b, c, d, a, msg[i + 11]!, 22, -1990404162);
    a = ff(a, b, c, d, msg[i + 12]!, 7, 1804603682);
    d = ff(d, a, b, c, msg[i + 13]!, 12, -40341101);
    c = ff(c, d, a, b, msg[i + 14]!, 17, -1502002290);
    b = ff(b, c, d, a, msg[i + 15]!, 22, 1236535329);

    a = gg(a, b, c, d, msg[i + 1]!, 5, -165796510);
    d = gg(d, a, b, c, msg[i + 6]!, 9, -1069501632);
    c = gg(c, d, a, b, msg[i + 11]!, 14, 643717713);
    b = gg(b, c, d, a, msg[i + 0]!, 20, -373897302);
    a = gg(a, b, c, d, msg[i + 5]!, 5, -701558691);
    d = gg(d, a, b, c, msg[i + 10]!, 9, 38016083);
    c = gg(c, d, a, b, msg[i + 15]!, 14, -660478335);
    b = gg(b, c, d, a, msg[i + 4]!, 20, -405537848);
    a = gg(a, b, c, d, msg[i + 9]!, 5, 568446438);
    d = gg(d, a, b, c, msg[i + 14]!, 9, -1019803690);
    c = gg(c, d, a, b, msg[i + 3]!, 14, -187363961);
    b = gg(b, c, d, a, msg[i + 8]!, 20, 1163531501);
    a = gg(a, b, c, d, msg[i + 13]!, 5, -1444681467);
    d = gg(d, a, b, c, msg[i + 2]!, 9, -51403784);
    c = gg(c, d, a, b, msg[i + 7]!, 14, 1735328473);
    b = gg(b, c, d, a, msg[i + 12]!, 20, -1926607734);

    a = hh(a, b, c, d, msg[i + 5]!, 4, -378558);
    d = hh(d, a, b, c, msg[i + 8]!, 11, -2022574463);
    c = hh(c, d, a, b, msg[i + 11]!, 16, 1839030562);
    b = hh(b, c, d, a, msg[i + 14]!, 23, -35309556);
    a = hh(a, b, c, d, msg[i + 1]!, 4, -1530992060);
    d = hh(d, a, b, c, msg[i + 4]!, 11, 1272893353);
    c = hh(c, d, a, b, msg[i + 7]!, 16, -155497632);
    b = hh(b, c, d, a, msg[i + 10]!, 23, -1094730640);
    a = hh(a, b, c, d, msg[i + 13]!, 4, 681279174);
    d = hh(d, a, b, c, msg[i + 0]!, 11, -358537222);
    c = hh(c, d, a, b, msg[i + 3]!, 16, -722521979);
    b = hh(b, c, d, a, msg[i + 6]!, 23, 76029189);
    a = hh(a, b, c, d, msg[i + 9]!, 4, -640364487);
    d = hh(d, a, b, c, msg[i + 12]!, 11, -421815835);
    c = hh(c, d, a, b, msg[i + 15]!, 16, 530742520);
    b = hh(b, c, d, a, msg[i + 2]!, 23, -995338651);

    a = ii(a, b, c, d, msg[i + 0]!, 6, -198630844);
    d = ii(d, a, b, c, msg[i + 7]!, 10, 1126891415);
    c = ii(c, d, a, b, msg[i + 14]!, 15, -1416354905);
    b = ii(b, c, d, a, msg[i + 5]!, 21, -57434055);
    a = ii(a, b, c, d, msg[i + 12]!, 6, 1700485571);
    d = ii(d, a, b, c, msg[i + 3]!, 10, -1894986606);
    c = ii(c, d, a, b, msg[i + 10]!, 15, -1051523);
    b = ii(b, c, d, a, msg[i + 1]!, 21, -2054922799);
    a = ii(a, b, c, d, msg[i + 8]!, 6, 1873313359);
    d = ii(d, a, b, c, msg[i + 15]!, 10, -30611744);
    c = ii(c, d, a, b, msg[i + 6]!, 15, -1560198380);
    b = ii(b, c, d, a, msg[i + 13]!, 21, 1309151649);
    a = ii(a, b, c, d, msg[i + 4]!, 6, -145523070);
    d = ii(d, a, b, c, msg[i + 11]!, 10, -1120210379);
    c = ii(c, d, a, b, msg[i + 2]!, 15, 718787259);
    b = ii(b, c, d, a, msg[i + 9]!, 21, -343485551);

    a = (a + oa) | 0;
    b = (b + ob) | 0;
    c = (c + oc) | 0;
    d = (d + od) | 0;
  }

  return [a, b, c, d].map(toHex).join("");
}

function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
  a = (a + q + x + t) | 0;
  return (((a << s) | (a >>> (32 - s))) + b) | 0;
}
function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}
function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}
function toHex(n: number): string {
  let s = "";
  for (let i = 0; i < 4; i++) s += ((n >> (i * 8)) & 0xff).toString(16).padStart(2, "0");
  return s;
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

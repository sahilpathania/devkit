const DEFAULT_SITE_URL = "https://toolbay.in";

/** Strip trailing slashes and ensure a protocol. */
export function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, "");
  if (!trimmed) return DEFAULT_SITE_URL;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Canonical site URL for sitemap, robots, Open Graph, and share links.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL (set in production — required for correct SEO)
 * 2. VERCEL_URL on Vercel deploys
 * 3. https://toolbay.in
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return normalizeSiteUrl(fromEnv);

  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) return normalizeSiteUrl(vercelHost);

  return DEFAULT_SITE_URL;
}

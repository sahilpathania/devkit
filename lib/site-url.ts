/** Canonical production domain — always used for SEO metadata and sitemaps. */
export const CANONICAL_SITE_URL = "https://toolbay.in";

const CANONICAL_HOSTS = new Set(["toolbay.in", "www.toolbay.in"]);

/** Strip trailing slashes and ensure a protocol. */
export function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, "");
  if (!trimmed) return CANONICAL_SITE_URL;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Canonical site URL for metadata, sitemap, robots, and Open Graph.
 * Always returns https://toolbay.in so stale env vars (e.g. devkit.dev) never leak.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      const hostname = new URL(normalizeSiteUrl(fromEnv)).hostname;
      if (CANONICAL_HOSTS.has(hostname)) {
        return CANONICAL_SITE_URL;
      }
    } catch {
      // Ignore invalid env values.
    }
  }

  return CANONICAL_SITE_URL;
}

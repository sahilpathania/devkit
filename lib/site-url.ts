const DEFAULT_SITE_URL = "https://toolbay.in";
const CANONICAL_HOSTS = new Set(["toolbay.in", "www.toolbay.in"]);

/** Strip trailing slashes and ensure a protocol. */
export function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, "");
  if (!trimmed) return DEFAULT_SITE_URL;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Canonical site URL for sitemap, robots, Open Graph, and share links.
 *
 * A configured URL is accepted only when it belongs to ToolBay. This keeps
 * stale deployment variables from leaking an old domain into SEO metadata.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    const normalized = normalizeSiteUrl(fromEnv);
    if (CANONICAL_HOSTS.has(new URL(normalized).hostname)) {
      return DEFAULT_SITE_URL;
    }
  }

  return DEFAULT_SITE_URL;
}

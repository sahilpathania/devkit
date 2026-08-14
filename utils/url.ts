import { SITE_CONFIG } from "@/lib/constants";

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${normalized}`;
}

export function toolPath(slug: string): string {
  return `/tool/${slug}`;
}

export function categoryPath(slug: string): string {
  return `/category/${slug}`;
}

export function searchPath(query?: string): string {
  if (!query?.trim()) return "/search";
  return `/search?q=${encodeURIComponent(query.trim())}`;
}

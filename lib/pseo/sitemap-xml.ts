import { getSiteUrl } from "@/lib/site-url";

export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function urlsetXml(paths: string[]): string {
  const base = getSiteUrl();
  const lastmod = new Date().toISOString();
  const body = paths
    .map((path) => {
      const loc = path === "/" ? base : `${base}${path}`;
      return `  <url><loc>${xmlEscape(loc)}</loc><lastmod>${lastmod}</lastmod></url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

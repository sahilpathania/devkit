import { urlsetXml } from "@/lib/pseo/sitemap-xml";
import { getAllToolSlugs } from "@/services/tools";

export function GET() {
  const paths = getAllToolSlugs().map((slug) => `/tool/${slug}`);
  return new Response(urlsetXml(paths), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

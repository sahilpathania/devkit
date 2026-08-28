import { urlsetXml } from "@/lib/pseo/sitemap-xml";
import { getAllPseoSlugs } from "@/lib/pseo/registry";

export function GET() {
  const paths = getAllPseoSlugs().map((slug) => `/${slug}`);
  return new Response(urlsetXml(paths), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

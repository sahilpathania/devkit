import { urlsetXml } from "@/lib/pseo/sitemap-xml";
import { getLandingsByCluster } from "@/lib/pseo/registry";
import { getToolsByCategory } from "@/services/tools";

export function GET() {
  const landingPaths = getLandingsByCluster("image").map((page) => `/${page.slug}`);
  const toolPaths = getToolsByCategory("images").map((tool) => `/tool/${tool.slug}`);
  const paths = ["/image-tools", "/category/images", ...landingPaths, ...toolPaths];
  return new Response(urlsetXml(paths), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

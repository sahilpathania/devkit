import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/** Robots.txt — allow indexing; point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: [
      `${SITE_CONFIG.url}/sitemap.xml`,
      `${SITE_CONFIG.url}/sitemap-tools.xml`,
      `${SITE_CONFIG.url}/sitemap-images.xml`,
      `${SITE_CONFIG.url}/sitemap-pseo.xml`,
    ],
    host: SITE_CONFIG.url,
  };
}

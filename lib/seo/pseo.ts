import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import type { PseoHub, PseoLanding } from "@/lib/pseo/types";

/** Unique title/description/canonical for a pSEO landing. */
export function buildPseoLandingMetadata(page: PseoLanding): Metadata {
  return buildPageMetadata({
    headline: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: [
      page.keyword,
      page.h1,
      page.intent,
      "free online tool",
      "toolbay",
    ],
    descriptionFinal: true,
  });
}

/** Unique title/description/canonical for a pSEO hub. */
export function buildPseoHubMetadata(page: PseoHub): Metadata {
  return buildPageMetadata({
    headline: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: [page.keyword, page.h1, "free online tools", "toolbay"],
    descriptionFinal: true,
  });
}

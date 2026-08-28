import { IMAGE_LANDINGS } from "@/data/programmatic/image";
import { PDF_LANDINGS } from "@/data/programmatic/pdf";
import { JSON_LANDINGS } from "@/data/programmatic/json";
import { TEXT_LANDINGS } from "@/data/programmatic/text";
import { PSEO_HUBS } from "@/data/programmatic/hubs";
import { getToolBySlug } from "@/services/tools";
import { landingWordCount } from "@/lib/content/pseo";
import { RESERVED_PSEO_SLUGS } from "@/lib/pseo/reserved";
import type { PseoHub, PseoLanding, PseoPage } from "@/lib/pseo/types";

const MIN_LANDING_WORDS = 380;

let cachedPages: PseoPage[] | null = null;

function assertUniqueSlugs(pages: PseoPage[]) {
  const seen = new Set<string>();
  for (const page of pages) {
    if (RESERVED_PSEO_SLUGS.has(page.slug)) {
      throw new Error(`pSEO slug "${page.slug}" is reserved.`);
    }
    if (seen.has(page.slug)) {
      throw new Error(`Duplicate pSEO slug "${page.slug}".`);
    }
    seen.add(page.slug);
  }
}

function assertLandingGraph(landings: PseoLanding[], hubs: PseoHub[]) {
  const landingSlugs = new Set(landings.map((page) => page.slug));
  const hubSlugs = new Set(hubs.map((page) => page.slug));

    const thin = landings
      .map((landing) => ({ slug: landing.slug, words: landingWordCount(landing) }))
      .filter((row) => row.words < MIN_LANDING_WORDS);
    if (thin.length > 0) {
      throw new Error(
        `pSEO landings below ${MIN_LANDING_WORDS} words: ${thin
          .map((row) => `${row.slug} (${row.words})`)
          .join(", ")}`
      );
    }

    for (const landing of landings) {
      if (!getToolBySlug(landing.toolSlug)) {
        throw new Error(`Landing "${landing.slug}" embeds missing tool "${landing.toolSlug}".`);
      }
      if (!hubSlugs.has(landing.hubSlug)) {
        throw new Error(`Landing "${landing.slug}" points at missing hub "${landing.hubSlug}".`);
      }
      for (const related of landing.relatedSlugs) {
      if (related === landing.slug) {
        throw new Error(`Landing "${landing.slug}" related to itself.`);
      }
      if (!landingSlugs.has(related)) {
        throw new Error(`Landing "${landing.slug}" related slug "${related}" does not exist.`);
      }
    }
  }

  for (const hub of hubs) {
    for (const related of hub.relatedHubSlugs) {
      if (!hubSlugs.has(related)) {
        throw new Error(`Hub "${hub.slug}" related hub "${related}" does not exist.`);
      }
    }
  }
}

/** All programmatic pages. Validated once per process. */
export function getAllPseoPages(): PseoPage[] {
  if (cachedPages) return cachedPages;

  const landings = [...IMAGE_LANDINGS, ...PDF_LANDINGS, ...JSON_LANDINGS, ...TEXT_LANDINGS];
  const pages: PseoPage[] = [...PSEO_HUBS, ...landings];
  assertUniqueSlugs(pages);
  assertLandingGraph(landings, PSEO_HUBS);
  cachedPages = pages;
  return pages;
}

export function getPseoPage(slug: string): PseoPage | undefined {
  return getAllPseoPages().find((page) => page.slug === slug);
}

export function getAllPseoSlugs(): string[] {
  return getAllPseoPages().map((page) => page.slug);
}

export function getPseoLandings(): PseoLanding[] {
  return getAllPseoPages().filter((page): page is PseoLanding => page.type === "landing");
}

export function getPseoHubs(): PseoHub[] {
  return getAllPseoPages().filter((page): page is PseoHub => page.type === "hub");
}

export function getHubBySlug(slug: string): PseoHub | undefined {
  return getPseoHubs().find((page) => page.slug === slug);
}

export function getLandingsByHub(hubSlug: string): PseoLanding[] {
  return getPseoLandings().filter((page) => page.hubSlug === hubSlug);
}

export function getLandingsByCluster(cluster: PseoLanding["cluster"]): PseoLanding[] {
  return getPseoLandings().filter((page) => page.cluster === cluster);
}

export function resolveRelatedLandings(page: PseoLanding): PseoLanding[] {
  const all = getPseoLandings();
  return page.relatedSlugs
    .map((slug) => all.find((item) => item.slug === slug))
    .filter((item): item is PseoLanding => Boolean(item));
}

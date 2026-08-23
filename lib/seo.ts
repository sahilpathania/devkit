import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";
import type { Category } from "@/types/category";
import type { Tool, ToolFAQ } from "@/types";

const BRAND = SITE_CONFIG.name;
const TITLE_MAX = 60;
const DESC_MAX = 160;

export interface PageMetadataInput {
  /** Full headline before brand suffix, or complete title if `includeBrand` is false */
  headline: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  /** When false, `headline` is used as the full document title */
  includeBrand?: boolean;
  /** When true, `description` is used as-is (only whitespace-normalized and truncated). */
  descriptionFinal?: boolean;
}

export interface ResolvedSeoCopy {
  title: string;
  description: string;
  h1: string;
  path: string;
  canonical: string;
}

/** Truncate text at a word boundary for SERP limits. */
export function truncateSeoText(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;

  const slice = cleaned.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > Math.floor(max * 0.55)) {
    return `${slice.slice(0, lastSpace).trim()}…`;
  }
  return `${slice.trim()}…`;
}

/** Build `{keyword} Online Free | ToolBay` within 50–60 characters. */
export function buildBrandTitle(headline: string): string {
  const suffix = ` | ${BRAND}`;
  const maxHeadline = TITLE_MAX - suffix.length;
  return `${truncateSeoText(headline, maxHeadline)}${suffix}`;
}

/** Ensure descriptions land near 140–160 characters with Free + CTA. */
export function buildSeoDescription(body: string, cta = "Try it free in your browser.") {
  let description = body.replace(/\s+/g, " ").trim();
  if (!/\bfree\b/i.test(description)) {
    description = `${description} Free.`;
  }
  if (!description.endsWith(".") && !description.endsWith("…")) {
    description = `${description}.`;
  }
  if (!/try|start|use|convert|format|generate|decode|compress|merge/i.test(description)) {
    description = `${description} ${cta}`;
  }
  return truncateSeoText(description, DESC_MAX);
}

export function absoluteCanonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = getSiteUrl().replace(/\/+$/, "");
  if (normalized === "/") return base;
  return `${base}${normalized}`;
}

/** Primary keyword for a tool — first SEO keyword, then tag, then slug. */
export function getToolPrimaryKeyword(tool: Tool): string {
  return tool.seo.keywords[0] ?? tool.tags[0] ?? tool.slug.replace(/-/g, " ");
}

export function buildToolTitle(tool: Tool): string {
  return buildBrandTitle(`${tool.name} Online Free`);
}

export function buildToolDescription(tool: Tool): string {
  const keyword = getToolPrimaryKeyword(tool);
  const lead = tool.shortDescription.replace(/\.$/, "");
  return buildSeoDescription(
    `${lead}. Free online ${keyword} by ${BRAND} — private, fast, no signup`,
    "Open the tool and get results instantly."
  );
}

/** H1 aligned with the page title (without brand suffix). */
export function getToolH1(tool: Tool): string {
  return `${tool.name} Online Free`;
}

export function buildCategoryTitle(category: Category): string {
  return buildBrandTitle(`${category.name} Tools`);
}

export function buildCategoryDescription(category: Category, toolCount: number): string {
  return buildSeoDescription(
    `Explore ${toolCount} free ${category.name.toLowerCase()} tools on ${BRAND}. ${category.description}`,
    "Pick a tool and start instantly."
  );
}

export function getCategoryH1(category: Category): string {
  return `${category.name} Tools`;
}

export function buildHomeTitle(): string {
  return buildBrandTitle("Free Online Developer & Utility Tools");
}

export function buildHomeDescription(toolCount: number): string {
  return buildSeoDescription(
    `${BRAND} offers ${toolCount}+ free online developer, text, converter, encoder, decoder, calculator and productivity tools. Fast, secure and completely free`,
    "Browse tools and start in seconds."
  );
}

export function resolvePageSeo(input: PageMetadataInput): ResolvedSeoCopy {
  const title =
    input.includeBrand === false ? truncateSeoText(input.headline, TITLE_MAX) : buildBrandTitle(input.headline);
  const description = input.descriptionFinal
    ? truncateSeoText(input.description.replace(/\s+/g, " ").trim(), DESC_MAX)
    : buildSeoDescription(input.description);
  const canonical = absoluteCanonical(input.path);

  return {
    title,
    description,
    h1: input.headline,
    path: input.path,
    canonical,
  };
}

/** Build consistent Next.js Metadata for any page (server-rendered). */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const seo = resolvePageSeo(input);
  const ogImage = input.ogImage ?? "/opengraph-image";

  return {
    title: seo.title,
    description: seo.description,
    keywords: input.keywords,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: seo.canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: BRAND,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: SITE_CONFIG.twitter,
      images: [ogImage],
    },
  };
}

/** Root layout defaults — children override title/description per route. */
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    robots: { index: true, follow: true },
    openGraph: {
      siteName: BRAND,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      creator: SITE_CONFIG.twitter,
    },
  };
}

export function buildHomeMetadata(toolCount: number): Metadata {
  return buildPageMetadata({
    headline: "Free Online Developer & Utility Tools",
    description: `${BRAND} offers ${toolCount}+ free online developer, text, converter, encoder, decoder, calculator and productivity tools. Fast, secure and completely free.`,
    path: "/",
    keywords: [
      "free online tools",
      "developer tools",
      "utility tools",
      "converter tools",
      "productivity tools",
      "online toolbox",
      "toolbay",
    ],
  });
}

export function buildCategoryMetadata(category: Category, toolCount: number): Metadata {
  return buildPageMetadata({
    headline: `${category.name} Tools`,
    description: buildCategoryDescription(category, toolCount),
    path: `/category/${category.slug}`,
    keywords: [
      `${category.name.toLowerCase()} tools`,
      `free ${category.name.toLowerCase()} tools`,
      "online tools",
      "toolbay",
      ...category.name.toLowerCase().split(/\s+/),
    ],
  });
}

/** Dynamic tool metadata generated from registry data. */
export function buildToolMetadata(tool: Tool): Metadata {
  return buildPageMetadata({
    headline: `${tool.name} Online Free`,
    description: buildToolDescription(tool),
    path: `/tool/${tool.slug}`,
    keywords: [...tool.seo.keywords, ...tool.tags, "free online tool", BRAND.toLowerCase()],
    ogImage: tool.seo.ogImage,
  });
}

const APPLICATION_CATEGORY: Record<string, string> = {
  developer: "DeveloperApplication",
  documents: "BusinessApplication",
  images: "MultimediaApplication",
  design: "DesignApplication",
  generators: "UtilitiesApplication",
  calculators: "UtilitiesApplication",
  text: "UtilitiesApplication",
  converters: "DeveloperApplication",
  security: "SecurityApplication",
  utilities: "UtilitiesApplication",
};

/** JSON-LD WebApplication schema for tool pages. */
export function buildToolJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolH1(tool),
    description: buildToolDescription(tool),
    url: absoluteCanonical(`/tool/${tool.slug}`),
    applicationCategory: APPLICATION_CATEGORY[tool.category] ?? "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: BRAND,
      url: getSiteUrl(),
    },
  };
}

export function buildFaqJsonLd(faqs: ToolFAQ[]) {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteCanonical(item.href),
    })),
  };
}

/** WebSite + SearchAction for homepage / root layout. */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    description: SITE_CONFIG.description,
    url: getSiteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import type { Tool, ToolFAQ } from "@/types";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

/** Build consistent Next.js Metadata for any page. */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: SITE_CONFIG.twitter,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };

  return metadata;
}

/** Build metadata specifically for a tool page. */
export function buildToolMetadata(tool: Tool): Metadata {
  return buildPageMetadata({
    title: tool.seo.title,
    description: tool.seo.description,
    path: `/tool/${tool.slug}`,
    keywords: tool.seo.keywords,
    ogImage: tool.seo.ogImage,
  });
}

/** Generate JSON-LD structured data for a tool page. */
export function buildToolJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${SITE_CONFIG.url}/tool/${tool.slug}`,
  };
}

/** Generate JSON-LD FAQ schema from tool FAQs. */
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

/** Generate JSON-LD BreadcrumbList schema. */
export function buildBreadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}

/** Generate JSON-LD for the website organization. */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

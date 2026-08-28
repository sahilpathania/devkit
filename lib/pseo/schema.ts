import { SITE_CONFIG } from "@/lib/constants";
import { absoluteCanonical, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { BreadcrumbItem } from "@/components/tools/breadcrumb";
import type { PseoHub, PseoLanding } from "@/lib/pseo/types";

export function landingBreadcrumbs(page: PseoLanding, hubName: string): BreadcrumbItem[] {
  return [
    { name: hubName, href: `/${page.hubSlug}` },
    { name: page.h1, href: `/${page.slug}` },
  ];
}

export function hubBreadcrumbs(page: PseoHub): BreadcrumbItem[] {
  return [{ name: page.h1, href: `/${page.slug}` }];
}

export function buildLandingJsonLd(
  page: PseoLanding,
  _hubName: string,
  crumbs: BreadcrumbItem[]
) {
  const url = absoluteCanonical(`/${page.slug}`);
  const faq = buildFaqJsonLd(page.faqs);
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    ...crumbs,
  ]);

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: getSiteUrl(),
    },
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.h1,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url,
    description: page.whatItDoes,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: getSiteUrl(),
    },
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to ${page.keyword.toLowerCase()}`,
    description: page.intent,
    step: page.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return [webpage, app, breadcrumb, howTo, faq].filter(Boolean) as Array<
    Record<string, unknown>
  >;
}

export function buildHubJsonLd(page: PseoHub, crumbs: BreadcrumbItem[]) {
  const url = absoluteCanonical(`/${page.slug}`);
  const faq = buildFaqJsonLd(page.faqs);
  const breadcrumb = buildBreadcrumbJsonLd([{ name: "Home", href: "/" }, ...crumbs]);

  const webpage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.h1,
    description: page.description,
    url,
  };

  return [webpage, breadcrumb, faq].filter(Boolean) as Array<Record<string, unknown>>;
}

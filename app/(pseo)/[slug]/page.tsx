import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { PseoHubView } from "@/components/pseo/hub-view";
import { PseoLandingView } from "@/components/pseo/landing-view";
import { getAllPseoSlugs, getHubBySlug, getPseoPage } from "@/lib/pseo/registry";
import { buildHubJsonLd, buildLandingJsonLd, hubBreadcrumbs, landingBreadcrumbs } from "@/lib/pseo/schema";
import { buildPseoHubMetadata, buildPseoLandingMetadata } from "@/lib/seo/pseo";
import { getToolBySlug } from "@/services/tools";

interface PseoPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPseoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PseoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPseoPage(slug);
  if (!page) return {};
  return page.type === "hub" ? buildPseoHubMetadata(page) : buildPseoLandingMetadata(page);
}

export default async function ProgrammaticSeoPage({ params }: PseoPageProps) {
  const { slug } = await params;
  const page = getPseoPage(slug);
  if (!page) notFound();

  if (page.type === "hub") {
    const crumbs = hubBreadcrumbs(page);
    return (
      <>
        <JsonLd data={buildHubJsonLd(page, crumbs)} />
        <PseoHubView page={page} />
      </>
    );
  }

  const tool = getToolBySlug(page.toolSlug);
  if (!tool) notFound();

  const hub = getHubBySlug(page.hubSlug);
  const crumbs = landingBreadcrumbs(page, hub?.h1 ?? "Tools");

  return (
    <>
      <JsonLd data={buildLandingJsonLd(page, hub?.h1 ?? "Tools", crumbs)} />
      <PseoLandingView page={page} tool={tool} />
    </>
  );
}

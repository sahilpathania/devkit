import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolLayout } from "@/components/tools/tool-layout";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import { getToolBySlug, getAllToolSlugs } from "@/services/tools";
import { getCategoryBySlug } from "@/services/categories";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildToolJsonLd,
  buildToolMetadata,
} from "@/lib/seo";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);

  const schemas = [
    buildToolJsonLd(tool),
    buildBreadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: category?.name ?? "Tools", href: `/category/${tool.category}` },
      { name: tool.name, href: `/tool/${tool.slug}` },
    ]),
    buildFaqJsonLd(tool.faqs),
  ].filter(Boolean) as Array<Record<string, unknown>>;

  return (
    <>
      <JsonLd data={schemas} />

      <ToolLayout tool={tool}>
        <ToolRenderer tool={tool} />
      </ToolLayout>
    </>
  );
}

import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolCard } from "@/components/tools/tool-card";
import { Breadcrumb } from "@/components/tools/breadcrumb";
import { GradientBackground } from "@/components/shared/gradient-background";
import {
  CATEGORY_ALIASES,
  getCategoryBySlug,
  getAllCategorySlugs,
} from "@/services/categories";
import { getToolsByCategory } from "@/services/tools";
import { getIcon } from "@/lib/icons";
import { SITE_CONFIG } from "@/lib/constants";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import type { CategorySlug } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const current = getAllCategorySlugs().map((slug) => ({ slug }));
  const aliases = Object.keys(CATEGORY_ALIASES).map((slug) => ({ slug }));
  return [...current, ...aliases];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return buildPageMetadata({
    title: `${category.name} Tools — ${SITE_CONFIG.name}`,
    description: category.description,
    path: `/category/${category.slug}`,
    keywords: [category.name.toLowerCase(), "online tools", "free tools"],
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const aliased = CATEGORY_ALIASES[slug as CategorySlug];
  if (aliased) {
    redirect(`/category/${aliased}`);
  }

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const tools = getToolsByCategory(category.slug);
  if (tools.length === 0) notFound();

  const Icon = getIcon(category.icon);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: category.name, href: `/category/${category.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ name: category.name, href: `/category/${category.slug}` }]}
          />

          <div className="mt-6 flex items-start gap-4">
            <div
              className={cn(
                "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br",
                category.gradient
              )}
            >
              <Icon className="size-7" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {category.name}
              </h1>
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {tools.length} {tools.length === 1 ? "tool" : "tools"} available
              </p>
            </div>
          </div>
        </div>
      </GradientBackground>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

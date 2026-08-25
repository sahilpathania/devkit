import Link from "next/link";
import type { Metadata } from "next";
import { GradientBackground } from "@/components/shared/gradient-background";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteCanonical, buildPageMetadata } from "@/lib/seo";
import { getActiveCategories, getToolsByCategory, TOOLS } from "@/services/tools";

export const metadata: Metadata = buildPageMetadata({
  headline: "All Free Online Tools",
  description: `Browse every free tool on ToolBay — ${TOOLS.length} browser-based utilities across developer, document, image, converter, and productivity categories.`,
  path: "/tools",
  keywords: [
    "all online tools",
    "free tool list",
    "developer tools directory",
    "toolbay tools",
    "browser utilities",
  ],
});

export default function ToolsSitemapPage() {
  const categories = getActiveCategories();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ToolBay — All Tools",
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: absoluteCanonical(`/tool/${tool.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />

      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            All Free Online Tools
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            Complete directory of {TOOLS.length} free browser-based tools on ToolBay. Pick a
            category or jump directly to any tool below.
          </p>
        </div>
      </GradientBackground>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="All tools by category" className="space-y-12">
          {categories.map((category) => {
            const tools = getToolsByCategory(category.slug);

            return (
              <section key={category.slug} aria-labelledby={`tools-${category.slug}`}>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-3">
                  <h2 id={`tools-${category.slug}`} className="text-xl font-semibold tracking-tight">
                    <Link
                      href={`/category/${category.slug}`}
                      className="hover:text-primary hover:underline underline-offset-4"
                    >
                      {category.name}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {tools.length} {tools.length === 1 ? "tool" : "tools"}
                  </p>
                </div>

                <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
                  {tools.map((tool) => (
                    <li key={tool.slug} className="mb-2 break-inside-avoid">
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </nav>
      </div>
    </>
  );
}

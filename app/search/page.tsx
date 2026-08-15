import type { Metadata } from "next";
import { SearchResults } from "@/components/search/search-results";
import { GradientBackground } from "@/components/shared/gradient-background";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Search Tools — DevKit",
  description: "Search free online tools by name, category, or what you need to do.",
  path: "/search",
  keywords: ["search tools", "online tools", "devkit"],
});

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  return (
    <>
      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Search</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find the right tool by name, category, or tag.
          </p>
        </div>
      </GradientBackground>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SearchResults initialQuery={q} />
      </div>
    </>
  );
}

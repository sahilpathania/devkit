import { SectionHeader } from "@/components/shared/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import { getFeaturedTools } from "@/services/tools";

/** Trending / featured strip — only real featured tools, no fake stats. */
export function FeaturedTools() {
  const tools = getFeaturedTools(4);
  if (tools.length === 0) return null;

  return (
    <section id="trending" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Trending"
        description="Featured tools worth opening first."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
}

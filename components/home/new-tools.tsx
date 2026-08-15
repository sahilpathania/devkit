import { SectionHeader } from "@/components/shared/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import { getRecentTools } from "@/services/tools";

export function NewTools() {
  const tools = getRecentTools(8);

  return (
    <section id="new-tools" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="New tools"
        description="Fresh additions to the toolkit."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
}

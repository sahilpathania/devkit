import { ToolCard } from "@/components/tools/tool-card";
import type { Tool } from "@/types";

interface RelatedToolsProps {
  tools: Tool[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-xl font-semibold tracking-tight">
        Related Tools
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
}

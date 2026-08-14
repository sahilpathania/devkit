import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { getPopularTools } from "@/services/tools";

export function PopularTools() {
  const tools = getPopularTools(8);

  return (
    <section id="popular-tools" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Popular tools"
        description="The most-used tools by developers worldwide."
        action={
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/category/json-tools" />}
          >
            View all
            <ArrowRight className="size-4" />
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
}

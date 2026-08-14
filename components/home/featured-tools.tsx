import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { getFeaturedTools } from "@/services/tools";

export function FeaturedTools() {
  const tools = getFeaturedTools(4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Featured tools"
        description="Hand-picked tools our team uses every day."
        action={
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Zap className="size-4 text-amber-500" />
            Editor&apos;s choice
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/category/web" />}
        >
          Explore all web tools
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

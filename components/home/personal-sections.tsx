"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/use-is-client";
import { useAppStore } from "@/stores/use-app-store";
import { getToolBySlug } from "@/services/tools";

export function FavoritesSection() {
  const mounted = useIsClient();
  const favorites = useAppStore((s) => s.favorites);

  if (!mounted) return null;

  const tools = favorites
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean)
    .slice(0, 8);

  if (tools.length === 0) return null;

  return (
    <section id="favorites" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Favorites"
        description="Your starred tools, saved on this device."
        action={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            Local only
          </div>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, index) =>
          tool ? <ToolCard key={tool.slug} tool={tool} index={index} /> : null
        )}
      </div>
    </section>
  );
}

export function RecentlyUsedSection() {
  const mounted = useIsClient();
  const recentHistory = useAppStore((s) => s.recentHistory);
  const clearHistory = useAppStore((s) => s.clearHistory);

  if (!mounted) return null;

  const tools = recentHistory
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean)
    .slice(0, 8);

  if (tools.length === 0) return null;

  return (
    <section id="recent" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Recently used"
        description="Pick up where you left off — stored locally on this device."
        action={
          <Button variant="ghost" size="sm" onClick={clearHistory}>
            Clear
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool, index) =>
          tool ? <ToolCard key={tool.slug} tool={tool} index={index} /> : null
        )}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="#popular-tools" />}>
          Browse popular
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Clock, Search, Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/use-is-client";
import { useAppStore } from "@/stores/use-app-store";
import { getToolBySlug } from "@/services/tools";

function EmptyGuide({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Search;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-muted/10 px-6 py-12 text-center">
      <Icon className="mx-auto size-5 text-muted-foreground" aria-hidden />
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 rounded-xl"
        nativeButton={false}
        render={<Link href="#popular-tools" />}
      >
        Browse popular tools
      </Button>
    </div>
  );
}

export function FavoritesSection() {
  const mounted = useIsClient();
  const favorites = useAppStore((s) => s.favorites);

  const tools = mounted
    ? favorites.map((slug) => getToolBySlug(slug)).filter(Boolean).slice(0, 8)
    : [];

  return (
    <section id="favorites" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Favorites"
        description="Star any tool to keep it here — saved only on this device."
      />
      {!mounted ? (
        <div className="h-40 animate-pulse rounded-2xl bg-muted/40" aria-hidden />
      ) : tools.length === 0 ? (
        <EmptyGuide
          icon={Star}
          title="No favorites yet"
          body="Open a tool and tap Save — it’ll show up here for one-click access."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) =>
            tool ? <ToolCard key={tool.slug} tool={tool} index={index} /> : null
          )}
        </div>
      )}
    </section>
  );
}

export function RecentlyUsedSection() {
  const mounted = useIsClient();
  const recentHistory = useAppStore((s) => s.recentHistory);
  const clearHistory = useAppStore((s) => s.clearHistory);

  const tools = mounted
    ? recentHistory.map((slug) => getToolBySlug(slug)).filter(Boolean).slice(0, 10)
    : [];

  return (
    <section id="recent" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Recently used"
        description="Pick up where you left off — last 10 tools, stored locally."
        action={
          mounted && tools.length > 0 ? (
            <Button variant="ghost" size="sm" className="rounded-xl" onClick={clearHistory}>
              Clear
            </Button>
          ) : undefined
        }
      />
      {!mounted ? (
        <div className="h-40 animate-pulse rounded-2xl bg-muted/40" aria-hidden />
      ) : tools.length === 0 ? (
        <EmptyGuide
          icon={Clock}
          title="No recent tools"
          body="Search above or open a popular tool — it’ll appear here next time."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) =>
            tool ? <ToolCard key={tool.slug} tool={tool} index={index} /> : null
          )}
        </div>
      )}
    </section>
  );
}

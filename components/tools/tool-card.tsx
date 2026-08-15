"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Star, Zap } from "lucide-react";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsClient } from "@/hooks/use-is-client";
import { useAppStore } from "@/stores/use-app-store";
import { getCategoryBySlug } from "@/services/categories";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  index?: number;
  className?: string;
}

/** Estimated feel — local-first tools are effectively instant. */
function speedLabel(tool: Tool): string {
  if (
    tool.category === "documents" ||
    tool.category === "images" ||
    tool.slug.includes("pdf") ||
    tool.slug.includes("image") ||
    tool.slug.includes("zip") ||
    tool.slug.includes("word")
  ) {
    return "Runs locally";
  }
  return "Instant";
}

export function ToolCard({ tool, index = 0, className }: ToolCardProps) {
  const mounted = useIsClient();
  const isFavorite = useAppStore((s) => s.favorites.includes(tool.slug));
  const category = getCategoryBySlug(tool.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
    >
      <Card
        className={cn(
          "group relative flex h-full flex-col overflow-hidden border-border/60 p-5 transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-border hover:shadow-lg hover:shadow-black/5",
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/tool/${tool.slug}`}
            className="flex min-w-0 flex-1 items-start gap-3"
          >
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                category?.gradient ?? "from-teal-500/20 to-emerald-500/20"
              )}
            >
              <DynamicIcon name={tool.icon} className="size-5 text-foreground/80" />
            </div>
            <div className="min-w-0 pt-0.5">
              <h3 className="truncate font-medium tracking-tight">{tool.name}</h3>
              {category && (
                <p className="mt-0.5 text-xs text-muted-foreground">{category.name}</p>
              )}
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            {mounted && isFavorite && (
              <Star
                className="size-3.5 fill-amber-400 text-amber-400"
                aria-label="Favorite"
              />
            )}
            {tool.isNew && (
              <Badge variant="secondary" className="text-[10px]">
                <Sparkles className="mr-0.5 size-2.5" />
                New
              </Badge>
            )}
          </div>
        </div>

        <p className="mt-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {tool.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Zap className="size-3" aria-hidden />
            {speedLabel(tool)}
          </span>
          <Button
            size="sm"
            variant="secondary"
            className="gap-1 rounded-lg"
            nativeButton={false}
            render={<Link href={`/tool/${tool.slug}`} />}
          >
            Open
            <ArrowUpRight className="size-3.5 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

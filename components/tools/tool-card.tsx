"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Sparkles, Star, Zap } from "lucide-react";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { Badge } from "@/components/ui/badge";
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

function badgesFor(tool: Tool) {
  const badges: { label: string; tone: "new" | "popular" | "secure" | "instant" }[] = [];
  if (tool.isNew) badges.push({ label: "New", tone: "new" });
  if (tool.isPopular) badges.push({ label: "Popular", tone: "popular" });
  if (
    tool.category === "documents" ||
    tool.category === "images" ||
    tool.category === "security"
  ) {
    badges.push({ label: "Private", tone: "secure" });
  } else {
    badges.push({ label: "Instant", tone: "instant" });
  }
  return badges.slice(0, 2);
}

export function ToolCard({ tool, index = 0, className }: ToolCardProps) {
  const mounted = useIsClient();
  const isFavorite = useAppStore((s) => s.favorites.includes(tool.slug));
  const category = getCategoryBySlug(tool.category);
  const badges = badgesFor(tool);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.15) }}
    >
      <Link href={`/tool/${tool.slug}`} className="block h-full outline-none">
        <Card
          className={cn(
            "group relative flex h-full flex-col overflow-hidden border-border/60 p-5",
            "transition-all duration-200 ease-out",
            "hover:-translate-y-1 hover:border-border hover:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.22)]",
            "focus-within:ring-2 focus-within:ring-ring/40",
            className
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-200 group-hover:scale-[1.03]",
                category?.gradient ?? "from-teal-500/20 to-emerald-500/20"
              )}
            >
              <DynamicIcon name={tool.icon} className="size-5 text-foreground/80" />
            </div>
            <div className="flex flex-wrap items-center justify-end gap-1">
              {mounted && isFavorite && (
                <Star
                  className="size-3.5 fill-amber-400 text-amber-400"
                  aria-label="Favorite"
                />
              )}
              {badges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant="secondary"
                  className={cn(
                    "text-[10px] font-medium",
                    badge.tone === "new" && "bg-teal-500/10 text-teal-700 dark:text-teal-300",
                    badge.tone === "popular" && "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                  )}
                >
                  {badge.tone === "new" && <Sparkles className="mr-0.5 size-2.5" />}
                  {badge.tone === "secure" && <Lock className="mr-0.5 size-2.5" />}
                  {badge.tone === "instant" && <Zap className="mr-0.5 size-2.5" />}
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>

          <h3 className="mt-4 text-[15px] font-medium tracking-tight group-hover:text-foreground">
            {tool.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {tool.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/50 pt-3">
            <span className="text-[11px] text-muted-foreground">
              {category?.name ?? "Tools"}
            </span>
            <span className="text-xs font-medium text-foreground/80 transition-transform duration-200 group-hover:translate-x-0.5">
              Open →
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

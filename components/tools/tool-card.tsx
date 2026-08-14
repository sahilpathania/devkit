"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/stores/use-app-store";
import { getIcon } from "@/lib/icons";
import { getCategoryBySlug } from "@/services/categories";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  index?: number;
  className?: string;
}

export function ToolCard({ tool, index = 0, className }: ToolCardProps) {
  const [mounted, setMounted] = useState(false);
  const isFavorite = useAppStore((s) => s.isFavorite(tool.slug));
  const category = getCategoryBySlug(tool.category);
  const Icon = getIcon(tool.icon);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link href={`/tool/${tool.slug}`} className="group block h-full">
        <Card
          className={cn(
            "relative h-full overflow-hidden border-border/60 p-5 transition-all duration-300",
            "hover:border-border hover:shadow-lg hover:shadow-teal-500/5",
            "hover:-translate-y-0.5",
            className
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100",
              category?.gradient.replace("/20", "/40") ?? "from-teal-500/40 to-emerald-500/40"
            )}
          />

          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                category?.gradient ?? "from-teal-500/20 to-emerald-500/20"
              )}
            >
              <Icon className="size-5 text-foreground/80" aria-hidden="true" />
            </div>
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
              <ArrowUpRight
                className="size-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium tracking-tight group-hover:text-gradient">
              {tool.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {tool.shortDescription}
            </p>
          </div>

          {category && (
            <p className="mt-4 text-xs text-muted-foreground/70">{category.name}</p>
          )}
        </Card>
      </Link>
    </motion.div>
  );
}

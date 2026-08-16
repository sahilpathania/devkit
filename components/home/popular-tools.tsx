"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu } from "lucide-react";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { SectionHeader } from "@/components/shared/section-header";
import { getCategoryBySlug } from "@/services/categories";
import { getPopularTools } from "@/services/tools";
import { cn } from "@/lib/utils";

export function PopularTools() {
  const tools = getPopularTools(6);

  return (
    <section id="popular-tools" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Popular tools"
        description="Common tasks, made simple and dependable."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => {
          const category = getCategoryBySlug(tool.category);

          return (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.2,
                delay: Math.min(index * 0.03, 0.12),
                ease: "easeOut",
              }}
              className="h-full"
            >
              <Link
                href={`/tool/${tool.slug}`}
                className={cn(
                  "group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-5",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-1 hover:border-border hover:shadow-[0_20px_38px_-24px_rgba(0,0,0,0.26)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl bg-muted/80",
                      "transition-transform duration-200 ease-out group-hover:scale-[1.03]",
                      category?.gradient ?? "from-teal-500/20 to-emerald-500/20"
                    )}
                  >
                    <DynamicIcon name={tool.icon} className="size-5 text-foreground/80" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/75 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-foreground/70 uppercase">
                    <Cpu className="size-3" aria-hidden />
                    Local
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-medium tracking-[-0.03em] text-foreground">
                  {tool.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {tool.shortDescription}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
                  <span className="text-xs text-muted-foreground">
                    {category?.name ?? "Tools"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/75">
                    Open
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

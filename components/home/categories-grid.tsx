"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { getActiveCategories, getToolsByCategory } from "@/services/tools";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function CategoriesGrid() {
  const categories = getActiveCategories();

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Categories"
        description="Find the right tool by the kind of work you’re doing."
      />

      <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((category, index) => {
          const Icon = getIcon(category.icon);
          const toolCount = getToolsByCategory(category.slug).length;

          return (
            <motion.div
              key={category.slug}
              className="h-full"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.025, 0.15), ease: "easeOut" }}
            >
              <Link
                href={`/category/${category.slug}`}
                className={cn(
                  "group flex h-full min-h-[176px] flex-col rounded-2xl border border-border/60 bg-card p-5",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:border-border hover:shadow-[0_16px_32px_-22px_rgba(0,0,0,0.24)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                )}
              >
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl bg-muted/80",
                    "transition-all duration-200 ease-out group-hover:scale-[1.02]",
                    category.gradient
                  )}
                >
                  <Icon className="size-5 text-foreground/80" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[15px] font-medium tracking-[-0.02em] text-foreground">
                  {category.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <span>
                    {toolCount} {toolCount === 1 ? "tool" : "tools"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-foreground/75 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                    Explore
                    <ArrowRight className="size-3.5" />
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

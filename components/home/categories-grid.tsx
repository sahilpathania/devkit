"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { CATEGORIES } from "@/services/categories";
import { getToolsByCategory } from "@/services/tools";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function CategoriesGrid() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Browse by category"
        description="Every tool organized by what you're building."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {CATEGORIES.map((category, index) => {
          const Icon = getIcon(category.icon);
          const toolCount = getToolsByCategory(category.slug).length;

          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-lg hover:shadow-teal-500/5 hover:-translate-y-0.5"
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br",
                    category.gradient
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-medium tracking-tight group-hover:text-gradient">
                  {category.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{toolCount} tools</span>
                  <ArrowRight className="size-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

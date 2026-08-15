"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { getActiveCategories } from "@/services/tools";
import { getToolsByCategory } from "@/services/tools";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function CategoriesGrid() {
  const categories = getActiveCategories();

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Categories"
        description="Find the right tool by what you’re working with — images, documents, code, and more."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((category, index) => {
          const Icon = getIcon(category.icon);
          const toolCount = getToolsByCategory(category.slug).length;

          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
              >
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl bg-gradient-to-br",
                    category.gradient
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[15px] font-medium tracking-tight">
                  {category.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {toolCount} {toolCount === 1 ? "tool" : "tools"}
                  </span>
                  <ArrowRight className="size-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

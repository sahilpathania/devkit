"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/home/search-bar";
import { SITE_CONFIG } from "@/lib/constants";
import { TOOLS } from "@/services/tools";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.08_195/0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.45_0.08_195/0.18),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mb-5 text-sm font-medium tracking-wide text-muted-foreground">
              {TOOLS.length} free tools · Private by default · No account
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Everything you need.
              <br />
              <span className="text-foreground/80">One place.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              {SITE_CONFIG.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-10"
          >
            <SearchBar className="mx-auto max-w-2xl" autoFocus={false} rotatePlaceholders />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button nativeButton={false} render={<a href="#popular-tools" />}>
              Popular tools
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href="#categories" />}
            >
              Browse categories
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

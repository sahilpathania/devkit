"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/home/search-bar";
import { GradientBackground } from "@/components/shared/gradient-background";
import { SITE_CONFIG } from "@/lib/constants";
import { TOOLS } from "@/services/tools";

export function Hero() {
  return (
    <GradientBackground className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="size-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-muted-foreground">
                {TOOLS.length}+ free tools · No login required
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Developer tools{" "}
              <span className="text-gradient">that just work</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              {SITE_CONFIG.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10"
          >
            <SearchBar className="mx-auto max-w-xl" autoFocus={false} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button nativeButton={false} render={<a href="#popular-tools" />}>
              Browse tools
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href="#categories" />}
            >
              View categories
            </Button>
          </motion.div>
        </div>
      </div>
    </GradientBackground>
  );
}

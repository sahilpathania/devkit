"use client";

import { motion } from "framer-motion";
import { SearchBar } from "@/components/home/search-bar";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import {
  HERO_CAPABILITIES,
  HERO_TRUST_BADGES,
  POPULAR_SEARCHES,
  SITE_CONFIG,
} from "@/lib/constants";
import { searchTools } from "@/services/tools";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Hero() {
  const router = useRouter();

  function openPopular(query: string) {
    const matches = searchTools(query);
    if (matches[0]) {
      router.push(`/tool/${matches[0].slug}`);
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <section className="relative isolate overflow-hidden border-b border-border/40 bg-[#edf3f1] dark:bg-[#0d1113]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,166,170,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(115,159,170,0.16),transparent_52%)]" />
        <div className="absolute -left-24 top-10 size-[28rem] rounded-full bg-[oklch(0.7_0.06_195/0.08)] blur-3xl dark:bg-[oklch(0.45_0.06_195/0.12)]" />
        <div className="absolute -right-20 bottom-0 size-[22rem] rounded-full bg-[oklch(0.72_0.05_160/0.06)] blur-3xl dark:bg-[oklch(0.4_0.05_160/0.1)]" />
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] bg-noise" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-[78rem] text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[13px] font-medium tracking-[0.16em] text-muted-foreground/80 uppercase">
              {SITE_CONFIG.name}
            </p>

            <h1 className="mt-6 text-[clamp(4rem,8vw,10rem)] font-black leading-[0.8] tracking-[-0.065em] text-foreground">
              <span className="block">Everything you need.</span>
              <span className="mt-2 block text-foreground/25">One place.</span>
            </h1>

            <ul className="mx-auto mt-8 flex max-w-[52rem] flex-wrap items-center justify-center gap-2 text-[0.95rem] font-medium tracking-[-0.02em] text-foreground/70">
              {HERO_CAPABILITIES.map((label, index) => (
                <li key={label} className="flex items-center gap-2">
                  <span>{label}</span>
                  {index < HERO_CAPABILITIES.length - 1 && (
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
                  )}
                </li>
              ))}
            </ul>

            <ul className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium tracking-[0.14em] text-foreground/50 uppercase">
              {HERO_TRUST_BADGES.map((label, index) => (
                <li key={label} className="flex items-center gap-3">
                  <span>{label}</span>
                  {index < HERO_TRUST_BADGES.length - 1 && (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-foreground/20" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-12"
          >
            <SearchBar
              className="mx-auto w-full max-w-[68rem]"
              autoFocus={false}
              rotatePlaceholders
            />
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            aria-label="Popular searches"
            className="mt-8"
          >
            <ul className="flex flex-wrap items-center justify-center gap-2.5">
              {POPULAR_SEARCHES.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => openPopular(item.query)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3.5 py-2 text-[13px] text-foreground/80 shadow-sm shadow-black/[0.02]",
                      "transition-all duration-200 ease-out",
                      "hover:-translate-y-0.5 hover:border-border hover:bg-muted hover:text-foreground hover:shadow-md",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    )}
                  >
                    <DynamicIcon
                      name={item.icon}
                      className="size-3.5 text-muted-foreground"
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>
    </section>
  );
}

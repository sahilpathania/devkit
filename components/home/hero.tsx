"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/home/search-bar";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import {
  HERO_CAPABILITIES,
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
    <section className="relative isolate overflow-hidden border-b border-border/40 bg-[#eceeee] dark:bg-[#0d1113]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_rgba(255,255,255,0.9),_transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(115,159,170,0.16),transparent_52%)]" />
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045] bg-noise" />
      </div>

      <div className="mx-auto max-w-[1100px] px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[850px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-center text-foreground">
              <span
                className="block text-[clamp(3rem,7vw,7rem)] font-black leading-[0.95] tracking-[-0.055em] text-[#111111]"
                style={{ letterSpacing: "-0.055em" }}
              >
                Everything you need.
              </span>
              <span
                className="mt-5 block bg-gradient-to-r from-[#8fa39d] via-[#778d87] to-[#6a7e79] bg-clip-text text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-transparent"
                style={{ letterSpacing: "-0.05em" }}
              >
                One place.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[620px] text-[0.98rem] leading-[1.7] text-foreground/65 sm:text-[1.1rem]">
              {SITE_CONFIG.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <SearchBar
              className="mx-auto w-full max-w-[760px]"
              autoFocus={false}
              rotatePlaceholders
              hideIcon
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/search"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1b1b1b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Explore Tools
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/category/images"
              className="inline-flex items-center justify-center rounded-full border border-border/70 bg-background/80 px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Browse Categories
            </Link>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            aria-label="Popular searches"
            className="mt-8"
          >
            <ul className="flex flex-wrap items-center justify-center gap-2.5">
              {POPULAR_SEARCHES.slice(0, 6).map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => openPopular(item.query)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3.5 py-2 text-[12.5px] font-medium text-foreground/75 shadow-sm shadow-black/[0.03]",
                      "transition-all duration-200 ease-out",
                      "hover:-translate-y-0.5 hover:border-border hover:bg-white hover:text-foreground hover:shadow-md",
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

          <ul className="mx-auto mt-10 flex max-w-[640px] flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.78rem] font-medium tracking-[0.12em] text-foreground/45 uppercase">
            {HERO_CAPABILITIES.map((label, index) => (
              <li key={label} className="flex items-center gap-3">
                <span>{label}</span>
                {index < HERO_CAPABILITIES.length - 1 && (
                  <span aria-hidden className="text-[#7a948e] dark:text-[#9ab6af]">•</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "120+", label: "Free tools" },
              { value: "Fast", label: "Processing" },
              { value: "Private", label: "By default" },
              { value: "No signup", label: "Required" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/60 bg-background/75 px-4 py-3.5 text-left shadow-sm shadow-black/[0.02] backdrop-blur-sm"
              >
                <div className="text-[1.15rem] font-semibold tracking-[-0.04em] text-foreground">
                  {item.value}
                </div>
                <div className="mt-1 text-[11px] font-medium tracking-[0.12em] text-foreground/45 uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

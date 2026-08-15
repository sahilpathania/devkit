"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is DevKit free?",
    a: "Yes. Every tool on the site is free to use. No account required.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "Almost all tools run locally in your browser. When a tool needs different handling, it says so clearly on the page.",
  },
  {
    q: "Who is this for?",
    a: "Students, office workers, developers, designers, teachers, creators — anyone who works with digital files and data.",
  },
  {
    q: "How do I find a tool quickly?",
    a: "Use the homepage search, or press ⌘K / Ctrl+K anywhere to open the command palette. Arrow keys and Enter work in search results.",
  },
  {
    q: "Do you show tools that aren’t ready?",
    a: "No. If a tool isn’t live and functional, it doesn’t appear in search or categories.",
  },
] as const;

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="FAQ"
        description={`Quick answers about ${SITE_CONFIG.name}.`}
      />
      <div className="space-y-2">
        {FAQS.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={item.q}
              className="rounded-2xl border border-border/60 bg-card/60 px-4"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.q}
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-200",
                  isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                )}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

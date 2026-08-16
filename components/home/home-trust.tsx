"use client";

import { motion } from "framer-motion";
import { Globe2, Lock, Trash2, Zap } from "lucide-react";

const ITEMS = [
  { icon: Lock, label: "Secure processing", detail: "Private by default" },
  { icon: Zap, label: "Lightning fast", detail: "Results in seconds" },
  { icon: Trash2, label: "Nothing stored", detail: "Local by default" },
  { icon: Globe2, label: "Works everywhere", detail: "Any modern browser" },
] as const;

/** Quiet trust strip — no marketing fluff. */
export function HomeTrust() {
  return (
    <section
      id="trust"
      aria-label="Privacy and speed"
      className="border-y border-border/40 bg-[#f7f8f7] dark:bg-[#0d1113]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/70 px-4 py-3.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/80">
                <item.icon className="size-4 text-foreground/80" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium tracking-tight text-foreground">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {item.detail}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

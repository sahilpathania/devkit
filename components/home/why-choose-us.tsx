"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles, Zap } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const REASONS = [
  {
    icon: Zap,
    title: "Seconds, not minutes",
    body: "Open a tool, drop a file or paste text, get the result. Built for speed on every device.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Most tools run entirely in your browser. Your files and data stay on your device.",
  },
  {
    icon: Sparkles,
    title: "One calm workspace",
    body: "Images, documents, generators, and developer utilities — organized, searchable, consistent.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="Built for everyday work"
        description="Speed, privacy, and clarity without the friction."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {REASONS.map((reason, index) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
            className="rounded-2xl border border-border/60 bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:shadow-[0_18px_36px_-22px_rgba(0,0,0,0.25)]"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-muted/80">
              <reason.icon className="size-5 text-foreground/80" aria-hidden />
            </div>
            <h3 className="mt-4 text-base font-medium tracking-[-0.02em]">{reason.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {reason.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

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
    <section id="why" className="border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why DevKit"
          description="A premium toolkit experience — not a cluttered utilities dump."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <reason.icon className="size-5 text-foreground/80" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-medium tracking-tight">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Placeholder — wire to email service in future iteration
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Thanks for subscribing! We'll keep you updated.");
    setEmail("");
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-teal-500/10 via-background to-emerald-500/10 p-8 sm:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-50"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 shadow-lg shadow-teal-500/20">
            <Mail className="size-5 text-white" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Stay in the loop
          </h2>
          <p className="mt-2 text-muted-foreground">
            Get notified when we launch new tools. No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="h-11 flex-1 rounded-xl"
              aria-label="Email address"
            />
            <Button type="submit" disabled={loading} className="h-11 rounded-xl px-6">
              {loading ? "Subscribing..." : "Subscribe"}
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

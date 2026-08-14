"use client";

import { useEffect, useState } from "react";
import { Share2, Star } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/tools/breadcrumb";
import { ToolFAQ } from "@/components/tools/tool-faq";
import { RelatedTools } from "@/components/tools/related-tools";
import { CopyButton } from "@/components/shared/copy-button";
import { GradientBackground } from "@/components/shared/gradient-background";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/stores/use-app-store";
import { getCategoryBySlug } from "@/services/categories";
import { getRelatedTools } from "@/services/tools";
import { getIcon } from "@/lib/icons";
import { SITE_CONFIG } from "@/lib/constants";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

/**
 * Reusable layout shell for every developer tool page.
 * Handles breadcrumbs, SEO content sections, favorites, and share.
 */
export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { toggleFavorite, isFavorite, addToHistory } = useAppStore();
  const category = getCategoryBySlug(tool.category);
  const relatedTools = getRelatedTools(tool);
  const Icon = getIcon(tool.icon);
  const favorited = mounted && isFavorite(tool.slug);
  const toolUrl = `${SITE_CONFIG.url}/tool/${tool.slug}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    addToHistory(tool.slug);
  }, [tool.slug, addToHistory]);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ title: tool.name, url: toolUrl });
    } else {
      await navigator.clipboard.writeText(toolUrl);
      toast.success("Link copied to clipboard");
    }
  }

  return (
    <div>
      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: category?.name ?? "Tools", href: `/category/${tool.category}` },
              { name: tool.name, href: `/tool/${tool.slug}` },
            ]}
          />

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br",
                  category?.gradient ?? "from-teal-500/20 to-emerald-500/20"
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {tool.name}
                  </h1>
                  {tool.isNew && <Badge variant="secondary">New</Badge>}
                </div>
                <p className="mt-2 max-w-2xl text-muted-foreground">{tool.description}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant={favorited ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleFavorite(tool.slug)}
                aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={cn("size-4", favorited && "fill-amber-400 text-amber-400")}
                />
                {favorited ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="size-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </GradientBackground>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tool workspace */}
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
          {children}
        </div>

        {/* Examples */}
        {tool.examples.length > 0 && (
          <section className="mt-12" aria-labelledby="examples-heading">
            <h2 id="examples-heading" className="text-xl font-semibold tracking-tight">
              Examples
            </h2>
            <div className="mt-4 space-y-4">
              {tool.examples.map((example, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border/60 bg-muted/30 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-medium">{example.title}</h3>
                    {example.input && <CopyButton value={example.input} label="Copy input" />}
                  </div>
                  {example.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{example.description}</p>
                  )}
                  {example.input && (
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs">
                      {example.input}
                    </pre>
                  )}
                  {example.output && (
                    <pre className="mt-2 overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                      {example.output}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <Separator className="my-12" />

        <div className="grid gap-12 lg:grid-cols-2">
          <ToolFAQ faqs={tool.faqs} />
          <RelatedTools tools={relatedTools} />
        </div>
      </div>
    </div>
  );
}

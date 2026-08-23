"use client";

import { useEffect } from "react";
import { Share2, Star } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/tools/breadcrumb";
import { ToolFAQ } from "@/components/tools/tool-faq";
import { RelatedTools } from "@/components/tools/related-tools";
import { CopyButton } from "@/components/shared/copy-button";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { GradientBackground } from "@/components/shared/gradient-background";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsClient } from "@/hooks/use-is-client";
import { useAppStore } from "@/stores/use-app-store";
import { getCategoryBySlug } from "@/services/categories";
import { getRelatedTools } from "@/services/tools";
import { getToolH1, absoluteCanonical } from "@/lib/seo";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";
import { ToolTrustStrip } from "@/components/tools/tool-trust-strip";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

/**
 * Reusable layout shell for every tool page.
 * Handles breadcrumbs, trust strip, favorites, share, examples, FAQ, related.
 */
export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const mounted = useIsClient();
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const addToHistory = useAppStore((s) => s.addToHistory);
  const favorited = useAppStore((s) => s.favorites.includes(tool.slug));
  const category = getCategoryBySlug(tool.category);
  const relatedTools = getRelatedTools(tool);
  const toolUrl = absoluteCanonical(`/tool/${tool.slug}`);
  const showFavorite = mounted && favorited;

  useEffect(() => {
    addToHistory(tool.slug);
  }, [tool.slug, addToHistory]);

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title: tool.name, url: toolUrl });
        return;
      }
      await navigator.clipboard.writeText(toolUrl);
      toast.success("Link copied to clipboard");
    } catch {
      // User cancelled share sheet or clipboard blocked — ignore.
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
                <DynamicIcon name={tool.icon} className="size-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {getToolH1(tool)}
                  </h1>
                  {tool.isNew && <Badge variant="secondary">New</Badge>}
                </div>
                <p className="mt-2 max-w-2xl text-muted-foreground">{tool.description}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant={showFavorite ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleFavorite(tool.slug)}
                aria-label={showFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={cn("size-4", showFavorite && "fill-amber-400 text-amber-400")}
                />
                {showFavorite ? "Saved" : "Save"}
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
        <div className="mb-4">
          <ToolTrustStrip local />
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
          {children}
        </div>

        {tool.examples.length > 0 && (
          <section className="mt-12" aria-labelledby="examples-heading">
            <h2 id="examples-heading" className="text-xl font-semibold tracking-tight">
              Examples
            </h2>
            <div className="mt-4 space-y-4">
              {tool.examples.map((example, index) => (
                <div
                  key={`${example.title}-${index}`}
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

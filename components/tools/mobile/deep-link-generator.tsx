"use client";

import { useMemo, useState } from "react";
import { Eraser, Link2, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DEEP_LINK_SAMPLE,
  buildDeepLink,
  type DeepLinkFields,
  type DeepLinkPlatform,
} from "@/lib/tools/deep-link";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const PLATFORMS: { value: DeepLinkPlatform; label: string }[] = [
  { value: "custom", label: "Custom scheme" },
  { value: "https", label: "HTTPS / Universal" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
];

/**
 * Build custom scheme, universal, and Android intent deep links.
 */
export function DeepLinkGenerator(_props: ToolComponentProps) {
  const [fields, setFields] = useState<DeepLinkFields>(DEEP_LINK_SAMPLE);
  const built = useMemo(() => buildDeepLink(fields), [fields]);

  function patch<K extends keyof DeepLinkFields>(key: K, value: DeepLinkFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setFields(DEEP_LINK_SAMPLE)}
          className="gap-1.5"
        >
          <Sparkles className="size-4" />
          Sample
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            setFields({
              platform: "custom",
              scheme: "",
              host: "",
              path: "",
              query: "",
              packageName: "",
              appStoreId: "",
              fallbackUrl: "",
            })
          }
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link2 className="size-3.5" />
          Live build
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Platform">
        {PLATFORMS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => patch("platform", p.value)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              fields.platform === p.value
                ? "border-border bg-muted font-medium"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={fields.platform === p.value}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dl-scheme">Scheme</Label>
          <Input
            id="dl-scheme"
            value={fields.scheme}
            onChange={(e) => patch("scheme", e.target.value)}
            placeholder="myapp"
            className="font-mono"
            disabled={fields.platform === "https"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dl-host">Host</Label>
          <Input
            id="dl-host"
            value={fields.host}
            onChange={(e) => patch("host", e.target.value)}
            placeholder={fields.platform === "https" ? "example.com" : "product"}
            className="font-mono"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="dl-path">Path</Label>
          <Input
            id="dl-path"
            value={fields.path}
            onChange={(e) => patch("path", e.target.value)}
            placeholder="123"
            className="font-mono"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="dl-query">Query (key=value per line)</Label>
          <Textarea
            id="dl-query"
            value={fields.query}
            onChange={(e) => patch("query", e.target.value)}
            className="min-h-[88px] font-mono text-xs"
            placeholder={"ref=home\nutm_source=share"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dl-pkg">Android package</Label>
          <Input
            id="dl-pkg"
            value={fields.packageName}
            onChange={(e) => patch("packageName", e.target.value)}
            placeholder="com.example.app"
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dl-store">App Store ID</Label>
          <Input
            id="dl-store"
            value={fields.appStoreId}
            onChange={(e) => patch("appStoreId", e.target.value)}
            placeholder="123456789"
            className="font-mono"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="dl-fallback">Fallback / Universal URL</Label>
          <Input
            id="dl-fallback"
            value={fields.fallbackUrl}
            onChange={(e) => patch("fallbackUrl", e.target.value)}
            placeholder="https://example.com/…"
            className="font-mono"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Generated links</Label>
        {built.variants.map((v) => (
          <div
            key={v.label}
            className="flex flex-col gap-2 rounded-xl border border-border/60 bg-muted/20 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground">{v.label}</div>
              <code className="mt-1 block break-all font-mono text-xs">{v.url}</code>
            </div>
            <CopyButton value={v.url} label={`Copy ${v.label}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

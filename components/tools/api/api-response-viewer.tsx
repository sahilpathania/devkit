"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Eraser, Sparkles, Terminal } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  API_SAMPLE_JSON,
  filterTree,
  parseApiResponse,
  type ApiTreeNode,
} from "@/lib/tools/api-response";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

function TreeNode({ node, depth = 0 }: { node: ApiTreeNode; depth?: number }) {
  const hasKids = Boolean(node.children?.length);
  const [open, setOpen] = useState(depth < 2);

  return (
    <div className="font-mono text-xs">
      <button
        type="button"
        className={cn(
          "flex w-full items-start gap-1 rounded-md px-1 py-0.5 text-left hover:bg-muted/40",
          !hasKids && "cursor-default"
        )}
        onClick={() => hasKids && setOpen((v) => !v)}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        {hasKids ? (
          open ? (
            <ChevronDown className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          )
        ) : (
          <span className="mt-0.5 size-3.5 shrink-0" />
        )}
        <span className="font-medium text-teal-700 dark:text-teal-400">{node.key}</span>
        <span className="text-muted-foreground">: {node.type}</span>
        {node.preview && !hasKids && (
          <span className="ml-1 truncate text-foreground/80">{node.preview}</span>
        )}
        {hasKids && node.preview && (
          <span className="ml-1 text-muted-foreground">{node.preview}</span>
        )}
      </button>
      {hasKids && open &&
        node.children!.map((child) => (
          <TreeNode key={child.id} node={child} depth={depth + 1} />
        ))}
    </div>
  );
}

/**
 * Explore pasted JSON/XML API responses with tree + formatted views.
 */
export function ApiResponseViewer(_props: ToolComponentProps) {
  const [input, setInput] = useState(API_SAMPLE_JSON);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"tree" | "raw">("tree");

  const parsed = useMemo(() => parseApiResponse(input), [input]);
  const tree = useMemo(() => {
    if (!parsed.success) return [];
    return filterTree(parsed.tree, query);
  }, [parsed, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput(API_SAMPLE_JSON);
            setQuery("");
          }}
          className="gap-1.5"
        >
          <Sparkles className="size-4" />
          Sample
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput("");
            setQuery("");
          }}
          className="gap-1.5 text-muted-foreground"
        >
          <Eraser className="size-4" />
          Clear
        </Button>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Terminal className="size-3.5" />
          {parsed.success ? parsed.kind.toUpperCase() : "—"}
        </span>
        {parsed.success && (
          <CopyButton value={parsed.formatted} label="Copy formatted" />
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="api-input">Response body</Label>
          <Textarea
            id="api-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"ok": true}'
            className="min-h-[360px] font-mono text-xs"
            spellCheck={false}
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex rounded-lg border border-border/60 p-0.5" role="group">
              {(
                [
                  { value: "tree" as const, label: "Tree" },
                  { value: "raw" as const, label: "Formatted" },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTab(option.value)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs transition-colors",
                    tab === option.value
                      ? "bg-muted font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-pressed={tab === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {tab === "tree" && (
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter keys…"
                className="h-8 max-w-[180px] font-mono text-xs"
              />
            )}
          </div>

          {!parsed.success ? (
            <p className="text-sm text-destructive">{parsed.error}</p>
          ) : tab === "tree" ? (
            <div className="max-h-[360px] overflow-auto rounded-xl border border-border/60 bg-muted/20 p-2">
              {tree.length === 0 ? (
                <p className="p-2 text-sm text-muted-foreground">No matches</p>
              ) : (
                tree.map((node) => <TreeNode key={node.id} node={node} />)
              )}
            </div>
          ) : (
            <pre className="max-h-[360px] overflow-auto rounded-xl border border-border/60 bg-muted/20 p-3 font-mono text-xs">
              {parsed.formatted}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Folder, Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getActiveCategories, getPopularTools, searchTools } from "@/services/tools";
import { getCategoryBySlug } from "@/services/categories";
import { getIcon } from "@/lib/icons";
import { POPULAR_SEARCHES, SEARCH_PLACEHOLDERS } from "@/lib/constants";
import { useAppStore } from "@/stores/use-app-store";
import { useIsClient } from "@/hooks/use-is-client";
import { searchPath } from "@/utils/url";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  rotatePlaceholders?: boolean;
}

function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-amber-200/80 px-0.5 text-inherit dark:bg-amber-500/30">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function groupByCategory(tools: Tool[]) {
  const map = new Map<string, { name: string; tools: Tool[] }>();
  for (const tool of tools) {
    const cat = getCategoryBySlug(tool.category);
    const key = cat?.slug ?? tool.category;
    const name = cat?.name ?? tool.category;
    if (!map.has(key)) map.set(key, { name, tools: [] });
    map.get(key)!.tools.push(tool);
  }
  return Array.from(map.values());
}

type FlatItem =
  | { type: "tool"; tool: Tool }
  | { type: "search"; query: string }
  | { type: "category"; slug: string }
  | { type: "view-all"; query: string };

export function SearchBar({
  className,
  autoFocus = false,
  placeholder,
  rotatePlaceholders = false,
}: SearchBarProps) {
  const router = useRouter();
  const mounted = useIsClient();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);
  const recentSearches = useAppStore((s) => s.recentSearches);

  useEffect(() => {
    if (!rotatePlaceholders) return;
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [rotatePlaceholders]);

  const livePlaceholder = rotatePlaceholders
    ? `Search for: ${SEARCH_PLACEHOLDERS[placeholderIndex]}`
    : (placeholder ?? "Search tools…");

  const results = useMemo(() => {
    if (query.trim().length < 1) return [];
    return searchTools(query).slice(0, 12);
  }, [query]);

  const groups = useMemo(() => groupByCategory(results), [results]);
  const trending = useMemo(() => getPopularTools(5), []);
  const categories = useMemo(() => getActiveCategories().slice(0, 6), []);

  const flatItems: FlatItem[] = useMemo(() => {
    if (query.trim()) {
      const items: FlatItem[] = groups.flatMap((g) =>
        g.tools.map((tool) => ({ type: "tool" as const, tool }))
      );
      if (results.length > 0) items.push({ type: "view-all", query: query.trim() });
      return items;
    }
    const items: FlatItem[] = [];
    if (mounted) {
      for (const q of recentSearches.slice(0, 4)) {
        items.push({ type: "search", query: q });
      }
    }
    for (const tool of trending) {
      items.push({ type: "tool", tool });
    }
    for (const cat of categories) {
      items.push({ type: "category", slug: cat.slug });
    }
    return items;
  }, [categories, groups, mounted, query, recentSearches, results.length, trending]);

  const showPanel = focused;
  const hasQuery = query.trim().length > 0;

  const rememberAndGo = useCallback(
    (slug: string, searchTerm?: string) => {
      if (searchTerm) addRecentSearch(searchTerm);
      else if (query.trim()) addRecentSearch(query);
      setQuery("");
      setFocused(false);
      setActiveIndex(-1);
      router.push(`/tool/${slug}`);
    },
    [addRecentSearch, query, router]
  );

  const runSearchQuery = useCallback(
    (q: string) => {
      addRecentSearch(q);
      const matches = searchTools(q);
      if (matches.length === 1) {
        rememberAndGo(matches[0].slug, q);
        return;
      }
      setQuery("");
      setFocused(false);
      router.push(searchPath(q));
    },
    [addRecentSearch, rememberAndGo, router]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const active = flatItems[activeIndex];
    if (active?.type === "tool") {
      rememberAndGo(active.tool.slug);
      return;
    }
    if (active?.type === "search") {
      runSearchQuery(active.query);
      return;
    }
    if (active?.type === "view-all") {
      addRecentSearch(active.query);
      router.push(searchPath(active.query));
      setFocused(false);
      return;
    }
    if (active?.type === "category") {
      setFocused(false);
      router.push(`/category/${active.slug}`);
      return;
    }
    const trimmed = query.trim();
    if (!trimmed) return;
    runSearchQuery(trimmed);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      setQuery("");
      setFocused(false);
      setActiveIndex(-1);
      e.currentTarget.blur();
      return;
    }
    if (!flatItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  let flatCursor = -1;

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit} role="search">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onFocus={() => {
              if (blurTimer.current) clearTimeout(blurTimer.current);
              setFocused(true);
            }}
            onBlur={() => {
              blurTimer.current = setTimeout(() => setFocused(false), 180);
            }}
            onKeyDown={onKeyDown}
            placeholder={livePlaceholder}
            autoFocus={autoFocus}
            className={cn(
              "h-14 rounded-2xl border-border/55 bg-background/95 pl-11 pr-20 text-base backdrop-blur-md",
              "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]",
              "transition-[box-shadow,border-color,transform] duration-200 ease-out",
              "focus-visible:border-foreground/20 focus-visible:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_16px_40px_-12px_rgba(0,0,0,0.22)]",
              "dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-10px_rgba(0,0,0,0.55)]",
              "dark:focus-visible:shadow-[0_1px_2px_rgba(0,0,0,0.25),0_20px_48px_-12px_rgba(0,0,0,0.7)]"
            )}
            aria-label="Search tools"
            aria-expanded={showPanel}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined
            }
          />
          <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-border/70 bg-muted/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className="absolute top-full z-50 mt-2.5 max-h-[min(520px,72vh)] w-full overflow-auto rounded-2xl border border-border/55 bg-popover/98 p-2 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65)]"
        >
          {hasQuery && results.length === 0 && (
            <div className="px-3 py-8 text-center">
              <p className="text-sm font-medium">No tools found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try “pdf”, “image”, “json”, or “password”.
              </p>
            </div>
          )}

          {hasQuery &&
            groups.map((group) => (
              <div key={group.name} className="mb-1">
                <p className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {group.name}
                </p>
                <ul>
                  {group.tools.map((tool) => {
                    flatCursor += 1;
                    const index = flatCursor;
                    const Icon = getIcon(tool.icon);
                    const active = index === activeIndex;
                    return (
                      <li
                        key={tool.slug}
                        role="option"
                        aria-selected={active}
                        id={`${listId}-opt-${index}`}
                      >
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors duration-150",
                            active ? "bg-muted" : "hover:bg-muted/70"
                          )}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={() => rememberAndGo(tool.slug)}
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/80">
                            <Icon className="size-4 text-muted-foreground" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">
                              {highlightMatch(tool.name, query)}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {tool.shortDescription}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          {hasQuery && results.length > 0 && (
            (() => {
              flatCursor += 1;
              const index = flatCursor;
              const active = index === activeIndex;
              return (
                <button
                  type="button"
                  id={`${listId}-opt-${index}`}
                  role="option"
                  aria-selected={active}
                  className={cn(
                    "mt-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left text-sm text-muted-foreground transition-colors duration-150",
                    active ? "bg-muted text-foreground" : "hover:bg-muted hover:text-foreground"
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={() => {
                    addRecentSearch(query);
                    router.push(searchPath(query));
                    setFocused(false);
                  }}
                >
                  <Search className="size-4" />
                  View all results for “{query.trim()}”
                </button>
              );
            })()
          )}

          {!hasQuery && (
            <>
              {mounted && recentSearches.length > 0 && (
                <div className="mb-2">
                  <p className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <Clock className="size-3" />
                    Recent
                  </p>
                  <ul>
                    {recentSearches.slice(0, 4).map((q) => {
                      flatCursor += 1;
                      const index = flatCursor;
                      const active = index === activeIndex;
                      return (
                        <li key={q} role="option" aria-selected={active} id={`${listId}-opt-${index}`}>
                          <button
                            type="button"
                            className={cn(
                              "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm capitalize transition-colors duration-150",
                              active ? "bg-muted" : "hover:bg-muted/70"
                            )}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseDown={() => runSearchQuery(q)}
                          >
                            <Clock className="size-3.5 text-muted-foreground" />
                            {q}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="mb-2">
                <p className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="size-3" />
                  Popular tools
                </p>
                <ul>
                  {trending.map((tool) => {
                    flatCursor += 1;
                    const index = flatCursor;
                    const Icon = getIcon(tool.icon);
                    const active = index === activeIndex;
                    return (
                      <li
                        key={tool.slug}
                        role="option"
                        aria-selected={active}
                        id={`${listId}-opt-${index}`}
                      >
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors duration-150 ease-out",
                            active ? "bg-muted" : "hover:bg-muted/70"
                          )}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={() => rememberAndGo(tool.slug)}
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/80">
                            <Icon className="size-4 text-muted-foreground" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{tool.name}</span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {tool.shortDescription}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {POPULAR_SEARCHES.length > 0 && (
                  <div className="mt-2">
                    <p className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      Popular searches
                    </p>
                    <div className="flex flex-wrap gap-1.5 px-2.5 pb-1">
                      {POPULAR_SEARCHES.slice(0, 5).map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-all duration-150 ease-out hover:border-border hover:bg-muted hover:text-foreground"
                          onMouseDown={() => runSearchQuery(item.query)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <Folder className="size-3" />
                  Categories
                </p>
                <ul>
                  {categories.map((cat) => {
                    flatCursor += 1;
                    const index = flatCursor;
                    const Icon = getIcon(cat.icon);
                    const active = index === activeIndex;
                    return (
                      <li
                        key={cat.slug}
                        role="option"
                        aria-selected={active}
                        id={`${listId}-opt-${index}`}
                      >
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors duration-150 ease-out",
                            active ? "bg-muted" : "hover:bg-muted/70"
                          )}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={() => {
                            setFocused(false);
                            router.push(`/category/${cat.slug}`);
                          }}
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/80">
                            <Icon className="size-4 text-muted-foreground" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{cat.name}</span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {cat.description}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

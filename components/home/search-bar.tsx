"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchTools } from "@/services/tools";
import { getIcon } from "@/lib/icons";
import { SEARCH_PLACEHOLDERS } from "@/lib/constants";
import { searchPath } from "@/utils/url";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  rotatePlaceholders?: boolean;
}

export function SearchBar({
  className,
  autoFocus = false,
  placeholder,
  rotatePlaceholders = false,
}: SearchBarProps) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (query.length < 1) return [];
    return searchTools(query).slice(0, 8);
  }, [query]);

  const showList = focused && (query.length >= 1 || results.length > 0);

  const handleSelect = useCallback(
    (slug: string) => {
      setQuery("");
      setFocused(false);
      setActiveIndex(-1);
      router.push(`/tool/${slug}`);
    },
    [router]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      handleSelect(results[activeIndex].slug);
      return;
    }
    const trimmed = query.trim();
    if (!trimmed) return;
    const matches = searchTools(trimmed);
    if (matches.length === 1) {
      handleSelect(matches[0].slug);
      return;
    }
    setFocused(false);
    router.push(searchPath(trimmed));
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
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex].slug);
    }
  }

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
            className="h-14 rounded-2xl border-border/60 bg-background/90 pl-11 pr-24 text-base shadow-xl shadow-black/5 backdrop-blur-md transition-shadow focus-visible:shadow-black/10 dark:shadow-black/30"
            aria-label="Search tools"
            aria-expanded={showList && results.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined
            }
          />
          <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-border/70 bg-muted/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>
      </form>

      {showList && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full z-50 mt-2 max-h-[min(420px,70vh)] w-full overflow-auto rounded-2xl border border-border/60 bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl"
        >
          {results.map((tool, index) => {
            const Icon = getIcon(tool.icon);
            const active = index === activeIndex;
            return (
              <li key={tool.slug} role="option" aria-selected={active} id={`${listId}-opt-${index}`}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    active ? "bg-muted" : "hover:bg-muted/70"
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={() => handleSelect(tool.slug)}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
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
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onMouseDown={() => router.push(searchPath(query))}
            >
              <Search className="size-4" />
              View all results for “{query.trim()}”
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

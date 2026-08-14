"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchTools } from "@/services/tools";
import { getIcon } from "@/lib/icons";
import { searchPath } from "@/utils/url";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

export function SearchBar({
  className,
  autoFocus = false,
  placeholder = "Search 100+ developer tools...",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    return searchTools(query).slice(0, 5);
  }, [query]);

  function handleSelect(slug: string) {
    setQuery("");
    setFocused(false);
    router.push(`/tool/${slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    // Single exact match → go straight to the tool; otherwise open search results.
    const matches = searchTools(trimmed);
    if (matches.length === 1) {
      handleSelect(matches[0].slug);
      return;
    }
    setFocused(false);
    router.push(searchPath(trimmed));
  }

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit} role="search">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="h-12 rounded-xl border-border/60 bg-background/80 pl-10 text-base shadow-lg shadow-teal-500/5 backdrop-blur-sm transition-shadow focus-visible:shadow-teal-500/10"
            aria-label="Search developer tools"
            aria-expanded={focused && results.length > 0}
            aria-controls="search-results"
          />
        </div>
      </form>

      {focused && results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border/60 bg-popover p-1 shadow-xl"
        >
          {results.map((tool) => {
            const Icon = getIcon(tool.icon);
            return (
              <li key={tool.slug} role="option">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                  onMouseDown={() => handleSelect(tool.slug)}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.shortDescription}</p>
                  </div>
                </button>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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

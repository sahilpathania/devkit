"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { ToolCard } from "@/components/tools/tool-card";
import { Input } from "@/components/ui/input";
import { searchTools } from "@/services/tools";

interface SearchResultsProps {
  initialQuery?: string;
}

/** Client search UI for /search — syncs query to the URL for shareable results. */
export function SearchResults({ initialQuery = "" }: SearchResultsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchTools(query), [query]);

  function handleChange(value: string) {
    setQuery(value);
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.replace(params.toString() ? `/search?${params}` : "/search", { scroll: false });
  }

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search tools..."
          autoFocus
          className="h-12 rounded-xl border-border/60 pl-10 text-base"
          aria-label="Search tools"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground" role="status">
        {query.trim()
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${query.trim()}”`
          : `${results.length} tools available`}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Star,
  Wrench,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useAppStore } from "@/stores/use-app-store";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { getActiveCategories } from "@/services/tools";
import { TOOLS, getToolBySlug, searchTools } from "@/services/tools";
import { getIcon } from "@/lib/icons";

/** Global command palette — Ctrl/Cmd+K to open. */
export function CommandPalette() {
  const router = useRouter();
  const { isCommandPaletteOpen, setCommandPaletteOpen, favorites, recentHistory } =
    useAppStore();
  const [query, setQuery] = useState("");

  const open = useCallback(() => setCommandPaletteOpen(true), [setCommandPaletteOpen]);
  const close = useCallback(() => {
    setCommandPaletteOpen(false);
    setQuery("");
  }, [setCommandPaletteOpen]);

  useKeyboardShortcut(open, { key: "k", modifier: "meta" });

  const filteredTools = useMemo(() => {
    const q = query.trim();
    if (!q) return TOOLS;
    return searchTools(q);
  }, [query]);

  const favoriteTools = favorites
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);

  const recentTools = recentHistory
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);

  function navigate(href: string) {
    close();
    router.push(href);
  }

  return (
    <CommandDialog open={isCommandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput
        placeholder="Search tools, categories..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {favoriteTools.length > 0 && !query && (
          <CommandGroup heading="Favorites">
            {favoriteTools.map((tool) => {
              if (!tool) return null;
              const Icon = getIcon(tool.icon);
              return (
                <CommandItem
                  key={tool.slug}
                  value={tool.name}
                  onSelect={() => navigate(`/tool/${tool.slug}`)}
                >
                  <Star className="size-4 text-amber-500" />
                  <span>{tool.name}</span>
                  <CommandShortcut>Enter</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {recentTools.length > 0 && !query && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Recent">
              {recentTools.map((tool) => {
                if (!tool) return null;
                const Icon = getIcon(tool.icon);
                return (
                  <CommandItem
                    key={tool.slug}
                    value={`recent-${tool.slug}`}
                    onSelect={() => navigate(`/tool/${tool.slug}`)}
                  >
                    <Clock className="size-4" />
                    <span>{tool.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Tools">
          {filteredTools.map((tool) => {
            const Icon = getIcon(tool.icon);
            return (
              <CommandItem
                key={tool.slug}
                value={tool.name}
                onSelect={() => navigate(`/tool/${tool.slug}`)}
              >
                <Icon className="size-4" />
                <span>{tool.name}</span>
                <ArrowRight className="ml-auto size-3 opacity-50" />
              </CommandItem>
            );
          })}
        </CommandGroup>

        {!query && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Categories">
              {getActiveCategories().map((category) => {
                const Icon = getIcon(category.icon);
                return (
                  <CommandItem
                    key={category.slug}
                    value={category.name}
                    onSelect={() => navigate(`/category/${category.slug}`)}
                  >
                    <Icon className="size-4" />
                    <span>{category.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => navigate("/")}>
            <Wrench className="size-4" />
            <span>Go to Homepage</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

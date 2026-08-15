"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/use-app-store";
import { getActiveCategories } from "@/services/tools";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const setCommandPaletteOpen = useAppStore((s) => s.setCommandPaletteOpen);
  const categories = getActiveCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="hidden gap-2 rounded-xl text-muted-foreground sm:flex"
            onClick={() => setCommandPaletteOpen(true)}
          >
            <Search className="size-3.5" />
            <span>Search</span>
            <kbd className="pointer-events-none ml-1 hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium lg:inline-block">
              ⌘K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="sm:hidden"
            onClick={() => setCommandPaletteOpen(true)}
            aria-label="Open search"
          >
            <Search className="size-4" />
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 lg:hidden",
          mobileOpen ? "max-h-[70vh]" : "max-h-0"
        )}
      >
        <nav
          className="flex max-h-[70vh] flex-col gap-1 overflow-auto p-4"
          aria-label="Mobile navigation"
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

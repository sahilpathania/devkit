"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/use-app-store";
import { getActiveCategories } from "@/services/tools";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const setCommandPaletteOpen = useAppStore((s) => s.setCommandPaletteOpen);
  const categories = getActiveCategories();

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (mobileOpen) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      if (y < 48) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6) {
        setHidden(false);
      }
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background transition-transform duration-200 ease-out",
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
        scrolled ? "border-b border-border/60" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo priority />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={cn(
                "group relative rounded-full px-3 py-2 text-sm font-medium text-muted-foreground",
                "transition-colors duration-200 hover:text-foreground"
              )}
            >
              {category.name}
              <span
                aria-hidden
                className="absolute inset-x-3 -bottom-1 h-px origin-left scale-x-0 bg-foreground/70 transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 gap-2 rounded-full border-border/70 bg-background px-3 text-muted-foreground shadow-sm transition-all duration-200 hover:text-foreground sm:flex"
            onClick={() => setCommandPaletteOpen(true)}
          >
            <Search className="size-3.5" />
            <span className="text-sm font-medium">Search</span>
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
          "overflow-hidden border-t border-border/50 transition-[max-height] duration-200 ease-out lg:hidden",
          mobileOpen ? "max-h-[70vh]" : "max-h-0 border-transparent"
        )}
      >
        <nav
          className="flex max-h-[70vh] flex-col gap-0.5 overflow-auto p-3"
          aria-label="Mobile navigation"
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
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

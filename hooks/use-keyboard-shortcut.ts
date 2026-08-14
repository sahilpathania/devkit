"use client";

import { useEffect } from "react";

interface KeyboardShortcutOptions {
  key: string;
  /** Use metaKey on Mac, ctrlKey on Windows/Linux */
  modifier?: "meta" | "ctrl" | "shift" | "alt" | null;
  enabled?: boolean;
  preventDefault?: boolean;
}

/** Register a global keyboard shortcut. */
export function useKeyboardShortcut(
  callback: () => void,
  { key, modifier = null, enabled = true, preventDefault = true }: KeyboardShortcutOptions
) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (modifier === null && isInput) return;

      const modifierMatch =
        modifier === "meta"
          ? event.metaKey || event.ctrlKey
          : modifier === "ctrl"
            ? event.ctrlKey
            : modifier === "shift"
              ? event.shiftKey
              : modifier === "alt"
                ? event.altKey
                : !event.metaKey && !event.ctrlKey && !event.altKey;

      if (event.key.toLowerCase() === key.toLowerCase() && modifierMatch) {
        if (preventDefault) event.preventDefault();
        callback();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback, key, modifier, enabled, preventDefault]);
}

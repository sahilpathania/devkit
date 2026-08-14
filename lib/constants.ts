/** Site-wide configuration — single source of truth for branding and URLs. */
export const SITE_CONFIG = {
  name: "DevKit",
  tagline: "Developer tools that just work",
  description:
    "100+ free, fast, and privacy-friendly developer tools. Format JSON, decode JWTs, generate UUIDs, and more — no login required.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devkit.dev",
  twitter: "@devkit",
  github: "https://github.com/devkit",
} as const;

/** Keyboard shortcut labels for accessibility and tooltips. */
export const KEYBOARD_SHORTCUTS = {
  commandPalette: { key: "k", modifier: "meta", label: "⌘K" },
  search: { key: "/", modifier: null, label: "/" },
  theme: { key: "d", modifier: "meta", label: "⌘D" },
} as const;

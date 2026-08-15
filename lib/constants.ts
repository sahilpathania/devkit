/** Site-wide configuration — single source of truth for branding and URLs. */
export const SITE_CONFIG = {
  name: "DevKit",
  tagline: "Everything you need. One place.",
  description:
    "The fastest online toolkit for everyone — compress and convert files, generate QR codes, format data, and solve everyday digital tasks in seconds. Free, private, no login.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devkit.dev",
  twitter: "@devkit",
  github: "https://github.com/devkit",
} as const;

/** Rotating search placeholders on the homepage. */
export const SEARCH_PLACEHOLDERS = [
  "Compress PDF",
  "Resize Image",
  "JSON Formatter",
  "QR Generator",
  "Word to PDF",
  "Merge PDF",
  "Age Calculator",
  "Base64 Encoder",
  "Color Converter",
  "UUID Generator",
  "Regex Tester",
  "Currency Converter",
] as const;

/** Keyboard shortcut labels for accessibility and tooltips. */
export const KEYBOARD_SHORTCUTS = {
  commandPalette: { key: "k", modifier: "meta", label: "⌘K" },
  search: { key: "/", modifier: null, label: "/" },
  theme: { key: "d", modifier: "meta", label: "⌘D" },
} as const;

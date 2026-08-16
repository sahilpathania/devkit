/** Site-wide configuration — single source of truth for branding and URLs. */
export const SITE_CONFIG = {
  name: "DevKit",
  tagline: "Everything you need. One place.",
  description:
    "Convert, compress, and edit files in your browser. Free online tools — private by default, no sign-up.",
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
  "Passport Photo",
  "Merge PDF",
  "Compress Image",
  "Split PDF",
  "Password Generator",
  "Word to PDF",
] as const;

/** Popular search chips under the hero (real tools only). */
export const POPULAR_SEARCHES = [
  { label: "Merge PDF", query: "merge pdf", icon: "file-text" as const },
  { label: "Compress Image", query: "compress image", icon: "image" as const },
  { label: "QR Generator", query: "qr", icon: "qr-code" as const },
  { label: "JSON Formatter", query: "json formatter", icon: "braces" as const },
  { label: "Password Generator", query: "password", icon: "lock" as const },
  { label: "Split PDF", query: "split pdf", icon: "file-text" as const },
] as const;

/** Hero capability badges (honest, not fake metrics). */
export const HERO_CAPABILITIES = [
  "Convert PDFs",
  "Compress Images",
  "Edit Documents",
  "Generate QR Codes",
  "Developer Utilities",
] as const;

export const HERO_TRUST_BADGES = [
  "Fast",
  "Private",
  "Free",
  "No Sign Up Required",
] as const;

/** Keyboard shortcut labels for accessibility and tooltips. */
export const KEYBOARD_SHORTCUTS = {
  commandPalette: { key: "k", modifier: "meta", label: "⌘K" },
  search: { key: "/", modifier: null, label: "/" },
  theme: { key: "d", modifier: "meta", label: "⌘D" },
} as const;

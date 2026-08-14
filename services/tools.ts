import type { Tool } from "@/types";

/**
 * Central tool registry — add new tools here to automatically
 * populate search, categories, sitemap, and routing.
 */
export const TOOLS: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description:
      "Beautify and minify JSON with syntax highlighting. Paste messy JSON and get perfectly formatted output in milliseconds.",
    shortDescription: "Beautify and minify JSON instantly",
    icon: "braces",
    category: "json-tools",
    component: "json-formatter",
    seo: {
      title: "JSON Formatter — Beautify & Minify JSON Online",
      description:
        "Free online JSON formatter. Beautify, minify, and validate JSON with syntax highlighting. No signup required.",
      keywords: ["json formatter", "json beautifier", "json minify", "format json"],
    },
    faqs: [
      {
        question: "Does this JSON formatter store my data?",
        answer:
          "No. All formatting happens locally in your browser. Your JSON never leaves your device.",
      },
      {
        question: "Can I minify JSON as well as beautify it?",
        answer:
          "Yes. Toggle between pretty-print and minified output with one click.",
      },
    ],
    examples: [
      {
        title: "Beautify compact JSON",
        input: '{"name":"DevKit","tools":100,"free":true}',
        output: '{\n  "name": "DevKit",\n  "tools": 100,\n  "free": true\n}',
      },
    ],
    tags: ["json", "format", "beautify"],
    isFeatured: true,
    isPopular: true,
    createdAt: "2026-01-15",
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    description:
      "Validate JSON syntax and get detailed error messages with line numbers. Perfect for debugging API responses.",
    shortDescription: "Validate JSON syntax with detailed errors",
    icon: "shield-check",
    category: "json-tools",
    component: "json-validator",
    seo: {
      title: "JSON Validator — Check JSON Syntax Online",
      description:
        "Free JSON validator with line-by-line error reporting. Instantly check if your JSON is valid.",
      keywords: ["json validator", "validate json", "json syntax checker"],
    },
    faqs: [
      {
        question: "What JSON standards are supported?",
        answer: "We validate against standard JSON (RFC 8259) including nested objects and arrays.",
      },
    ],
    examples: [
      {
        title: "Invalid trailing comma",
        input: '{"key": "value",}',
        description: "Detects trailing commas and reports the exact line.",
      },
    ],
    tags: ["json", "validate", "syntax"],
    isPopular: true,
    createdAt: "2026-01-20",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description:
      "Decode JSON Web Tokens and inspect header, payload, and signature. Verify claims and expiration dates.",
    shortDescription: "Decode and inspect JWT tokens",
    icon: "key-round",
    category: "security",
    component: "jwt-decoder",
    seo: {
      title: "JWT Decoder — Decode JSON Web Tokens Online",
      description:
        "Free JWT decoder. Inspect token headers, payloads, and claims. Works entirely in your browser.",
      keywords: ["jwt decoder", "decode jwt", "json web token"],
    },
    faqs: [
      {
        question: "Is it safe to paste my JWT here?",
        answer:
          "Tokens are decoded locally. However, never paste production tokens with sensitive data into any online tool.",
      },
    ],
    examples: [
      {
        title: "Decode a sample JWT",
        input: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U",
      },
    ],
    tags: ["jwt", "security", "decode", "auth"],
    isFeatured: true,
    isPopular: true,
    createdAt: "2026-01-10",
  },
  {
    slug: "base64",
    name: "Base64 Encode/Decode",
    description:
      "Encode text to Base64 or decode Base64 strings back to plain text. Supports UTF-8 and file encoding.",
    shortDescription: "Encode and decode Base64 strings",
    icon: "binary",
    category: "encoding",
    component: "base64",
    seo: {
      title: "Base64 Encoder & Decoder — Free Online Tool",
      description:
        "Encode and decode Base64 strings instantly. Supports UTF-8 text and binary data.",
      keywords: ["base64 encode", "base64 decode", "base64 converter"],
    },
    faqs: [
      {
        question: "Does this support Unicode characters?",
        answer: "Yes. We use UTF-8 encoding for full Unicode support.",
      },
    ],
    examples: [
      {
        title: "Encode text",
        input: "Hello, DevKit!",
        output: "SGVsbG8sIERldktpdCE=",
      },
    ],
    tags: ["base64", "encode", "decode"],
    isPopular: true,
    createdAt: "2026-01-05",
  },
  {
    slug: "url-encode-decode",
    name: "URL Encode/Decode",
    description:
      "Percent-encode text for query strings and paths, or decode URL-encoded strings back to plain text.",
    shortDescription: "Encode and decode URL components",
    icon: "link-2",
    category: "encoding",
    component: "url-encode-decode",
    seo: {
      title: "URL Encoder & Decoder — Percent Encoding Online",
      description:
        "Free URL encode/decode tool. Convert text to percent-encoding and back. Works entirely in your browser.",
      keywords: ["url encode", "url decode", "percent encoding", "encodeuri component"],
    },
    faqs: [
      {
        question: "Is this the same as encodeURIComponent?",
        answer:
          "Yes. Encoding uses encodeURIComponent and decoding uses decodeURIComponent (plus converting + to spaces).",
      },
      {
        question: "Should I encode a full URL including https://?",
        answer:
          "Usually encode only query values or path segments — not the entire URL with scheme and host.",
      },
    ],
    examples: [
      {
        title: "Encode a query value",
        input: "Hello DevKit! query=a&b=c",
        output: "Hello%20DevKit!%20query%3Da%26b%3Dc",
      },
    ],
    tags: ["url", "encode", "decode", "percent"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-14",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate UUID v4 identifiers instantly. Copy single or bulk UUIDs for database keys and distributed systems.",
    shortDescription: "Generate UUID v4 identifiers",
    icon: "hash",
    category: "encoding",
    component: "uuid-generator",
    seo: {
      title: "UUID Generator — Generate UUID v4 Online",
      description:
        "Free UUID v4 generator. Create single or bulk UUIDs for your applications.",
      keywords: ["uuid generator", "uuid v4", "generate uuid"],
    },
    faqs: [
      {
        question: "What UUID version is generated?",
        answer: "We generate UUID version 4 (random) using crypto.getRandomValues().",
      },
    ],
    examples: [
      {
        title: "Sample UUID v4",
        output: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      },
    ],
    tags: ["uuid", "generate", "id"],
    isPopular: true,
    createdAt: "2026-02-01",
  },
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    description:
      "Create QR codes from text, URLs, or WiFi credentials. Download as PNG or SVG.",
    shortDescription: "Generate QR codes from any text",
    icon: "qr-code",
    category: "web",
    component: "qr-generator",
    seo: {
      title: "QR Code Generator — Create QR Codes Free",
      description:
        "Generate QR codes from URLs, text, or WiFi credentials. Download as PNG or SVG.",
      keywords: ["qr code generator", "create qr code", "qr maker"],
    },
    faqs: [
      {
        question: "What formats can I download?",
        answer: "QR codes can be downloaded as PNG or SVG vector format.",
      },
    ],
    examples: [
      {
        title: "URL QR code",
        input: "https://devkit.dev",
      },
    ],
    tags: ["qr", "code", "generate"],
    isNew: true,
    createdAt: "2026-03-01",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description:
      "Test regular expressions against sample text with real-time match highlighting and capture group extraction.",
    shortDescription: "Test regex patterns with live matching",
    icon: "regex",
    category: "web",
    component: "regex-tester",
    seo: {
      title: "Regex Tester — Test Regular Expressions Online",
      description:
        "Free regex tester with live match highlighting, capture groups, and flag support.",
      keywords: ["regex tester", "regular expression", "regex online"],
    },
    faqs: [
      {
        question: "Which regex flavor is supported?",
        answer: "We use JavaScript RegExp (ECMAScript) syntax.",
      },
    ],
    examples: [
      {
        title: "Email pattern",
        input: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b",
        description: "Matches standard email addresses.",
      },
    ],
    tags: ["regex", "pattern", "test"],
    isFeatured: true,
    createdAt: "2026-02-15",
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds.",
    shortDescription: "Convert Unix timestamps to dates",
    icon: "clock",
    category: "web",
    component: "timestamp-converter",
    seo: {
      title: "Timestamp Converter — Unix to Date Online",
      description:
        "Convert Unix timestamps to readable dates. Supports seconds, milliseconds, and timezones.",
      keywords: ["timestamp converter", "unix timestamp", "epoch converter"],
    },
    faqs: [
      {
        question: "Does it support milliseconds?",
        answer: "Yes. Automatically detects seconds vs milliseconds based on digit count.",
      },
    ],
    examples: [
      {
        title: "Unix timestamp",
        input: "1704067200",
        output: "2024-01-01T00:00:00.000Z",
      },
    ],
    tags: ["timestamp", "unix", "date"],
    isPopular: true,
    createdAt: "2026-01-25",
  },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    description:
      "Generate harmonious color palettes from a base color. Export as CSS variables, Tailwind config, or JSON.",
    shortDescription: "Generate color palettes from a base color",
    icon: "palette",
    category: "design",
    component: "color-palette-generator",
    seo: {
      title: "Color Palette Generator — Create Color Schemes",
      description:
        "Generate beautiful color palettes for your projects. Export as CSS, Tailwind, or JSON.",
      keywords: ["color palette generator", "color scheme", "design tokens"],
    },
    faqs: [
      {
        question: "What export formats are available?",
        answer: "CSS custom properties, Tailwind config, and JSON design tokens.",
      },
    ],
    examples: [
      {
        title: "Generate from hex",
        input: "#6366f1",
        description: "Creates a full palette with shades and tints.",
      },
    ],
    tags: ["color", "palette", "design"],
    isNew: true,
    createdAt: "2026-03-10",
  },
  {
    slug: "lottie-viewer",
    name: "Lottie Viewer",
    description:
      "Preview Lottie JSON animations in the browser. Inspect layers, adjust speed, and export frames.",
    shortDescription: "Preview Lottie animations in browser",
    icon: "play",
    category: "design",
    component: "lottie-viewer",
    seo: {
      title: "Lottie Viewer — Preview Lottie Animations Online",
      description:
        "Preview and inspect Lottie JSON animations. Adjust playback speed and loop settings.",
      keywords: ["lottie viewer", "lottie preview", "lottie animation"],
    },
    faqs: [
      {
        question: "What Lottie versions are supported?",
        answer: "Supports Lottie JSON exported from After Effects via Bodymovin.",
      },
    ],
    examples: [],
    tags: ["lottie", "animation", "design"],
    createdAt: "2026-03-15",
  },
  {
    slug: "deep-link-generator",
    name: "Deep Link Generator",
    description:
      "Build deep links and universal links for iOS and Android apps. Test URL schemes and app links.",
    shortDescription: "Generate mobile deep links",
    icon: "link-2",
    category: "mobile",
    component: "deep-link-generator",
    seo: {
      title: "Deep Link Generator — iOS & Android App Links",
      description:
        "Generate deep links and universal links for mobile apps. Supports iOS and Android URL schemes.",
      keywords: ["deep link generator", "universal links", "app links"],
    },
    faqs: [
      {
        question: "What's the difference between deep links and universal links?",
        answer:
          "Deep links use custom URL schemes (myapp://). Universal links use HTTPS and open the app if installed.",
      },
    ],
    examples: [
      {
        title: "Custom scheme",
        input: "myapp://product/123",
      },
    ],
    tags: ["deep link", "mobile", "ios", "android"],
    isNew: true,
    createdAt: "2026-03-20",
  },
  {
    slug: "api-response-viewer",
    name: "API Response Viewer",
    description:
      "Paste API responses and explore JSON/XML with syntax highlighting, tree view, and search.",
    shortDescription: "Explore API responses with tree view",
    icon: "terminal",
    category: "api",
    component: "api-response-viewer",
    seo: {
      title: "API Response Viewer — Explore JSON & XML Responses",
      description:
        "Paste and explore API responses with syntax highlighting, collapsible tree view, and search.",
      keywords: ["api response viewer", "json tree view", "api debugger"],
    },
    faqs: [
      {
        question: "Can I paste large API responses?",
        answer:
          "Yes. The viewer handles large payloads with virtualized rendering for performance.",
      },
    ],
    examples: [
      {
        title: "GitHub API response",
        input: '{"id": 1, "name": "DevKit", "full_name": "devkit/devkit"}',
      },
    ],
    tags: ["api", "response", "json", "debug"],
    isFeatured: true,
    isPopular: true,
    createdAt: "2026-02-20",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return TOOLS.filter((t) => t.category === categorySlug);
}

export function getPopularTools(limit = 8): Tool[] {
  return TOOLS.filter((t) => t.isPopular).slice(0, limit);
}

export function getFeaturedTools(limit = 4): Tool[] {
  return TOOLS.filter((t) => t.isFeatured).slice(0, limit);
}

export function getRecentTools(limit = 6): Tool[] {
  return [...TOOLS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return TOOLS.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  ).slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return TOOLS;

  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(normalized) ||
      t.description.toLowerCase().includes(normalized) ||
      t.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

export function getAllToolSlugs(): string[] {
  return TOOLS.map((t) => t.slug);
}

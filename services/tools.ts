import type { Tool } from "@/types";
import { CATEGORIES } from "@/services/categories";

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
    category: "developer",
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
    category: "developer",
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
    category: "converters",
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
    category: "converters",
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
    category: "generators",
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
    isNew: true,
    createdAt: "2026-02-01",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text in your browser.",
    shortDescription: "MD5 and SHA hashes from text",
    icon: "hash",
    category: "security",
    component: "hash-generator",
    seo: {
      title: "Hash Generator — MD5 SHA-256 SHA-512 Online",
      description:
        "Free hash generator. Create MD5 and SHA hashes locally in your browser.",
      keywords: ["hash generator", "md5", "sha256", "sha512", "checksum"],
    },
    faqs: [
      {
        question: "Is MD5 safe for passwords?",
        answer:
          "No. MD5 and SHA-1 are for checksums only. Use a password hasher (bcrypt/argon2) for credentials.",
      },
    ],
    examples: [
      {
        title: "SHA-256",
        input: "DevKit",
        description: "Outputs a 64-character hex digest.",
      },
    ],
    tags: ["hash", "md5", "sha", "security"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    description:
      "Convert numbers between binary, octal, decimal, and hexadecimal bases.",
    shortDescription: "Binary, octal, decimal, hex converter",
    icon: "binary",
    category: "converters",
    component: "number-base-converter",
    seo: {
      title: "Number Base Converter — Binary Octal Decimal Hex",
      description:
        "Convert between binary, octal, decimal, and hexadecimal online.",
      keywords: ["binary converter", "hex converter", "number base", "octal"],
    },
    faqs: [
      {
        question: "Are negative numbers supported?",
        answer: "This tool focuses on non-negative integers via parseInt.",
      },
    ],
    examples: [
      {
        title: "Decimal to hex",
        input: "255",
        output: "FF",
      },
    ],
    tags: ["binary", "hex", "octal", "decimal", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    description:
      "Create QR codes from text, URLs, or WiFi credentials. Download as PNG or SVG.",
    shortDescription: "Generate QR codes from any text",
    icon: "qr-code",
    category: "generators",
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
    category: "text",
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
    category: "converters",
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
    slug: "json-yaml",
    name: "JSON ↔ YAML",
    description:
      "Convert JSON to YAML and YAML to JSON instantly. Ideal for configs, Kubernetes manifests, and API payloads.",
    shortDescription: "Convert between JSON and YAML",
    icon: "braces",
    category: "developer",
    component: "json-yaml",
    seo: {
      title: "JSON to YAML Converter — YAML to JSON Online",
      description:
        "Free JSON ↔ YAML converter. Convert configs and data structures in your browser.",
      keywords: ["json to yaml", "yaml to json", "json yaml converter"],
    },
    faqs: [
      {
        question: "Does this support nested objects and arrays?",
        answer: "Yes. Nested structures are preserved in both directions.",
      },
    ],
    examples: [
      {
        title: "JSON to YAML",
        input: '{"name":"DevKit","free":true}',
        output: "name: DevKit\nfree: true",
      },
    ],
    tags: ["json", "yaml", "convert"],
    isFeatured: true,
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-xml",
    name: "JSON ↔ XML",
    description:
      "Convert JSON objects to XML and XML documents back to JSON for APIs and integrations.",
    shortDescription: "Convert between JSON and XML",
    icon: "braces",
    category: "developer",
    component: "json-xml",
    seo: {
      title: "JSON to XML Converter — XML to JSON Online",
      description:
        "Free JSON ↔ XML converter. Transform API payloads and config files instantly.",
      keywords: ["json to xml", "xml to json", "json xml converter"],
    },
    faqs: [
      {
        question: "How are JSON arrays represented in XML?",
        answer: "Array items become repeated sibling elements with the same tag name.",
      },
    ],
    examples: [
      {
        title: "JSON to XML",
        input: '{"user":{"name":"DevKit"}}',
        output: "<root><user><name>DevKit</name></user></root>",
      },
    ],
    tags: ["json", "xml", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "csv-json",
    name: "CSV ↔ JSON",
    description:
      "Convert CSV spreadsheets to JSON arrays and JSON objects back to CSV with quoted-field support.",
    shortDescription: "Convert between CSV and JSON",
    icon: "table-2",
    category: "developer",
    component: "csv-json",
    seo: {
      title: "CSV to JSON Converter — JSON to CSV Online",
      description:
        "Free CSV ↔ JSON converter. Turn spreadsheets into API-ready JSON and back.",
      keywords: ["csv to json", "json to csv", "csv json converter"],
    },
    faqs: [
      {
        question: "Does it support quoted commas in CSV?",
        answer: "Yes. Fields wrapped in double quotes are parsed correctly.",
      },
    ],
    examples: [
      {
        title: "CSV to JSON",
        input: "name,tools\nDevKit,100",
        output: '[{"name":"DevKit","tools":"100"}]',
      },
    ],
    tags: ["csv", "json", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "markdown-html",
    name: "Markdown ↔ HTML",
    description:
      "Convert Markdown to HTML and HTML back to Markdown for docs, blogs, and content workflows.",
    shortDescription: "Convert between Markdown and HTML",
    icon: "file-code-2",
    category: "text",
    component: "markdown-html",
    seo: {
      title: "Markdown to HTML Converter — HTML to Markdown Online",
      description:
        "Free Markdown ↔ HTML converter. Preview-ready HTML and clean Markdown in your browser.",
      keywords: ["markdown to html", "html to markdown", "md converter"],
    },
    faqs: [
      {
        question: "Is GitHub-flavored Markdown supported?",
        answer: "Markdown → HTML uses GFM via the marked parser. HTML → Markdown covers common tags.",
      },
    ],
    examples: [
      {
        title: "Markdown heading",
        input: "# DevKit",
        output: "<h1>DevKit</h1>",
      },
    ],
    tags: ["markdown", "html", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-toml",
    name: "JSON ↔ TOML",
    description:
      "Convert JSON objects to TOML and TOML configs back to JSON for Cargo, Pyproject, and app settings.",
    shortDescription: "Convert between JSON and TOML",
    icon: "braces",
    category: "developer",
    component: "json-toml",
    seo: {
      title: "JSON to TOML Converter — TOML to JSON Online",
      description:
        "Free JSON ↔ TOML converter. Transform config files in your browser.",
      keywords: ["json to toml", "toml to json", "json toml converter"],
    },
    faqs: [
      {
        question: "Can the root value be an array?",
        answer: "No. TOML requires an object root, so JSON arrays and primitives are rejected.",
      },
    ],
    examples: [
      {
        title: "JSON to TOML",
        input: '{"name":"DevKit","version":1}',
        output: 'name = "DevKit"\nversion = 1',
      },
    ],
    tags: ["json", "toml", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "yaml-xml",
    name: "YAML ↔ XML",
    description:
      "Convert YAML documents to XML and XML back to YAML via a JSON bridge.",
    shortDescription: "Convert between YAML and XML",
    icon: "file-code-2",
    category: "developer",
    component: "yaml-xml",
    seo: {
      title: "YAML to XML Converter — XML to YAML Online",
      description:
        "Free YAML ↔ XML converter for configs and data interchange.",
      keywords: ["yaml to xml", "xml to yaml", "yaml xml converter"],
    },
    faqs: [
      {
        question: "How does conversion work?",
        answer: "YAML and XML are converted through JSON using the same parsers as our JSON tools.",
      },
    ],
    examples: [
      {
        title: "YAML to XML",
        input: "name: DevKit",
        output: "<root><name>DevKit</name></root>",
      },
    ],
    tags: ["yaml", "xml", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "csv-xml",
    name: "CSV ↔ XML",
    description:
      "Convert CSV tables to XML and XML records back to CSV for spreadsheet and API workflows.",
    shortDescription: "Convert between CSV and XML",
    icon: "table-2",
    category: "developer",
    component: "csv-xml",
    seo: {
      title: "CSV to XML Converter — XML to CSV Online",
      description:
        "Free CSV ↔ XML converter. Turn tabular data into XML and back.",
      keywords: ["csv to xml", "xml to csv", "csv xml converter"],
    },
    faqs: [
      {
        question: "How is XML structured for rows?",
        answer: "CSV rows become repeated item elements under a root node.",
      },
    ],
    examples: [
      {
        title: "CSV to XML",
        input: "name,tools\nDevKit,100",
        output: "<root><item><name>DevKit</name><tools>100</tools></item></root>",
      },
    ],
    tags: ["csv", "xml", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "env-json",
    name: ".env ↔ JSON",
    description:
      "Convert dotenv files to JSON objects and JSON key/value maps back to .env format.",
    shortDescription: "Convert between .env and JSON",
    icon: "file-code-2",
    category: "developer",
    component: "env-json",
    seo: {
      title: ".env to JSON Converter — JSON to .env Online",
      description:
        "Free .env ↔ JSON converter for environment variables and config dumps.",
      keywords: ["env to json", "json to env", "dotenv converter"],
    },
    faqs: [
      {
        question: "Are comments preserved?",
        answer: "Comments and blank lines are ignored when converting .env → JSON.",
      },
    ],
    examples: [
      {
        title: ".env to JSON",
        input: "NAME=DevKit\nFREE=true",
        output: '{\n  "NAME": "DevKit",\n  "FREE": "true"\n}',
      },
    ],
    tags: ["env", "dotenv", "json", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "sql-json",
    name: "SQL ↔ JSON",
    description:
      "Convert INSERT statements to JSON rows and JSON arrays back to SQL INSERT statements (best-effort).",
    shortDescription: "Convert between SQL INSERT and JSON",
    icon: "database",
    category: "developer",
    component: "sql-json",
    seo: {
      title: "SQL to JSON Converter — JSON to SQL INSERT Online",
      description:
        "Free SQL ↔ JSON converter for INSERT statements and row data.",
      keywords: ["sql to json", "json to sql", "insert to json"],
    },
    faqs: [
      {
        question: "What SQL is supported?",
        answer:
          "Best-effort parsing of INSERT INTO … VALUES (…) statements. Complex SQL is not supported.",
      },
    ],
    examples: [
      {
        title: "SQL to JSON",
        input: "INSERT INTO users (id, name) VALUES (1, 'Ada');",
        output: '{\n  "table": "users",\n  "rows": [{ "id": 1, "name": "Ada" }]\n}',
      },
    ],
    tags: ["sql", "json", "insert", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "html-jsx",
    name: "HTML ↔ JSX",
    description:
      "Convert HTML to React JSX and JSX markup back to HTML with attribute remapping.",
    shortDescription: "Convert between HTML and JSX",
    icon: "file-code-2",
    category: "developer",
    component: "html-jsx",
    seo: {
      title: "HTML to JSX Converter — JSX to HTML Online",
      description:
        "Free HTML ↔ JSX converter. Remap class, for, style, and void tags for React.",
      keywords: ["html to jsx", "jsx to html", "react converter"],
    },
    faqs: [
      {
        question: "Does it convert class to className?",
        answer: "Yes. Common HTML attributes are remapped to their React equivalents.",
      },
    ],
    examples: [
      {
        title: "HTML to JSX",
        input: '<div class="card"></div>',
        output: '<div className="card"></div>',
      },
    ],
    tags: ["html", "jsx", "react", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "css-scss",
    name: "CSS ↔ SCSS",
    description:
      "Nest flat CSS into SCSS and flatten simple nested SCSS back to CSS (best-effort, no mixins).",
    shortDescription: "Convert between CSS and SCSS",
    icon: "file-code-2",
    category: "design",
    component: "css-scss",
    seo: {
      title: "CSS to SCSS Converter — SCSS to CSS Online",
      description:
        "Free CSS ↔ SCSS converter for nesting and flattening stylesheets.",
      keywords: ["css to scss", "scss to css", "sass converter"],
    },
    faqs: [
      {
        question: "Are mixins and variables supported?",
        answer: "No. This is a structural nest/flatten helper for plain selectors and declarations.",
      },
    ],
    examples: [
      {
        title: "CSS to SCSS",
        input: ".card { color: teal; }\n.card .title { font-size: 18px; }",
        output: ".card {\n  color: teal;\n  & .title {\n    font-size: 18px;\n  }\n}",
      },
    ],
    tags: ["css", "scss", "sass", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "cjs-esm",
    name: "CommonJS ↔ ESM",
    description:
      "Convert CommonJS require/module.exports snippets to ESM import/export and back (best-effort).",
    shortDescription: "Convert between CommonJS and ESM",
    icon: "file-code-2",
    category: "developer",
    component: "cjs-esm",
    seo: {
      title: "CommonJS to ESM Converter — ESM to CJS Online",
      description:
        "Free CommonJS ↔ ESM converter for require/import and exports.",
      keywords: ["commonjs to esm", "esm to cjs", "require to import"],
    },
    faqs: [
      {
        question: "Does it handle every module pattern?",
        answer:
          "It covers common require/import and exports patterns. Dynamic or computed imports need manual review.",
      },
    ],
    examples: [
      {
        title: "CommonJS to ESM",
        input: 'const fs = require("fs");',
        output: 'import fs from "fs";',
      },
    ],
    tags: ["commonjs", "esm", "modules", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "hex-rgb",
    name: "HEX ↔ RGB",
    description:
      "Convert HEX colors to RGB and RGB values to HEX with a live color preview swatch.",
    shortDescription: "Convert HEX and RGB colors",
    icon: "palette",
    category: "design",
    component: "hex-rgb",
    seo: {
      title: "HEX to RGB Converter — RGB to HEX Online",
      description:
        "Free HEX ↔ RGB color converter with live preview. Perfect for CSS and design tokens.",
      keywords: ["hex to rgb", "rgb to hex", "color converter"],
    },
    faqs: [
      {
        question: "Are 3-digit HEX codes supported?",
        answer: "Yes. Shorthand values like #0d9 expand to six-digit form (#00dd99).",
      },
    ],
    examples: [
      {
        title: "HEX to RGB",
        input: "#0d9488",
        output: "rgb(13, 148, 136)",
      },
    ],
    tags: ["hex", "rgb", "color", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description:
      "Convert colors between HEX, RGB, HSL, HSV, and CMYK with a live preview swatch.",
    shortDescription: "HEX RGB HSL HSV CMYK converter",
    icon: "palette",
    category: "design",
    component: "color-converter",
    seo: {
      title: "Color Converter — HEX RGB HSL HSV CMYK Online",
      description:
        "Free color converter between HEX, RGB, HSL, HSV, and CMYK with live preview.",
      keywords: ["color converter", "hex to hsl", "rgb to cmyk", "hsv converter"],
    },
    faqs: [
      {
        question: "Can I edit any format?",
        answer: "Yes. Change HEX, RGB, HSL, HSV, or CMYK and the others update instantly.",
      },
    ],
    examples: [
      {
        title: "HEX to HSL",
        input: "#0d9488",
        output: "hsl(173, 84%, 31%)",
      },
    ],
    tags: ["color", "hex", "rgb", "hsl", "hsv", "cmyk"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description:
      "Convert length, mass, temperature, data size, and time units instantly.",
    shortDescription: "Length, mass, temp, data, time units",
    icon: "wrench",
    category: "calculators",
    component: "unit-converter",
    seo: {
      title: "Unit Converter — Length Mass Temperature Data Time",
      description:
        "Free unit converter for length, weight, temperature, digital storage, and time.",
      keywords: ["unit converter", "length converter", "temperature converter", "mb to gb"],
    },
    faqs: [
      {
        question: "Is data size binary or decimal?",
        answer: "Data units use binary (1024-based) multiples: KB, MB, GB, TB.",
      },
    ],
    examples: [
      {
        title: "Miles to kilometers",
        input: "1 mi",
        output: "1.609344 km",
      },
    ],
    tags: ["units", "convert", "length", "temperature", "data"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description:
      "Convert between major world currencies using daily ECB reference rates.",
    shortDescription: "Live currency conversion (ECB rates)",
    icon: "globe",
    category: "calculators",
    component: "currency-converter",
    seo: {
      title: "Currency Converter — Exchange Rates Online",
      description:
        "Convert USD, EUR, GBP, INR, and more using European Central Bank reference rates.",
      keywords: ["currency converter", "exchange rate", "usd to eur", "inr converter"],
    },
    faqs: [
      {
        question: "Where do rates come from?",
        answer:
          "Frankfurter API serving ECB reference rates. Not for trading or banking decisions.",
      },
    ],
    examples: [
      {
        title: "USD to EUR",
        description: "Enter an amount, pick currencies, see the converted value.",
      },
    ],
    tags: ["currency", "fx", "money", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    description:
      "Convert text to camelCase, snake_case, kebab-case, PascalCase, slug, and more.",
    shortDescription: "camelCase, snake_case, slug, and more",
    icon: "file-code-2",
    category: "text",
    component: "text-case-converter",
    seo: {
      title: "Text Case Converter — camelCase snake_case slug Online",
      description:
        "Free text case converter for camelCase, PascalCase, snake_case, kebab-case, and URL slugs.",
      keywords: ["camelcase converter", "snake case", "kebab case", "slugify"],
    },
    faqs: [
      {
        question: "Does slug mode remove special characters?",
        answer: "Yes. Non-alphanumeric characters become separators and are normalized.",
      },
    ],
    examples: [
      {
        title: "To camelCase",
        input: "DevKit developer tools",
        output: "devKitDeveloperTools",
      },
    ],
    tags: ["text", "case", "slug", "camelcase", "snake"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    description:
      "Count words, characters, sentences, paragraphs, and estimate reading time.",
    shortDescription: "Words, characters, reading time",
    icon: "file-code-2",
    category: "calculators",
    component: "word-counter",
    seo: {
      title: "Word Counter — Characters Sentences Reading Time",
      description:
        "Free word counter with character counts, sentences, paragraphs, and reading time.",
      keywords: ["word counter", "character counter", "reading time"],
    },
    faqs: [
      {
        question: "How is reading time calculated?",
        answer: "Approximately 200 words per minute, rounded up.",
      },
    ],
    examples: [
      {
        title: "Quick count",
        description: "Paste text to see live word and character stats.",
      },
    ],
    tags: ["text", "words", "characters", "count"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description:
      "Calculate percentages, percent-of, percent change, and increase/decrease by percent.",
    shortDescription: "Percent of, change, increase/decrease",
    icon: "wrench",
    category: "calculators",
    component: "percentage-calculator",
    seo: {
      title: "Percentage Calculator — Percent Of Change Online",
      description:
        "Free percentage calculator for percent-of, what-percent, and percent change.",
      keywords: ["percentage calculator", "percent of", "percent change"],
    },
    faqs: [
      {
        question: "What modes are available?",
        answer:
          "X% of Y, X is what % of Y, % change, increase by %, and decrease by %.",
      },
    ],
    examples: [
      {
        title: "15% of 200",
        input: "15, 200",
        output: "30",
      },
    ],
    tags: ["percentage", "calculator", "math", "finance"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    description:
      "Convert PNG, JPG, WebP, GIF, BMP, and AVIF images in your browser. Optional resize and quality controls.",
    shortDescription: "Convert PNG, JPG, WebP, GIF, BMP",
    icon: "image",
    category: "images",
    component: "image-converter",
    seo: {
      title: "Image Converter — PNG JPG WebP GIF BMP Online",
      description:
        "Free browser image converter. Convert between PNG, JPG, and WebP. Accepts GIF, BMP, and AVIF inputs.",
      keywords: [
        "image converter",
        "png to jpg",
        "jpg to png",
        "webp converter",
        "gif to png",
        "bmp to png",
      ],
    },
    faqs: [
      {
        question: "Are files uploaded to a server?",
        answer: "No. Conversion runs entirely in your browser using the Canvas API.",
      },
      {
        question: "Why does JPG look different from PNG?",
        answer:
          "JPG has no transparency. Transparent pixels are filled with white when converting to JPG.",
      },
    ],
    examples: [
      {
        title: "PNG to WebP",
        description: "Upload a PNG, choose WebP, adjust quality, download.",
      },
    ],
    tags: ["image", "png", "jpg", "webp", "gif", "bmp", "convert"],
    isFeatured: true,
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "svg-converter",
    name: "SVG Converter",
    description:
      "Rasterize SVG to PNG, JPG, or WebP with custom dimensions. Also wrap raster images as embedded SVG.",
    shortDescription: "Convert SVG to PNG, JPG, or WebP",
    icon: "file-code-2",
    category: "images",
    component: "svg-converter",
    seo: {
      title: "SVG to PNG Converter — SVG to JPG WebP Online",
      description:
        "Free SVG converter. Export SVG to PNG, JPG, or WebP in your browser. Optional image → SVG embed.",
      keywords: ["svg to png", "svg to jpg", "svg converter", "svg to webp"],
    },
    faqs: [
      {
        question: "Does Image → SVG vectorize the artwork?",
        answer:
          "No. It embeds the raster as a data URI inside an SVG wrapper for packaging, not path tracing.",
      },
    ],
    examples: [
      {
        title: "SVG to PNG",
        description: "Paste SVG markup or upload .svg, choose PNG, download.",
      },
    ],
    tags: ["svg", "png", "jpg", "webp", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "ico-converter",
    name: "ICO ↔ PNG",
    description:
      "Convert Windows ICO icons to PNG, or export PNG/JPG images as favicon-ready ICO files.",
    shortDescription: "Convert between ICO and PNG",
    icon: "image",
    category: "images",
    component: "ico-converter",
    seo: {
      title: "ICO to PNG Converter — PNG to ICO Favicon Online",
      description:
        "Free ICO ↔ PNG converter. Extract icons from .ico files or create favicon ICO from PNG.",
      keywords: ["ico to png", "png to ico", "favicon converter", "ico converter"],
    },
    faqs: [
      {
        question: "Which ICO sizes are supported when creating icons?",
        answer: "You can export 16, 32, 48, 64, 128, or 256 pixel ICO files.",
      },
    ],
    examples: [
      {
        title: "PNG to favicon",
        description: "Upload a square PNG, pick 32×32 or 256×256, download .ico.",
      },
    ],
    tags: ["ico", "png", "favicon", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
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
    isPopular: true,
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
    slug: "json-to-model",
    name: "JSON to Model",
    description:
      "Generate TypeScript, Swift, Kotlin, Dart, C#, Java, Go, or Rust models from sample JSON. Nested objects and arrays included.",
    shortDescription: "JSON → TS, Swift, Kotlin, Dart, C#, Java, Go, Rust",
    icon: "smartphone",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to Model Generator — TS Swift Kotlin Dart C# Java Go Rust",
      description:
        "Free JSON to model converter. Generate typed models for TypeScript, Swift, Kotlin, Dart, C#, Java, Go, and Rust in your browser.",
      keywords: [
        "json to typescript",
        "json to swift",
        "json to kotlin",
        "json to dart",
        "json to model",
        "json to java",
        "json to go",
        "json to rust",
      ],
    },
    faqs: [
      {
        question: "Which languages are supported?",
        answer:
          "TypeScript, Swift, Kotlin, Dart, C#, Java, Go, and Rust. Types are inferred from your sample JSON.",
      },
      {
        question: "Are nullable and mixed types perfect?",
        answer:
          "Generation is best-effort from one sample. Mixed arrays and missing fields may need manual review.",
      },
    ],
    examples: [
      {
        title: "Nested object",
        input: '{"id":1,"owner":{"email":"a@b.com"}}',
        output: "interface Root { id: number; owner: Owner; }",
      },
    ],
    tags: [
      "json",
      "typescript",
      "swift",
      "kotlin",
      "dart",
      "csharp",
      "java",
      "go",
      "rust",
      "mobile",
      "model",
    ],
    isFeatured: true,
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-typescript",
    name: "JSON to TypeScript",
    description:
      "Generate TypeScript interfaces from JSON. Nested objects become separate interfaces.",
    shortDescription: "Generate TypeScript interfaces from JSON",
    icon: "braces",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to TypeScript Converter — Generate Interfaces Online",
      description:
        "Convert JSON to TypeScript interfaces instantly. Nested types and arrays supported.",
      keywords: ["json to typescript", "json to interface", "json to ts"],
    },
    faqs: [
      {
        question: "Does it create interfaces or types?",
        answer: "Objects become interfaces; array roots and primitives use type aliases.",
      },
    ],
    examples: [
      {
        title: "Simple object",
        input: '{"name":"DevKit","free":true}',
        output: "export interface Root {\n  name: string;\n  free: boolean;\n}",
      },
    ],
    tags: ["json", "typescript", "interface", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-swift",
    name: "JSON to Swift",
    description:
      "Generate Codable Swift structs from JSON for iOS and macOS apps.",
    shortDescription: "Generate Swift Codable structs from JSON",
    icon: "smartphone",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to Swift Converter — Codable Structs Online",
      description:
        "Convert JSON to Swift Codable structs with CodingKeys when property names differ.",
      keywords: ["json to swift", "swift codable", "json to struct"],
    },
    faqs: [
      {
        question: "Are CodingKeys generated?",
        answer: "Yes, when JSON keys differ from camelCase Swift property names.",
      },
    ],
    examples: [
      {
        title: "User model",
        input: '{"user_id":1,"name":"Ada"}',
        description: "Creates a Codable struct with CodingKeys for user_id.",
      },
    ],
    tags: ["json", "swift", "codable", "ios", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-kotlin",
    name: "JSON to Kotlin",
    description:
      "Generate Kotlin data classes with kotlinx.serialization annotations from JSON.",
    shortDescription: "Generate Kotlin data classes from JSON",
    icon: "smartphone",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to Kotlin Converter — Data Classes Online",
      description:
        "Convert JSON to Kotlin @Serializable data classes for Android and multiplatform apps.",
      keywords: ["json to kotlin", "kotlin data class", "json to android"],
    },
    faqs: [
      {
        question: "Which serialization library is assumed?",
        answer: "kotlinx.serialization with @Serializable and @SerialName.",
      },
    ],
    examples: [
      {
        title: "Data class",
        input: '{"id":1,"title":"DevKit"}',
        description: "Emits a @Serializable data class.",
      },
    ],
    tags: ["json", "kotlin", "android", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-dart",
    name: "JSON to Dart",
    description:
      "Generate Dart classes with fromJson/toJson helpers for Flutter apps.",
    shortDescription: "Generate Dart models from JSON",
    icon: "smartphone",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to Dart Converter — Flutter Models Online",
      description:
        "Convert JSON to Dart model classes with fromJson and toJson for Flutter.",
      keywords: ["json to dart", "flutter model", "json to flutter"],
    },
    faqs: [
      {
        question: "Does it use json_serializable?",
        answer:
          "It emits hand-written fromJson/toJson methods so you can paste without codegen.",
      },
    ],
    examples: [
      {
        title: "Flutter model",
        input: '{"id":1,"name":"DevKit"}',
        description: "Creates a class with fromJson and toJson.",
      },
    ],
    tags: ["json", "dart", "flutter", "convert"],
    isPopular: true,
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-csharp",
    name: "JSON to C#",
    description:
      "Generate C# classes with System.Text.Json JsonPropertyName attributes from JSON.",
    shortDescription: "Generate C# classes from JSON",
    icon: "braces",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to C# Converter — Classes Online",
      description:
        "Convert JSON to C# classes with JsonPropertyName attributes.",
      keywords: ["json to csharp", "json to c#", "json to class"],
    },
    faqs: [
      {
        question: "Which JSON library is assumed?",
        answer: "System.Text.Json with [JsonPropertyName].",
      },
    ],
    examples: [
      {
        title: "C# class",
        input: '{"id":1,"name":"DevKit"}',
        output: "public class Root { public int Id { get; set; } }",
      },
    ],
    tags: ["json", "csharp", "dotnet", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-java",
    name: "JSON to Java",
    description:
      "Generate Java POJOs with Jackson @JsonProperty annotations from JSON.",
    shortDescription: "Generate Java POJOs from JSON",
    icon: "braces",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to Java Converter — POJO Generator Online",
      description:
        "Convert JSON to Java classes with Jackson annotations.",
      keywords: ["json to java", "json to pojo", "jackson class"],
    },
    faqs: [
      {
        question: "Which JSON library is assumed?",
        answer: "Jackson with @JsonProperty on public fields.",
      },
    ],
    examples: [
      {
        title: "POJO",
        input: '{"id":1,"name":"DevKit"}',
        description: "Emits a public class with annotated fields.",
      },
    ],
    tags: ["json", "java", "pojo", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-go",
    name: "JSON to Go",
    description:
      "Generate Go structs with json struct tags from sample JSON.",
    shortDescription: "Generate Go structs from JSON",
    icon: "braces",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to Go Converter — Struct Generator Online",
      description:
        "Convert JSON to Go structs with json tags for encoding/json.",
      keywords: ["json to go", "json to struct", "golang json"],
    },
    faqs: [
      {
        question: "Are json tags included?",
        answer: "Yes. Each field gets a `json:\"key\"` tag matching the sample.",
      },
    ],
    examples: [
      {
        title: "Go struct",
        input: '{"id":1,"name":"DevKit"}',
        output: 'type Root struct {\n  Id int64 `json:"id"`\n}',
      },
    ],
    tags: ["json", "go", "golang", "struct", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "json-to-rust",
    name: "JSON to Rust",
    description:
      "Generate Rust structs with Serde Serialize/Deserialize derives from JSON.",
    shortDescription: "Generate Rust Serde structs from JSON",
    icon: "braces",
    category: "developer",
    component: "json-to-model",
    seo: {
      title: "JSON to Rust Converter — Serde Structs Online",
      description:
        "Convert JSON to Rust structs with serde rename attributes when needed.",
      keywords: ["json to rust", "serde struct", "json to serde"],
    },
    faqs: [
      {
        question: "Does it use Serde?",
        answer: "Yes. Structs derive Serialize and Deserialize, with rename attributes for non-snake_case keys.",
      },
    ],
    examples: [
      {
        title: "Serde struct",
        input: '{"user_id":1}',
        description: "Creates a struct with serde rename when keys differ from snake_case.",
      },
    ],
    tags: ["json", "rust", "serde", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "deep-link-generator",
    name: "Deep Link Generator",
    description:
      "Build deep links and universal links for iOS and Android apps. Test URL schemes and app links.",
    shortDescription: "Generate mobile deep links",
    icon: "link-2",
    category: "utilities",
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
    category: "developer",
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
  {
    slug: "markdown-to-pdf",
    name: "Markdown → PDF",
    description:
      "Convert Markdown to an A4 PDF in your browser. No upload — paste Markdown and download.",
    shortDescription: "Convert Markdown to PDF locally",
    icon: "file-text",
    category: "documents",
    component: "markdown-to-pdf",
    seo: {
      title: "Markdown to PDF Converter — Free Online",
      description:
        "Convert Markdown to PDF in your browser. Free, private, no upload required.",
      keywords: ["markdown to pdf", "md to pdf", "markdown pdf converter"],
    },
    faqs: [
      {
        question: "Is my Markdown uploaded?",
        answer: "No. Rendering runs entirely in your browser.",
      },
    ],
    examples: [
      {
        title: "Heading and list",
        input: "# Title\n\n- Item one\n- Item two",
      },
    ],
    tags: ["markdown", "pdf", "document", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "html-to-pdf",
    name: "HTML → PDF",
    description:
      "Sanitize HTML and export an A4 PDF in your browser. Scripts and unsafe markup are stripped.",
    shortDescription: "Convert HTML to PDF locally",
    icon: "file-code-2",
    category: "documents",
    component: "html-to-pdf",
    seo: {
      title: "HTML to PDF Converter — Free Online",
      description:
        "Convert HTML to PDF in your browser. Sanitized, private, no server upload.",
      keywords: ["html to pdf", "html pdf converter", "webpage to pdf"],
    },
    faqs: [
      {
        question: "Is HTML sanitized?",
        answer: "Yes. DOMPurify removes scripts and dangerous attributes before rendering.",
      },
    ],
    examples: [
      {
        title: "Simple page",
        input: "<h1>Hello</h1><p>Body text</p>",
      },
    ],
    tags: ["html", "pdf", "document", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "image-to-pdf",
    name: "Image → PDF",
    description:
      "Combine PNG, JPG, or WebP images into a PDF (one page per image). Runs in your browser.",
    shortDescription: "Turn images into a PDF",
    icon: "image",
    category: "images",
    component: "image-to-pdf",
    seo: {
      title: "Image to PDF Converter — PNG JPG WebP Online",
      description:
        "Convert PNG, JPG, or WebP images to PDF in your browser. Multiple images become multi-page PDFs.",
      keywords: ["image to pdf", "png to pdf", "jpg to pdf", "webp to pdf"],
    },
    faqs: [
      {
        question: "Are images uploaded?",
        answer: "No. PDF creation uses pdf-lib entirely in your browser.",
      },
    ],
    examples: [
      {
        title: "Screenshots to PDF",
        description: "Upload several PNGs, download a multi-page PDF.",
      },
    ],
    tags: ["image", "pdf", "png", "jpg", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "pdf-to-text",
    name: "PDF → Text",
    description:
      "Extract selectable text from a PDF in your browser. Scanned PDFs without a text layer may return nothing.",
    shortDescription: "Extract text from PDF",
    icon: "file-text",
    category: "documents",
    component: "pdf-to-text",
    seo: {
      title: "PDF to Text Converter — Extract PDF Text Online",
      description:
        "Extract text from PDF files in your browser. Free and private — files never leave your device.",
      keywords: ["pdf to text", "extract pdf text", "pdf text extractor"],
    },
    faqs: [
      {
        question: "Why is the output empty?",
        answer:
          "Scanned/image-only PDFs have no text layer. Use OCR elsewhere, or try PDF → Image.",
      },
    ],
    examples: [
      {
        title: "Export as .txt",
        description: "Upload a PDF, extract text, download .txt.",
      },
    ],
    tags: ["pdf", "text", "extract", "document"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "pdf-to-image",
    name: "PDF → Image",
    description:
      "Render PDF pages to PNG in your browser. Multi-page PDFs download as a ZIP (max 50 pages).",
    shortDescription: "Convert PDF pages to PNG",
    icon: "image",
    category: "images",
    component: "pdf-to-image",
    seo: {
      title: "PDF to PNG Converter — PDF Pages to Images",
      description:
        "Convert PDF pages to PNG images in your browser. Multi-page files download as a ZIP.",
      keywords: ["pdf to png", "pdf to image", "pdf page screenshot"],
    },
    faqs: [
      {
        question: "What's the page limit?",
        answer: "50 pages per conversion to keep browser memory reasonable.",
      },
    ],
    examples: [
      {
        title: "Single-page PDF",
        description: "Upload a one-page PDF, download a PNG.",
      },
    ],
    tags: ["pdf", "png", "image", "convert"],
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "zip-tool",
    name: "ZIP Create / Extract",
    description:
      "Create a ZIP from multiple files or extract an existing archive entirely in your browser.",
    shortDescription: "Create or extract ZIP archives",
    icon: "file-archive",
    category: "documents",
    component: "zip-tool",
    seo: {
      title: "ZIP Tool — Create & Extract ZIP Online",
      description:
        "Create and extract ZIP archives in your browser. Free, private, no upload.",
      keywords: ["zip online", "create zip", "extract zip", "unzip online"],
    },
    faqs: [
      {
        question: "Are files uploaded?",
        answer: "No. Compression uses fflate entirely in your browser.",
      },
    ],
    examples: [
      {
        title: "Pack screenshots",
        description: "Select several files, create archive.zip.",
      },
    ],
    tags: ["zip", "archive", "compress", "extract"],
    isNew: true,
    isPopular: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "word-to-pdf",
    name: "Word → PDF",
    description:
      "Convert DOCX to PDF in your browser. Layout is approximate (content via Mammoth, then rendered to PDF). No upload.",
    shortDescription: "Convert DOCX to PDF locally",
    icon: "file-text",
    category: "documents",
    component: "word-to-pdf",
    seo: {
      title: "Word to PDF Converter — DOCX to PDF Online",
      description:
        "Convert Microsoft Word DOCX to PDF in your browser. Private — files never leave your device.",
      keywords: ["word to pdf", "docx to pdf", "convert word", "docx pdf"],
    },
    faqs: [
      {
        question: "Does this upload my file?",
        answer: "No. Conversion runs entirely in your browser.",
      },
      {
        question: "Why isn't layout perfect?",
        answer:
          "Browsers cannot run Microsoft Word or LibreOffice. Content is converted to HTML then to PDF, so complex layouts may differ from Word's print preview.",
      },
      {
        question: "Can I convert .doc files?",
        answer: "Only .docx is supported. Open the file in Word and Save As .docx first.",
      },
    ],
    examples: [
      {
        title: "DOCX resume",
        description: "Upload resume.docx, download resume.pdf.",
      },
    ],
    tags: ["word", "docx", "pdf", "office"],
    isNew: true,
    isFeatured: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "image-compress",
    name: "Compress / Resize Image",
    description:
      "Compress and resize images in your browser. Choose JPG, WebP, or PNG, set quality, and scale by max width, height, exact size, or percent.",
    shortDescription: "Compress and resize images locally",
    icon: "image",
    category: "images",
    component: "image-compress",
    seo: {
      title: "Compress & Resize Image Online — Free JPG WebP PNG",
      description:
        "Free image compressor and resizer. Reduce file size, change dimensions, export JPG, WebP, or PNG — all in your browser.",
      keywords: [
        "compress image",
        "resize image",
        "image compressor",
        "reduce image size",
        "webp compress",
      ],
    },
    faqs: [
      {
        question: "Are images uploaded?",
        answer: "No. Compression and resizing use the Canvas API in your browser.",
      },
      {
        question: "Which format is smallest?",
        answer: "WebP or JPG with lower quality usually beat PNG for photos.",
      },
    ],
    examples: [
      {
        title: "Web photo",
        description: "Upload a large JPG, max width 1600, quality 80%, download.",
      },
    ],
    tags: ["compress", "resize", "image", "jpg", "webp", "png", "optimize"],
    isNew: true,
    isPopular: true,
    isFeatured: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    description:
      "Combine multiple PDF files into one. Reorder pages before merging — everything runs in your browser.",
    shortDescription: "Combine PDFs into one file",
    icon: "file-text",
    category: "documents",
    component: "merge-pdf",
    seo: {
      title: "Merge PDF Online — Combine PDF Files Free",
      description:
        "Merge multiple PDFs into a single document in your browser. Reorder files, download instantly. Private and free.",
      keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger"],
    },
    faqs: [
      {
        question: "Are PDFs uploaded?",
        answer: "No. Merging uses pdf-lib entirely in your browser.",
      },
    ],
    examples: [
      {
        title: "Reports",
        description: "Add cover.pdf then body.pdf, merge, download.",
      },
    ],
    tags: ["pdf", "merge", "combine", "join", "document"],
    isNew: true,
    isPopular: true,
    isFeatured: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description:
      "Split a PDF into individual pages (ZIP) or extract a page range. Runs locally — no upload.",
    shortDescription: "Split PDF by page or range",
    icon: "file-text",
    category: "documents",
    component: "split-pdf",
    seo: {
      title: "Split PDF Online — Extract Pages Free",
      description:
        "Split a PDF into separate pages or extract a range. Free, private, browser-only.",
      keywords: ["split pdf", "extract pdf pages", "pdf splitter", "pdf range"],
    },
    faqs: [
      {
        question: "What do I get for multi-page split?",
        answer: "A ZIP archive with one PDF per page.",
      },
    ],
    examples: [
      {
        title: "Pages 2–5",
        description: "Choose page range mode, set 2–5, download.",
      },
    ],
    tags: ["pdf", "split", "extract", "pages", "document"],
    isNew: true,
    isPopular: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description:
      "Generate strong random passwords with Web Crypto. Choose length and character sets, copy instantly.",
    shortDescription: "Generate strong random passwords",
    icon: "lock",
    category: "security",
    component: "password-generator",
    seo: {
      title: "Password Generator — Strong Random Passwords Online",
      description:
        "Free secure password generator. Cryptographically random, customizable length and symbols. Runs in your browser.",
      keywords: [
        "password generator",
        "strong password",
        "random password",
        "secure password",
      ],
    },
    faqs: [
      {
        question: "Are passwords sent to a server?",
        answer: "No. Generation uses crypto.getRandomValues in your browser.",
      },
    ],
    examples: [
      {
        title: "16-character password",
        description: "Default settings, click Generate, copy.",
      },
    ],
    tags: ["password", "security", "generator", "random"],
    isNew: true,
    isPopular: true,
    isFeatured: true,
    createdAt: "2026-08-15",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description:
      "Calculate exact age in years, months, and days. See total days lived and days until the next birthday.",
    shortDescription: "Calculate exact age from birth date",
    icon: "calculator",
    category: "calculators",
    component: "age-calculator",
    seo: {
      title: "Age Calculator — Exact Age in Years Months Days",
      description:
        "Free age calculator. Enter date of birth to get years, months, days, and next birthday countdown.",
      keywords: ["age calculator", "how old am i", "birthday calculator", "exact age"],
    },
    faqs: [
      {
        question: "Is my birth date stored?",
        answer: "No. Calculation runs only in your browser.",
      },
    ],
    examples: [
      {
        title: "Birthday",
        input: "2000-01-15",
        description: "See years, months, days, and next birthday.",
      },
    ],
    tags: ["age", "birthday", "calculator", "date"],
    isNew: true,
    isPopular: true,
    createdAt: "2026-08-15",
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

/**
 * Intent synonyms → boost matching for everyday language
 * (e.g. "passport" → image resize / convert tools).
 */
const SEARCH_SYNONYMS: Record<string, string[]> = {
  passport: ["image", "resize", "photo", "png", "jpg", "compress", "convert"],
  resume: ["pdf", "word", "docx", "compress", "text", "merge", "split"],
  cv: ["pdf", "word", "docx"],
  photo: ["image", "png", "jpg", "svg", "ico", "compress", "resize"],
  picture: ["image", "png", "jpg", "compress"],
  compress: ["image", "zip", "pdf", "resize"],
  merge: ["pdf", "zip"],
  split: ["pdf"],
  ocr: ["pdf", "text"],
  barcode: ["qr"],
  password: ["password", "hash", "uuid", "security", "generator"],
  age: ["age", "birthday", "calculator", "date"],
  gst: ["percentage", "currency", "calculator"],
  invoice: ["pdf", "percentage", "currency", "merge"],
  background: ["image", "svg"],
  favicon: ["ico", "png"],
  archive: ["zip"],
  unzip: ["zip"],
  encode: ["base64", "url"],
  decode: ["base64", "url", "jwt"],
  color: ["hex", "rgb", "palette", "hsl"],
  money: ["currency"],
  fx: ["currency"],
};

function scoreTool(tool: Tool, query: string, tokens: string[]): number {
  const name = tool.name.toLowerCase();
  const desc = tool.description.toLowerCase();
  const short = tool.shortDescription.toLowerCase();
  const tags = tool.tags.map((t) => t.toLowerCase());
  const hay = `${name} ${short} ${desc} ${tags.join(" ")}`;

  let score = 0;
  if (name === query) score += 100;
  if (name.includes(query)) score += 50;
  if (tags.some((t) => t === query || t.includes(query))) score += 40;
  if (short.includes(query)) score += 25;
  if (desc.includes(query)) score += 10;

  for (const token of tokens) {
    if (name.includes(token)) score += 15;
    if (tags.some((t) => t.includes(token))) score += 12;
    if (hay.includes(token)) score += 5;
  }

  return score;
}

export function searchTools(query: string): Tool[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return TOOLS;

  const synonymHits = Object.entries(SEARCH_SYNONYMS)
    .filter(([key]) => normalized.includes(key) || key.includes(normalized))
    .flatMap(([, words]) => words);

  const tokens = [
    ...new Set([
      ...normalized.split(/\s+/).filter(Boolean),
      ...synonymHits,
    ]),
  ];

  return TOOLS.map((tool) => ({
    tool,
    score: scoreTool(tool, normalized, tokens),
  }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((row) => row.tool);
}

export function getAllToolSlugs(): string[] {
  return TOOLS.map((t) => t.slug);
}

/** Categories that currently have at least one tool. */
export function getActiveCategories() {
  return CATEGORIES.filter((c) => getToolsByCategory(c.slug).length > 0);
}

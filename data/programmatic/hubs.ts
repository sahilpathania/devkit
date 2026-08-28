import type { PseoHub } from "@/lib/pseo/types";

export const PSEO_HUBS: PseoHub[] = [
  {
    type: "hub",
    slug: "image-tools",
    cluster: "image",
    keyword: "image tools",
    h1: "Image Tools",
    title: "Image Tools — Compress, Resize, Convert",
    description:
      "Free in-browser image tools: compress to a KB cap, resize for social and forms, convert HEIC to JPG. No account.",
    categorySlug: "images",
    intro: [
      "These pages are for a specific job — 20KB forms, WhatsApp, LinkedIn, passport-style uploads — not a single generic compress button with the keyword swapped.",
      "Every guide embeds a real ToolBay tool. Files stay in your browser. If you just want the full catalog, use the Images category.",
    ],
    faqs: [
      {
        question: "Do these tools upload my photos?",
        answer: "No. Compression and conversion run in the browser.",
      },
      {
        question: "Which page should I open?",
        answer:
          "Start from the limit you were given (20KB, 50KB, 1MB) or the app (WhatsApp, Instagram, LinkedIn). Government photo + pixels → government form or passport pages.",
      },
    ],
    relatedHubSlugs: ["pdf-tools", "json-tools", "text-tools"],
  },
  {
    type: "hub",
    slug: "pdf-tools",
    cluster: "pdf",
    keyword: "PDF tools",
    h1: "PDF Tools",
    title: "PDF Tools — Merge and Split",
    description:
      "Merge application packets or extract ID pages from a scan. PDF tools run locally in your browser.",
    categorySlug: "documents",
    intro: [
      "Merge is for one upload slot. Split is for sending only the pages a form asked for. Different jobs, same PDF engine.",
      "Merging does not compress scans. If a portal has a megabyte cap, shrink images before you merge.",
    ],
    faqs: [
      {
        question: "Can I compress a PDF to 500KB here?",
        answer:
          "Not as a dedicated compressor yet. Merge and split do not reduce photo-heavy scans. Reduce image DPI first, then merge.",
      },
      {
        question: "Are my PDFs uploaded?",
        answer: "No. Processing is in the browser.",
      },
    ],
    relatedHubSlugs: ["image-tools", "json-tools", "text-tools"],
  },
  {
    type: "hub",
    slug: "json-tools",
    cluster: "json",
    keyword: "JSON tools",
    h1: "JSON Tools",
    title: "JSON Tools — Pretty Print, Minify, Convert",
    description:
      "Pretty print or minify JSON, convert to CSV or YAML. Developer tools that run in your browser.",
    categorySlug: "developer",
    intro: [
      "Pretty print is for reading. Minify is for character caps. CSV is for Excel. YAML is for CI and Kubernetes. Pick the job, not a random JSON URL.",
      "Do not paste production secrets into any online tool if you can avoid it. These still run locally, which is the least-bad option.",
    ],
    faqs: [
      {
        question: "Pretty print vs formatter?",
        answer:
          "Same engine as JSON Formatter. These landings match search intent so you land on the right action.",
      },
      {
        question: "Is JSON validated?",
        answer: "Format and convert need valid JSON. Use JSON Validator on the tools list if you only need errors.",
      },
    ],
    relatedHubSlugs: ["image-tools", "pdf-tools", "text-tools"],
  },
  {
    type: "hub",
    slug: "text-tools",
    cluster: "text",
    keyword: "text tools",
    h1: "Text Tools",
    title: "Text Tools — Word and Character Counts",
    description:
      "Count characters for meta descriptions and SMS, or words for essays. Private, in-browser counters.",
    categorySlug: "text",
    intro: [
      "The same counter answers different limits: SERP snippets, SMS segments, and essay rubrics. The pages are split so the advice is not mixed.",
      "Counts can differ from Word or Google Docs by a few tokens. When a grade or a carrier bill depends on it, the other system wins.",
    ],
    faqs: [
      {
        question: "Can I remove duplicate lines here?",
        answer: "Not yet. These hubs only list jobs the live counter can do.",
      },
      {
        question: "Is text stored?",
        answer: "No. Paste stays in the tab.",
      },
    ],
    relatedHubSlugs: ["image-tools", "json-tools", "pdf-tools"],
  },
];

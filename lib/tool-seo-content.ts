import { SITE_CONFIG } from "@/lib/constants";
import type { Tool } from "@/types";

export interface ToolSeoStep {
  title: string;
  description: string;
}

export interface ToolSeoContentData {
  heading: string;
  intro: string;
  steps: ToolSeoStep[];
  useCases: string[];
}

function titleCase(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getLanguageFromSlug(slug: string): string | null {
  const match = slug.match(/^json-to-(.+)$/);
  if (!match || match[1] === "model") return null;
  if (match[1] === "csharp") return "C#";
  return titleCase(match[1]);
}

function sentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function buildUseCases(tool: Tool): string[] {
  const language = getLanguageFromSlug(tool.slug);
  const cases: string[] = [];

  if (language) {
    cases.push(
      `Generate ${language} models from a real API JSON sample`,
      `Paste the output into an existing ${language} project`
    );
  }

  for (const example of tool.examples) {
    if (example.title) cases.push(example.title);
  }

  if (cases.length === 0) {
    cases.push(...tool.tags.slice(0, 3).map((tag) => tag.replace(/-/g, " ")));
  }

  return Array.from(new Set(cases)).slice(0, 4);
}

function buildSteps(tool: Tool): ToolSeoStep[] {
  const language = getLanguageFromSlug(tool.slug);

  if (language) {
    return [
      { title: "Paste JSON", description: "Use a real API response so nested types come through." },
      { title: `Check the ${language} output`, description: "Scan names, optionals, and nested types." },
      { title: "Copy the code", description: "Drop it into your project and adjust if the sample was incomplete." },
    ];
  }

  if (tool.slug.includes("compress") || tool.slug.includes("merge") || tool.slug.includes("split")) {
    return [
      { title: "Add files", description: "They stay on your device." },
      { title: "Set options", description: "Quality, pages, or output format — whatever this tool exposes." },
      { title: "Download", description: "Save the result. Nothing is stored on our servers." },
    ];
  }

  return [
    { title: "Add input", description: "Paste, type, or upload. Use a sample if you just want to see it work." },
    { title: "Run it", description: "Processing happens in the browser." },
    { title: "Copy or download", description: "Take the output and close the tab." },
  ];
}

function buildIntro(tool: Tool): string {
  const language = getLanguageFromSlug(tool.slug);
  const description = sentence(tool.description);

  if (language) {
    return `${description} Output is ${language}-specific. Runs in your browser.`;
  }

  return `${description} Runs locally in your browser.`;
}

/** Compact crawlable copy for a tool detail page. */
export function buildToolSeoContent(tool: Tool): ToolSeoContentData {
  return {
    heading: `How ${tool.name} works`,
    intro: buildIntro(tool),
    steps: buildSteps(tool),
    useCases: buildUseCases(tool),
  };
}

export function getToolPrivacyLine(): string {
  return `${SITE_CONFIG.name} does not store your input. Close the tab and it is gone.`;
}

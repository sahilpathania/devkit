export type TextCaseMode =
  | "lower"
  | "upper"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "constant"
  | "kebab"
  | "slug";

export const TEXT_CASE_MODES: { value: TextCaseMode; label: string }[] = [
  { value: "lower", label: "lower case" },
  { value: "upper", label: "UPPER CASE" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "constant", label: "CONSTANT_CASE" },
  { value: "kebab", label: "kebab-case" },
  { value: "slug", label: "slug" },
];

function words(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function convertTextCase(input: string, mode: TextCaseMode): string {
  if (!input) return "";
  switch (mode) {
    case "lower":
      return input.toLowerCase();
    case "upper":
      return input.toUpperCase();
    case "title":
      return input
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
    case "sentence": {
      const lower = input.toLowerCase();
      return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    }
    case "camel": {
      const w = words(input);
      if (w.length === 0) return "";
      return (
        w[0]!.toLowerCase() +
        w
          .slice(1)
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
          .join("")
      );
    }
    case "pascal":
      return words(input)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join("");
    case "snake":
      return words(input)
        .map((p) => p.toLowerCase())
        .join("_");
    case "constant":
      return words(input)
        .map((p) => p.toUpperCase())
        .join("_");
    case "kebab":
      return words(input)
        .map((p) => p.toLowerCase())
        .join("-");
    case "slug":
      return words(input)
        .map((p) => p.toLowerCase())
        .join("-")
        .replace(/^-|-$/g, "");
  }
}

export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  lines: number;
  paragraphs: number;
  readingMinutes: number;
}

export function analyzeText(input: string): TextStats {
  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, "").length;
  const wordList = input.trim() ? input.trim().split(/\s+/).filter(Boolean) : [];
  const wordsCount = wordList.length;
  const sentences = input.trim()
    ? (input.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? []).filter((s) => s.trim()).length
    : 0;
  const lines = input === "" ? 0 : input.split(/\r?\n/).length;
  const paragraphs = input.trim()
    ? input
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean).length
    : 0;
  const readingMinutes = Math.max(0, Math.ceil(wordsCount / 200));
  return {
    characters,
    charactersNoSpaces,
    words: wordsCount,
    sentences,
    lines,
    paragraphs,
    readingMinutes,
  };
}

export interface RegexMatch {
  index: number;
  match: string;
  groups: string[];
  named?: Record<string, string>;
}

export type RegexResult =
  | { success: true; matches: RegexMatch[]; flags: string }
  | { success: false; error: string };

export function testRegex(
  pattern: string,
  flags: string,
  text: string
): RegexResult {
  if (!pattern) {
    return { success: false, error: "Enter a regular expression pattern." };
  }

  let re: RegExp;
  try {
    // Always use global for collecting all matches; track user flags separately
    const normalized = flags.includes("g") ? flags : `${flags}g`;
    re = new RegExp(pattern, normalized);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid regular expression.",
    };
  }

  const matches: RegexMatch[] = [];
  let match: RegExpExecArray | null;
  let guard = 0;

  while ((match = re.exec(text)) !== null) {
    guard++;
    if (guard > 5000) {
      return { success: false, error: "Too many matches (stopped at 5000)." };
    }
    if (match[0] === "" && re.lastIndex === match.index) {
      re.lastIndex++;
    }
    const groups = match.slice(1).map((g) => g ?? "");
    const named =
      match.groups && Object.keys(match.groups).length > 0
        ? { ...match.groups }
        : undefined;
    matches.push({
      index: match.index,
      match: match[0] ?? "",
      groups,
      named,
    });
    if (!flags.includes("g")) break;
  }

  return { success: true, matches, flags };
}

/** Build highlighted segments for the input text. */
export function highlightSegments(
  text: string,
  matches: RegexMatch[]
): { text: string; hit: boolean }[] {
  if (matches.length === 0) return [{ text, hit: false }];
  const sorted = [...matches].sort((a, b) => a.index - b.index);
  const parts: { text: string; hit: boolean }[] = [];
  let cursor = 0;

  for (const m of sorted) {
    if (m.index < cursor) continue;
    if (m.index > cursor) {
      parts.push({ text: text.slice(cursor, m.index), hit: false });
    }
    parts.push({ text: m.match, hit: true });
    cursor = m.index + m.match.length;
  }
  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), hit: false });
  }
  return parts;
}

export const REGEX_SAMPLE_PATTERN = String.raw`\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`;
export const REGEX_SAMPLE_TEXT = `Contact us at hello@devkit.dev or support@example.com
Invalid: not-an-email, @missing.com`;

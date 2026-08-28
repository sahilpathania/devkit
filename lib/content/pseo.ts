import type { PseoLanding } from "@/lib/pseo/types";

/** Flatten landing copy for a rough word-count guard at build time. */
export function landingWordCount(page: PseoLanding): number {
  const chunks = [
    page.whatItDoes,
    page.whyThisVersion,
    page.whoShouldUse,
    page.intent,
    page.audience,
    ...page.body,
    ...page.whenToUse,
    ...page.commonMistakes,
    ...page.tips,
    ...page.features.map((item) => `${item.title} ${item.body}`),
    ...page.benefits.map((item) => `${item.title} ${item.body}`),
    ...page.steps.map((item) => `${item.name} ${item.text}`),
    ...page.useCases.map((item) => `${item.title} ${item.body}`),
    ...page.examples.map((item) => `${item.title} ${item.body}`),
    ...page.faqs.map((item) => `${item.question} ${item.answer}`),
  ];
  return chunks.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

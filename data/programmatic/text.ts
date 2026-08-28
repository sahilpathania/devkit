import type { PseoLanding } from "@/lib/pseo/types";

export const TEXT_LANDINGS: PseoLanding[] = [
  {
    type: "landing",
    slug: "character-counter-for-meta-description",
    cluster: "text",
    keyword: "character counter for meta description",
    h1: "Character Counter for Meta Descriptions",
    title: "Meta Description Character Counter",
    description:
      "Count characters while you draft a meta description. Aim for a snippet that does not get cut off in search results. Runs locally.",
    hubSlug: "text-tools",
    toolSlug: "word-counter",
    categorySlug: "text",
    intent: "Stay inside a practical meta description length while you write, not after you ship.",
    audience: "SEO writers, founders, and marketers drafting title/meta copy.",
    whatItDoes:
      "Google does not publish a fixed character cap; snippets truncate by pixel width. In practice teams still budget about 150–160 characters. This page uses the word/character counter with that budget in mind — not essays, not tweets.",
    whyThisVersion:
      "A generic word counter talks about reading time. This landing talks about SERP truncation, keywords in the first clause, and why stuffing 300 characters is wasted.",
    whoShouldUse:
      "People editing `meta description` fields in a CMS.",
    whenToUse: [
      "You are writing or rewriting a snippet.",
      "A plugin warned you were over 160 characters.",
      "You want characters-with-spaces, which is what most CMS counters show.",
    ],
    commonMistakes: [
      "Writing 400 characters because “Google will pick the best bit.” You lose control of the snippet.",
      "Counting only words. Truncation is characters (and pixels).",
    ],
    tips: [
      "Put the promise in the first 120 characters.",
      "Match the page. A clever snippet that lies will bounce.",
    ],
    features: [
      { title: "Live character count", body: "Includes spaces." },
      { title: "Local paste", body: "Drafts of unreleased pages stay in the browser." },
      { title: "No login", body: "One field, one count." },
    ],
    benefits: [
      { title: "Fewer truncated snippets", body: "You see the length before CMS publish." },
      { title: "Faster edits", body: "Cut from the end, keep the hook." },
    ],
    steps: [
      { name: "Paste the draft", text: "Your current meta description." },
      { name: "Read characters", text: "Use the characters number, not words." },
      { name: "Trim", text: "Target ~150–160 as a working budget." },
      { name: "Paste back into the CMS", text: "Recheck after the CMS adds branding suffixes." },
    ],
    useCases: [
      { title: "Ecommerce product metas", body: "SKU pages with a hard CMS max." },
      { title: "Docs sites", body: "Every guide needs a unique snippet." },
    ],
    examples: [
      {
        title: "Too long",
        body: "A 240-character paragraph. Cut examples, keep the verb and the outcome.",
      },
    ],
    faqs: [
      {
        question: "Is 160 characters a Google rule?",
        answer:
          "No. It is a working heuristic. Pixel width and device change what users see. Still, 150–160 is a sane draft target.",
      },
      {
        question: "Title tags?",
        answer: "Titles are shorter (~50–60 characters). Use the same counter with a tighter budget.",
      },
    ],
    relatedSlugs: [
      "word-count-for-essays",
      "character-counter-for-sms",
    ],
    body: [
      "Meta descriptions are ad copy for a blue link. They are not the article. If you cannot say the point in 160 characters, the page title is doing too much work.",
      "CMS fields that append “| Brand” will blow your count after you paste. Count again in the live preview.",
    ],
  },
  {
    type: "landing",
    slug: "character-counter-for-sms",
    cluster: "text",
    keyword: "character counter for SMS",
    h1: "SMS Character Counter",
    title: "SMS Character Counter Online",
    description:
      "Count SMS characters and see when a message will split into more than one segment. Free, in your browser.",
    hubSlug: "text-tools",
    toolSlug: "word-counter",
    categorySlug: "text",
    intent: "Stay inside one SMS segment when cost or carrier splitting matters.",
    audience: "Support, product, and marketers sending OTPs or alerts over SMS.",
    whatItDoes:
      "GSM SMS is 160 characters in the basic alphabet, 70 if you use Unicode (emoji, many non-Latin scripts). This page cannot encode GSM vs UCS-2 for you, but it gives a raw character count so you can see you are in dangerous territory. For production billing, still test on your SMS provider.",
    whyThisVersion:
      "Meta description budgets are ~160 for a different reason. SMS 160 is a telecom limit. Mixing those intents on one page would be misleading.",
    whoShouldUse:
      "People writing OTP templates, shipping alerts, or school notices by text.",
    whenToUse: [
      "A provider charges per segment.",
      "You added an emoji and the cost doubled.",
      "Legal text must fit one bubble.",
    ],
    commonMistakes: [
      "Assuming 160 after adding emoji. Unicode often drops you to 70.",
      "Counting words. Carriers count characters (and encoding).",
    ],
    tips: [
      "Avoid emoji in OTPs if you care about one segment.",
      "Links eat budget. Use a short domain if you must.",
    ],
    features: [
      { title: "Character total", body: "The number you need for a first-pass budget." },
      { title: "Local", body: "OTP copy can stay off someone else’s server." },
      { title: "Instant", body: "Edit and watch the count." },
    ],
    benefits: [
      { title: "Fewer surprise splits", body: "Two segments can disorder on some handsets." },
      { title: "Cost control", body: "Bulk SMS is priced per segment." },
    ],
    steps: [
      { name: "Paste the template", text: "Including the `{code}` placeholder as it will expand." },
      { name: "Check characters", text: "Budget 160 GSM or 70 Unicode." },
      { name: "Remove emoji if needed", text: "Watch the count drop back." },
      { name: "Confirm with your SMS API", text: "They are source of truth for encoding." },
    ],
    useCases: [
      { title: "OTP messages", body: "Short, no emoji, one segment." },
      { title: "Shipping SMS", body: "Tracking links vs length." },
    ],
    examples: [
      {
        title: "OTP with emoji",
        body: "“Your code is 123456 🎉” may be UCS-2. Remove the emoji for GSM 160.",
      },
    ],
    faqs: [
      {
        question: "Does this show segment count?",
        answer:
          "It shows characters. Segment math depends on encoding. Use this as a draft check, then the provider’s estimator.",
      },
      {
        question: "WhatsApp vs SMS?",
        answer: "WhatsApp is not GSM SMS. Use the WhatsApp image page for photos; this page is telecom SMS.",
      },
    ],
    relatedSlugs: [
      "character-counter-for-meta-description",
      "word-count-for-essays",
    ],
    body: [
      "SMS is a 1990s packet format wearing a 2020s product UI. The 160-character story is still how bulk pricing works.",
      "If your users are not in GSM-default languages, assume 70 and write shorter. Test with the real From-ID; some prefixes add characters.",
    ],
  },
  {
    type: "landing",
    slug: "word-count-for-essays",
    cluster: "text",
    keyword: "word count for essays",
    h1: "Word Count for Essays",
    title: "Essay Word Counter Online",
    description:
      "Count words, sentences, and reading time for essays and assignments. Paste locally — nothing is stored.",
    hubSlug: "text-tools",
    toolSlug: "word-counter",
    categorySlug: "text",
    intent: "Hit a school or journal word window without trusting a flaky Google Docs footer.",
    audience: "Students and writers facing min/max word counts.",
    whatItDoes:
      "Assignment briefs say “800–1000 words.” Different tools count hyphenation and footnotes differently. This page shows words, sentences, and a rough reading time so you can see if you are in the window. It is not a plagiarism checker and not a citation generator.",
    whyThisVersion:
      "SMS and meta counters obsess over characters. Essays obsess over words. Same component, different contract with the user.",
    whoShouldUse:
      "Anyone who has been burned by Docs saying 998 and the portal saying 1004.",
    whenToUse: [
      "A min word count is enforced on upload.",
      "You need a quick reading-time sanity check.",
      "You pasted from PDF and want to see if line breaks inflated counts.",
    ],
    commonMistakes: [
      "Including the bibliography in the paste when the rubric says body only.",
      "Pasting twice. Clear first.",
    ],
    tips: [
      "Paste only the body the rubric counts.",
      "If the portal uses a different tokenizer, aim a little inside the range, not on the exact edge.",
    ],
    features: [
      { title: "Words and sentences", body: "More than a single number." },
      { title: "Reading time", body: "Rough minutes at a standard rate." },
      { title: "Private", body: "Unpublished essays stay in the tab." },
    ],
    benefits: [
      { title: "Rubric check", body: "See min/max before the 11:59pm upload." },
      { title: "Structure hint", body: "Sentence count going wild usually means run-ons." },
    ],
    steps: [
      { name: "Copy the body", text: "Skip title page if the school says so." },
      { name: "Paste", text: "Read the words figure." },
      { name: "Edit in your writer", text: "This is a counter, not an editor with styles." },
      { name: "Count again", text: "Before submit." },
    ],
    useCases: [
      { title: "Undergrad papers", body: "800-word reflections." },
      { title: "Statements of purpose", body: "Hard caps on portal textareas." },
    ],
    examples: [
      {
        title: "Docs vs portal",
        body: "Docs 1002, portal 989 because of how they split “state-of-the-art.” Leave a margin.",
      },
    ],
    faqs: [
      {
        question: "Does this match Microsoft Word?",
        answer: "Close, not guaranteed identical. When the grade depends on it, the portal’s counter wins.",
      },
      {
        question: "Footnotes?",
        answer: "If you paste them, they count. Leave them out if the rubric excludes them.",
      },
    ],
    relatedSlugs: [
      "character-counter-for-meta-description",
      "character-counter-for-sms",
    ],
    body: [
      "Word counts are social contracts. The number is less important than using the same rules as the person grading you.",
      "If you are 200 words short, you need arguments, not adjectives. A counter cannot invent sources.",
    ],
  },
];

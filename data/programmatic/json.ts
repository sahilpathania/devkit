import type { PseoLanding } from "@/lib/pseo/types";

export const JSON_LANDINGS: PseoLanding[] = [
  {
    type: "landing",
    slug: "json-pretty-print",
    cluster: "json",
    keyword: "JSON pretty print",
    h1: "JSON Pretty Print",
    title: "JSON Pretty Print Online",
    description:
      "Beautify minified JSON with indentation so you can read API responses. Runs in your browser — payloads stay on your machine.",
    hubSlug: "json-tools",
    toolSlug: "json-formatter",
    categorySlug: "developer",
    intent: "Turn one-line API JSON into an indented document you can actually read.",
    audience: "Developers debugging responses, logs, and config dumps.",
    whatItDoes:
      "Pretty print is the read path: 2-space or 4-space indent, not minify. Use this when a gateway logged a single-line body or a colleague pasted compact JSON in chat. The formatter on this page is the same engine as JSON Formatter; the copy and default job are about reading, not shipping bytes.",
    whyThisVersion:
      "Minify JSON is the opposite job. Mixing them on one generic page hides the intent. This URL exists for people who searched “pretty print.”",
    whoShouldUse:
      "Anyone staring at `{\"id\":1,\"items\":[...]}` in a terminal and losing nested objects.",
    whenToUse: [
      "An API client shows compact JSON.",
      "You need to compare two pretty copies visually.",
      "You are about to paste JSON into a review comment.",
    ],
    commonMistakes: [
      "Pretty printing invalid JSON and blaming the tool. Fix trailing commas first, or use the validator.",
      "Committing pretty JSON into a size-sensitive mobile bundle. Pretty is for humans.",
    ],
    tips: [
      "Use 2 spaces if you will paste into GitHub. Use tabs only if your repo already does.",
      "If parse fails, switch to JSON Validator for the line number.",
    ],
    features: [
      { title: "Indent choices", body: "2, 4, or tabs." },
      { title: "Local parse", body: "Production payloads never leave the tab." },
      { title: "Copy output", body: "Paste into an editor or ticket." },
    ],
    benefits: [
      { title: "See structure", body: "Nested objects stop looking like a ransom note." },
      { title: "Safer reviews", body: "You spot missing fields before they ship." },
    ],
    steps: [
      { name: "Paste JSON", text: "From the network panel, log, or file." },
      { name: "Beautify", text: "Run format with your indent." },
      { name: "Read", text: "Collapse in your head; check keys." },
      { name: "Copy if needed", text: "Do not minify unless you are saving bytes." },
    ],
    useCases: [
      { title: "Webhook debugging", body: "Stripe-style payloads are unreadable compacted." },
      { title: "Config in Slack", body: "Pretty print, then paste a snippet, not the secret-laden whole file." },
    ],
    examples: [
      {
        title: "Minified array of objects",
        body: "Beautify, then you can see whether `user` is null or missing.",
      },
    ],
    faqs: [
      {
        question: "Is pretty print the same as validate?",
        answer: "Pretty print must parse. If it fails, the JSON is invalid — use the validator for a clearer error.",
      },
      {
        question: "Does this sort keys?",
        answer: "No. Key order is preserved as parsed.",
      },
    ],
    relatedSlugs: [
      "minify-json",
      "json-to-csv-for-excel",
      "convert-json-to-yaml",
    ],
    body: [
      "Pretty print is a reading lamp, not a build step. CI should not depend on whitespace. Humans should.",
      "If the payload contains tokens, pretty printing it in a shared screenshot is still a leak. Format locally, redact, then share.",
    ],
  },
  {
    type: "landing",
    slug: "minify-json",
    cluster: "json",
    keyword: "minify JSON",
    h1: "Minify JSON",
    title: "Minify JSON Online",
    description:
      "Strip whitespace from JSON for logs, headers, and size-sensitive payloads. Minify locally in your browser.",
    hubSlug: "json-tools",
    toolSlug: "json-formatter",
    categorySlug: "developer",
    intent: "Remove insignificant whitespace so JSON is compact for transport or paste limits.",
    audience: "Developers stuffing JSON into env vars, query strings, or size-capped logs.",
    whatItDoes:
      "Minify is the write path: one line, no pretty indent. Use it when a platform counts characters (feature flags, SSM parameters, chat paste limits) or when you want a compact fixture. It is the inverse of pretty print.",
    whyThisVersion:
      "Searching “minify JSON” should not land on a beautify-first tutorial. This page leads with minify and warns when you should not minify (secrets in URLs, unreadable diffs).",
    whoShouldUse:
      "People hitting “value too long” on a JSON field, or building fixtures for tests.",
    whenToUse: [
      "An env var has a max length.",
      "You need a single-line JSON for a CLI flag.",
      "A logger truncates multiline bodies.",
    ],
    commonMistakes: [
      "Minifying, then committing to git where diffs become unreadable. Keep pretty in source, minify in build.",
      "Minifying JSON that is actually JavaScript with comments. Comments are not valid JSON.",
    ],
    tips: [
      "Pretty in the repo, minify at the boundary.",
      "If minify fails, validate first.",
    ],
    features: [
      { title: "One-click minify", body: "Same formatter, minify action." },
      { title: "Stats", body: "See that the byte count actually dropped." },
      { title: "Local", body: "Do not paste production PII into a random cloud formatter if you can avoid it — this one stays in-tab." },
    ],
    benefits: [
      { title: "Fits the field", body: "Character caps are real." },
      { title: "Fewer accidental newlines", body: "Shell-safe single line." },
    ],
    steps: [
      { name: "Paste valid JSON", text: "No comments, no trailing commas." },
      { name: "Minify", text: "Copy the single line." },
      { name: "Escape for the shell if needed", text: "Minify is not shell-escaping." },
      { name: "Store", text: "Prefer a secret manager over a chat log." },
    ],
    useCases: [
      { title: "Feature-flag JSON", body: "Dashboards often paste compact JSON." },
      { title: "Test fixtures over the wire", body: "Golden files can stay pretty; the request body minified." },
    ],
    examples: [
      {
        title: "Indented config to one line",
        body: "Beautified 40-line object → one line for an AWS parameter (watch the 4KB/8KB caps).",
      },
    ],
    faqs: [
      {
        question: "Does minify change values?",
        answer: "It should not. It only removes insignificant whitespace. Number formatting follows JSON.stringify rules.",
      },
      {
        question: "Can I minify JSONC?",
        answer: "No. Strip comments first.",
      },
    ],
    relatedSlugs: [
      "json-pretty-print",
      "json-to-csv-for-excel",
      "convert-json-to-yaml",
    ],
    body: [
      "Minify is for machines and for fields that hate newlines. It is a hostile format for pull requests.",
      "Character limits on vendor consoles are why this search exists. If you are under the cap already, pretty print is kinder to the next human.",
    ],
  },
  {
    type: "landing",
    slug: "json-to-csv-for-excel",
    cluster: "json",
    keyword: "JSON to CSV for Excel",
    h1: "JSON to CSV for Excel",
    title: "JSON to CSV for Excel Online",
    description:
      "Turn a JSON array of objects into CSV you can open in Excel or Google Sheets. Conversion stays in your browser.",
    hubSlug: "json-tools",
    toolSlug: "csv-json",
    categorySlug: "developer",
    intent: "Get API rows into a spreadsheet without writing a script.",
    audience: "Analysts and developers who received JSON and need a table.",
    whatItDoes:
      "Excel does not eat nested JSON. This page is for a JSON array of flat-ish objects → CSV. Nested objects will flatten poorly; the copy here tells you when to flatten in code first. The converter is bidirectional; this landing is JSON→CSV for spreadsheet people.",
    whyThisVersion:
      "Pretty print does not make a spreadsheet. CSV→JSON is the other direction. This URL matches the Excel intent.",
    whoShouldUse:
      "Anyone who exported an API list and needs filters, pivot tables, or a finance teammate to look at it.",
    whenToUse: [
      "You have `[{...},{...}]` from an endpoint.",
      "Someone asked for an .csv or Excel file.",
      "The objects are mostly the same keys.",
    ],
    commonMistakes: [
      "Converting a single nested object. You want an array of rows.",
      "Expecting Excel to keep leading zeros in IDs. Prefix or import as text.",
    ],
    tips: [
      "Normalize keys first if some rows omit fields.",
      "UTF-8 CSV: Excel on Windows may want a BOM for accents — check if characters look wrong.",
    ],
    features: [
      { title: "Array to rows", body: "Each object becomes a CSV line." },
      { title: "Local", body: "Customer lists never upload." },
      { title: "Copy or download", body: "Paste into Sheets if you prefer." },
    ],
    benefits: [
      { title: "Non-dev friendly", body: "Finance can open CSV." },
      { title: "Quick audit", body: "Spot duplicate IDs in a sheet." },
    ],
    steps: [
      { name: "Paste a JSON array", text: "Not a wrapped `{ data: [...] }` unless you extract the array." },
      { name: "Convert to CSV", text: "Check the header row." },
      { name: "Open in Excel", text: "Data → From text if encodings misbehave." },
      { name: "Do not round-trip secrets", text: "Sheets are forever in email." },
    ],
    useCases: [
      { title: "Admin exports", body: "Users endpoint → spreadsheet." },
      { title: "One-off reports", body: "Faster than Python for twenty rows." },
    ],
    examples: [
      {
        title: "Orders array",
        body: "`[{\"id\":1,\"total\":9.5}]` → id,total rows.",
      },
    ],
    faqs: [
      {
        question: "Nested JSON?",
        answer: "CSV is flat. Flatten or pick leaf fields first. This converter will not magically make a star schema.",
      },
      {
        question: "JSON Lines?",
        answer: "Wrap lines into an array or convert line by line in a script. This tool expects JSON, not NDJSON, unless you paste a valid array.",
      },
    ],
    relatedSlugs: [
      "json-pretty-print",
      "minify-json",
      "convert-json-to-yaml",
    ],
    body: [
      "Spreadsheets are the interoperability layer of companies that will never run Jupyter. CSV is the peace treaty.",
      "If the JSON is a tree (user.address.city), agree on a flatten rule before you convert, or you will invent column names you cannot round-trip.",
    ],
  },
  {
    type: "landing",
    slug: "convert-json-to-yaml",
    cluster: "json",
    keyword: "convert JSON to YAML",
    h1: "Convert JSON to YAML",
    title: "JSON to YAML Converter Online",
    description:
      "Convert JSON config to YAML for Kubernetes, GitHub Actions, and Docker Compose. Runs entirely in your browser.",
    hubSlug: "json-tools",
    toolSlug: "json-yaml",
    categorySlug: "developer",
    intent: "Move a JSON config into YAML with the indentation humans expect in DevOps files.",
    audience: "Engineers editing k8s manifests, CI workflows, and Compose files.",
    whatItDoes:
      "YAML is JSON’s indent-sensitive cousin. This landing is JSON→YAML for config, not a YAML linter. Watch out for `on`, `yes`, and country codes that YAML 1.1 treats as booleans — the copy calls that out because a silent type change breaks CI.",
    whyThisVersion:
      "Pretty print stays in JSON. This page is specifically the DevOps interchange and the boolean footgun.",
    whoShouldUse:
      "People who got a JSON blob from an API and need it in a `.yml` repo file.",
    whenToUse: [
      "Copying a JSON example from docs into a workflow file.",
      "Translating a JSON Helm values snippet.",
      "You prefer YAML in git diffs.",
    ],
    commonMistakes: [
      "Not quoting `on: push` style keys if they went through a bad converter. Check GitHub Actions files.",
      "Expecting comments to survive. JSON has no comments; they will not appear.",
    ],
    tips: [
      "After convert, scan for unquoted `yes`, `no`, `on`, `off`.",
      "Keep secrets out of both JSON and YAML in tickets.",
    ],
    features: [
      { title: "Bidirectional engine", body: "JSON↔YAML in one tool; this page is JSON→YAML." },
      { title: "Local", body: "Cluster configs stay in the tab." },
      { title: "Fast iterate", body: "Paste, convert, paste into the PR." },
    ],
    benefits: [
      { title: "Readable git diffs", body: "YAML is kinder than minified JSON in reviews." },
      { title: "Matches k8s culture", body: "Manifests are YAML." },
    ],
    steps: [
      { name: "Paste JSON", text: "Valid JSON only." },
      { name: "Convert to YAML", text: "Copy the output." },
      { name: "Quote risky scalars", text: "Especially in Actions and Ansible." },
      { name: "Commit", text: "Run your usual YAML linter in CI." },
    ],
    useCases: [
      { title: "GitHub Actions", body: "Docs often show JSON; repos want YAML." },
      { title: "K8s ConfigMaps", body: "JSON application config → YAML wrapper." },
    ],
    examples: [
      {
        title: "Nested settings object",
        body: "JSON object → indented YAML map. Verify lists stayed lists.",
      },
    ],
    faqs: [
      {
        question: "Does this support YAML anchors?",
        answer: "You get a straightforward dump, not an authoring IDE. Add anchors by hand if you need them.",
      },
      {
        question: "JSON to YAML data loss?",
        answer: "Types should round-trip for ordinary objects and arrays. YAML 1.1 boolean guessing is the famous exception — quote strings that look like booleans.",
      },
    ],
    relatedSlugs: [
      "json-pretty-print",
      "minify-json",
      "json-to-csv-for-excel",
    ],
    body: [
      "YAML exists so humans can edit config. JSON exists so machines can not argue about whitespace. Converting toward YAML is a gift to the next editor.",
      "The Norway problem (`NO`) is not a joke in inventory files. If a value must stay a string, quote it after conversion.",
    ],
  },
];

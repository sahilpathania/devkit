import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const toolsSource = fs.readFileSync(path.join(root, "services/tools.ts"), "utf8");
const categoriesSource = fs.readFileSync(path.join(root, "services/categories.ts"), "utf8");
const siteUrl = "https://toolbay.in";

const categoryRows = [...categoriesSource.matchAll(/slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"/g)].map((match) => ({
  slug: match[1],
  name: match[2],
  description: match[3],
}));
const categoryBySlug = new Map(categoryRows.map((category) => [category.slug, category]));

const blocks = [...toolsSource.matchAll(/\n  \{\n    slug:\s*"([^"]+)"([\s\S]*?)(?=\n  \},\n  \{|\n\];)/g)];
const tools = blocks.map((match) => {
  const block = match[2];
  const name = block.match(/\n    name:\s*"([^"]+)"/)?.[1] ?? match[1];
  const category = block.match(/\n    category:\s*"([^"]+)"/)?.[1] ?? "utilities";
  const title = block.match(/\n      title:\s*"([^"]+)"/)?.[1] ?? `${name} Online Tool`;
  const description = block.match(/\n      description:\s*"([^"]+)"/)?.[1] ?? `Use ${name} online for free.`;
  const keywordBlock = block.match(/\n      keywords:\s*\[([^\]]*)\]/)?.[1] ?? "";
  const keywords = [...keywordBlock.matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  const tags = [...(block.match(/\n    tags:\s*\[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  return { slug: match[1], name, category, title, description, keywords, tags };
});

function titleCase(value) {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
function unique(items) {
  return [...new Set(items.filter(Boolean).map((item) => item.trim().toLowerCase()))];
}
function primary(tool) {
  return tool.keywords[0] ?? `${tool.name.toLowerCase()} online`;
}
function secondary(tool) {
  const base = primary(tool);
  return unique([
    ...tool.keywords,
    `${base} free`,
    `${base} online`,
    `${tool.name.toLowerCase()} tool`,
    `free online ${tool.name.toLowerCase()}`,
    ...tool.tags,
    `${tool.category} tools`,
  ]).filter((keyword) => keyword !== base).slice(0, 10);
}
function longTail(tool) {
  const base = primary(tool);
  return [
    `${base} online free`,
    `best free ${base}`,
    `how to use ${base}`,
    `${base} no signup`,
    `${base} in browser`,
    `${base} private online`,
    `${base} for developers`,
    `${base} on mobile`,
    `fast ${base} tool`,
    `${base} without installing software`,
  ];
}
function difficulty(tool) {
  const highCompetition = /converter|generator|compress|pdf|image|password|calculator/.test(primary(tool));
  return highCompetition ? "Medium" : "Easy";
}
function volume(tool) {
  const highVolume = /json|pdf|image|password|qr|converter|compress/.test(primary(tool));
  return highVolume ? "10K-100K/mo (directional)" : "1K-10K/mo (directional)";
}
function intent(tool) {
  return /generator|converter|formatter|validator|tester|viewer|decoder|compress|counter|calculator/.test(tool.name.toLowerCase()) ? "Transactional / tool use" : "Transactional / informational";
}
function competitors(tool) {
  const category = tool.category;
  const defaults = {
    developer: "freeformatter.com; jsonformatter.org; devtool.tech",
    documents: "smallpdf.com; ilovepdf.com; adobe.com/acrobat/online",
    images: "iloveimg.com; cloudconvert.com; convertio.co",
    design: "coolors.co; css-tricks.com; lottiefiles.com",
    converters: "rapidtables.com; urlencoder.org; base64decode.org",
    calculators: "calculator.net; omnicalculator.com; unitconverters.net",
    generators: "qr-code-generator.com; uuidgenerator.net; lastpass.com",
    security: "jwt.io; md5online.org; 1password.com/password-generator",
    text: "regex101.com; wordcounter.net; convertcase.net",
    utilities: "branch.io; deep-link.me; webtools.dev",
  };
  return defaults[category] ?? "Google SERP competitors vary by query";
}
function esc(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}
function toolRow(tool, priority = "High") {
  const category = categoryBySlug.get(tool.category)?.name ?? titleCase(tool.category);
  const base = primary(tool);
  return `| [${esc(tool.name)}](${siteUrl}/tool/${tool.slug}) | ${esc(tool.name)} | ${category} | ${base} | ${secondary(tool).join("; ")} | ${longTail(tool).join("; ")} | ${intent(tool)} | ${difficulty(tool)} | ${volume(tool)} | ${competitors(tool)} | ${esc(tool.title)} | ${esc(tool.description)} | ${esc(tool.name)} | /tool/${tool.slug} | ${esc(tool.title)} | ${esc(tool.description)} | ${esc(tool.title)} | ${esc(tool.description)} | ${priority} |`;
}

const lines = [
  "# ToolBay SEO Keyword Map",
  "",
  `Generated from the live ToolBay registry on ${new Date().toISOString().slice(0, 10)}. Canonical host: ${siteUrl}.`,
  "",
  "> Search volume and difficulty are directional planning estimates, not measured third-party data. Validate priority with Google Search Console, Google Keyword Planner, Ahrefs, or Semrush before publishing. Competitor domains are discovery targets, not verified page-level matches.",
  "",
  "## Crawl Inventory",
  "",
    `The application registry contains ${tools.length} tool pages and ${categoryRows.length} category pages. Static routes are /, /search, /privacy, and /terms. Tool routes are generated from services/tools.ts; category routes are generated from services/categories.ts.`,
  "",
  "## Page Mapping",
  "",
  "| URL | Tool Name | Category | Primary Keyword | Secondary Keywords (10) | Long-tail Keywords (10) | Search Intent | Difficulty | Estimated Search Volume | Competitor Pages | Meta Title | Meta Description | H1 | Suggested Slug | Open Graph Title | Open Graph Description | Twitter Card Title | Twitter Card Description | Priority |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
  `| [ToolBay](${siteUrl}/) | ToolBay online tools | Homepage | online tools | free online tools; browser tools; privacy-first tools; developer utilities; file converters; productivity tools; no signup tools; web utilities; free browser apps; ToolBay | free online tools no signup; privacy-first online tools; convert files in browser; free developer and file tools; best online utilities; online tools that work locally; free tools for developers; browser-based productivity tools; ToolBay online toolkit; fast tools without registration | Navigational / transactional | Medium | 10K-100K/mo (directional) | tinywow.com; cloudconvert.com; developer.mozilla.org | ToolBay — Free Online Tools | Convert, compress, and edit files in your browser with free online tools. Private by default and no signup required. | Everything you need. One place. | / | ToolBay — Free Online Tools | Free browser tools for files, documents, images, and developer workflows. | ToolBay — Free Online Tools | Free browser tools for files, documents, images, and developer workflows. | Critical |`,
  `| [Search](${siteUrl}/search) | Tool Search | Search | online tool search | search online tools; find free tools; developer tool search; file tool search; utility finder; ToolBay search; browser tool directory; find a converter; search PDF tools; find image tools | find the right online tool; search free browser tools by task; find a private online converter; search developer utilities by name; find a tool without signup; search ToolBay tools; discover PDF and image tools; online tool directory search; find free productivity tools; search tools by category | Navigational / transactional | Easy | 1K-10K/mo (directional) | Product Hunt directories; alternative.me; tool directories | Search Tools — ToolBay | Search free online tools by name, category, or what you need to do. | Search | /search | Search Tools — ToolBay | Find the right free online tool by name, category, or task. | Search Tools — ToolBay | Find the right free online tool by name, category, or task. | Low |`,
  ...categoryRows.map((category) => `| [${category.name} Tools](${siteUrl}/category/${category.slug}) | ${category.name} Tools | ${category.name} | ${category.name.toLowerCase()} tools | free ${category.name.toLowerCase()} tools; online ${category.name.toLowerCase()} tools; ${category.name.toLowerCase()} utilities; browser ${category.name.toLowerCase()} tools; private ${category.name.toLowerCase()} tools; no signup ${category.name.toLowerCase()} tools; best ${category.name.toLowerCase()} tools; fast ${category.name.toLowerCase()} tools; ToolBay ${category.name.toLowerCase()}; free online tools | best free ${category.name.toLowerCase()} tools online; private ${category.name.toLowerCase()} tools in browser; ${category.name.toLowerCase()} tools without signup; free ${category.name.toLowerCase()} utilities; ${category.name.toLowerCase()} tools for everyday work; online ${category.name.toLowerCase()} toolkit; fast browser ${category.name.toLowerCase()} tools; ToolBay ${category.name.toLowerCase()} directory; simple ${category.name.toLowerCase()} tools; free ${category.name.toLowerCase()} tool collection | Commercial investigation / transactional | Medium | 1K-10K/mo (directional) | ${competitors({ category: category.slug, name: category.name })} | ${category.name} Tools — ToolBay | ${category.description} | ${category.name} Tools | /category/${category.slug} | ${category.name} Tools — ToolBay | ${category.description} | ${category.name} Tools — ToolBay | ${category.description} | High |`),
  ...tools.map((tool) => toolRow(tool, tool.keywords.length >= 4 ? "High" : "Medium")),
  "",
  "## Static Page Notes",
  "",
  "| URL | Target | SEO guidance |",
  "|---|---|---|",
  `| ${siteUrl}/privacy | Privacy policy | Keep indexable only if it supports trust; avoid targeting commercial tool keywords. |`,
  `| ${siteUrl}/terms | Terms of service | Keep indexable if required for trust, but assign low SEO priority. |`,
  "",
  "## Social Media SEO Mapping",
  "",
  "### X (Twitter)",
  "JSON Formatter; JWT Decoder; Regex Tester; API Response Viewer; Base64 Encode/Decode",
  "Keywords: json formatter online; jwt decoder; regex tester; API tools; developer utilities; JSON tools",
  "Bio keywords: JSON Formatter • JWT Decoder • Developer Tools",
  "",
  "### LinkedIn",
  "PDF tools; Image Compressor; Word to PDF; Markdown to PDF; Currency Converter",
  "Keywords: PDF tools; image compression; document productivity; online converters; privacy-first tools",
  "Bio keywords: PDF Tools • Image Compressor • Productivity Utilities",
  "",
  "### Instagram",
  "QR Code Generator; Image Converter; SVG Converter; Color Palette Generator",
  "Keywords: QR code generator; image converter; PNG to JPG; SVG tools; color palettes; free online tools",
  "Bio keywords: QR Codes • Image Tools • Design Utilities",
  "",
  "### GitHub",
  "Base64 Encode/Decode; Regex Tester; JSON to TypeScript; JSON to Go; CSS to SCSS",
  "Keywords: base64 encoder; regex tester; JSON code generator; developer utilities; programming tools",
  "Bio keywords: Developer Utilities • JSON Tools • Code Generators",
  "",
  "### YouTube",
  "JSON Formatter; PDF Converter; JWT Decoder; Image Compressor",
  "Keywords: JSON formatter tutorial; convert Word to PDF; decode JWT; compress images online; browser tools",
  "",
  "### Pinterest",
  "Image Compressor; QR Code Generator; Color Palette Generator; Image Converter",
  "Keywords: image compression; QR code ideas; color palettes; PNG to JPG; design tools",
  "",
  "### Dev.to",
  "JSON Formatter; Regex Tester; JSON to TypeScript; API Response Viewer",
  "Keywords: JavaScript tools; JSON formatter; regex debugging; API response debugging; TypeScript generators",
  "",
  "### Medium",
  "API Response Viewer; PDF Tools; Privacy-first browser utilities",
  "Keywords: API debugging; PDF productivity; local-first tools; developer workflow; file conversion",
  "",
  "## Master Keyword Sheet",
  "",
  "| Page | Primary Keyword | Secondary Keywords | LSI Keywords | Long-tail Keywords | Category | Priority | Target Platform | Internal Links | External Link Opportunities |",
  "|---|---|---|---|---|---|---|---|---|---|",
  ...tools.map((tool) => `| /tool/${tool.slug} | ${primary(tool)} | ${secondary(tool).join("; ")} | ${unique([...tool.tags, tool.category, "online", "free", "browser", "privacy", "no signup"]).join("; ")} | ${longTail(tool).join("; ")} | ${categoryBySlug.get(tool.category)?.name ?? titleCase(tool.category)} | ${tool.keywords.length >= 4 ? "High" : "Medium"} | ${tool.category === "developer" ? "X; GitHub; Dev.to" : tool.category === "images" ? "Instagram; Pinterest" : tool.category === "documents" ? "LinkedIn; YouTube" : "X; YouTube"} | Related tools in same category; homepage popular tools; category page | Product directories; documentation references; relevant GitHub projects |`),
  "",
  "## Content Gap Analysis",
  "",
  "These are opportunity hypotheses based on common search demand patterns and the existing product scope. Validate demand and SERP competition before building.",
  "",
  "| Priority | Candidate tool | Why it matters | Build effort | Likely category |",
  "|---|---|---|---|---|",
  "| 1 | PDF Compressor | High-intent PDF task adjacent to existing merge/split/PDF tools. | Easy | Documents |",
  "| 2 | PDF Editor | Strong commercial demand and links naturally from PDF utilities. | Medium | Documents |",
  "| 3 | PDF to Word | High-volume conversion query with clear intent. | Medium | Documents |",
  "| 4 | JPG to PDF | High-volume image/document workflow. | Easy | Images |",
  "| 5 | PNG to JPG | Common image conversion query and easy browser implementation. | Easy | Images |",
  "| 6 | HEIC to JPG | High mobile-photo demand and strong utility intent. | Medium | Images |",
  "| 7 | Image Background Remover | High CPC and social creator demand; may require a model/API. | Hard | Images |",
  "| 8 | Screenshot to PDF | Useful document workflow and easy client-side composition. | Medium | Documents |",
  "| 9 | CSV Viewer | Developer and analyst demand; complements CSV converters. | Easy | Developer |",
  "| 10 | CSV Formatter | Easy build with clear long-tail queries. | Easy | Developer |",
  "| 11 | YAML Formatter | Strong adjacency to JSON/YAML converters. | Easy | Developer |",
  "| 12 | XML Formatter | High-intent developer utility and simple implementation. | Easy | Developer |",
  "| 13 | JWT Generator | Pairs with the existing decoder and earns developer links. | Medium | Security |",
  "| 14 | Cron Expression Generator | Frequent developer search and easy deterministic UI. | Easy | Developer |",
  "| 15 | Unix Cron Parser | Low competition long-tail opportunity. | Easy | Developer |",
  "| 16 | Color Picker | Broad design demand and strong visual social content. | Easy | Design |",
  "| 17 | Contrast Checker | Accessibility demand, high-quality backlinks, easy build. | Easy | Design |",
  "| 18 | CSS Gradient Generator | Strong visual intent and Pinterest/Instagram fit. | Easy | Design |",
  "| 19 | Lorem Ipsum Generator | Easy build and broad content utility. | Easy | Generators |",
  "| 20 | Random Number Generator | High-volume simple utility. | Easy | Generators |",
  "| 21 | Markdown Editor | Longer sessions and internal links to Markdown converters. | Medium | Documents |",
  "| 22 | HTML Formatter | Developer demand and natural pairing with HTML tools. | Easy | Developer |",
  "| 23 | SQL Formatter | High developer intent and strong tutorial content potential. | Medium | Developer |",
  "| 24 | SQL Minifier | Adjacent low-competition utility. | Easy | Developer |",
  "| 25 | JSON Diff Checker | Strong API debugging use case. | Easy | Developer |",
  "| 26 | JSON Schema Validator | Higher-value developer intent than generic validation. | Medium | Developer |",
  "| 27 | API Request Builder | High workflow value, but broader implementation. | Medium | Developer |",
  "| 28 | HTTP Status Code Checker | Easy informational utility with internal-link potential. | Easy | Developer |",
  "| 29 | User Agent Parser | Niche but easy technical SEO opportunity. | Easy | Developer |",
  "| 30 | IP Address Lookup | High volume but privacy/legal considerations require care. | Medium | Utilities |",
  "| 31 | Time Zone Converter | Broad calculator demand and recurring use. | Easy | Calculators |",
  "| 32 | Date Calculator | High utility and internal-link fit with age calculator. | Easy | Calculators |",
  "| 33 | Business Days Calculator | Valuable long-tail commercial intent. | Easy | Calculators |",
  "| 34 | Loan Calculator | High volume and CPC, but competitive SERP. | Medium | Calculators |",
  "| 35 | BMI Calculator | High volume, straightforward build, competitive. | Easy | Calculators |",
  "| 36 | Tip Calculator | Easy high-intent calculator query. | Easy | Calculators |",
  "| 37 | VAT Calculator | High CPC and regional long-tail variants. | Easy | Calculators |",
  "| 38 | Compound Interest Calculator | High-value finance query, competitive. | Easy | Calculators |",
  "| 39 | Password Strength Checker | Strong security adjacency and easy build. | Easy | Security |",
  "| 40 | bcrypt Generator/Verifier | Developer security demand; must explain safe use. | Medium | Security |",
  "| 41 | HMAC Generator | Technical long-tail with low competition. | Medium | Security |",
  "| 42 | SHA-3 Hash Generator | Expands existing hash coverage. | Easy | Security |",
  "| 43 | URL Parser | Complements URL encoding and deep links. | Easy | Converters |",
  "| 44 | Query String Builder | Useful developer workflow and easy build. | Easy | Converters |",
  "| 45 | HTML Entity Encoder | Strong web-development adjacency. | Easy | Converters |",
  "| 46 | Unicode Converter | Broad developer/text utility. | Easy | Converters |",
  "| 47 | Case-insensitive Search Tester | Niche text utility with easy implementation. | Easy | Text |",
  "| 48 | Text Diff Checker | Broad productivity demand and linkable output. | Easy | Text |",
  "| 49 | Reading Time Calculator | Easy content-creator utility. | Easy | Text |",
  "| 50 | Duplicate Line Remover | Easy long-tail productivity tool. | Easy | Text |",
  "",
  "## Opportunity Ranking",
  "",
  "The current highest opportunities are: JSON Formatter, Image Compressor, Merge PDF, QR Code Generator, PDF to Text, Word to PDF, Image Converter, JSON to TypeScript, Regex Tester, JWT Decoder, PDF to Image, and Password Generator. Rank should be recalculated with real impressions, clicks, CTR, conversion rate, and query-level difficulty after 28-90 days of Search Console data.",
  "",
  "## Technical SEO Recommendations",
  "",
  "1. Keep one canonical host: `https://toolbay.in`; redirect every `devkit.dev` and `www.devkit.dev` request to the equivalent ToolBay URL with a permanent redirect.",
  "2. Submit `https://toolbay.in/sitemap.xml` in Search Console and request reindexing for the homepage and highest-priority tool pages after deployment.",
  "3. Verify the rendered HTML, not only source files, for `rel=canonical`, `og:url`, JSON-LD URLs, and `metadataBase` on representative homepage, category, and tool URLs.",
  "4. Keep category pages indexable and link every tool from its category page; add contextual related-tool links on tool pages to distribute authority.",
  "5. Do not create thin pages for every keyword variation. Use one canonical page per tool and expand useful content, FAQs, examples, and internal links instead.",
  "6. Add Organization/WebSite schema globally and SoftwareApplication plus BreadcrumbList schema on tool pages; keep claims factual and consistent with the UI.",
  "7. Use Search Console query data to replace directional volume estimates and remove any secondary keyword that begins competing with another page.",
];

const output = path.join(root, "docs/SEO_KEYWORD_MAP.md");
fs.writeFileSync(output, `${lines.join("\n")}\n`);
console.log(`Wrote ${output} with ${tools.length} tool mappings and ${categoryRows.length} category mappings.`);

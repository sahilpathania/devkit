import type { PseoLanding } from "@/lib/pseo/types";

export const PDF_LANDINGS: PseoLanding[] = [
  {
    type: "landing",
    slug: "merge-pdf-for-application",
    cluster: "pdf",
    keyword: "merge PDF for application",
    h1: "Merge PDF for an Application",
    title: "Merge PDF for Application Online",
    description:
      "Combine résumé, cover letter, and certificates into one PDF for a portal that allows a single attachment. Merges in your browser.",
    hubSlug: "pdf-tools",
    toolSlug: "merge-pdf",
    categorySlug: "documents",
    intent: "Build one packet PDF when a job or admissions portal only accepts a single file.",
    audience: "Applicants who have several PDFs and one upload slot.",
    whatItDoes:
      "This is not a generic “smash any PDFs together” pitch. Application portals often allow one PDF: CV + cover letter + ID + marks sheets. Order matters. This page uses the merge tool with that packet workflow in mind.",
    whyThisVersion:
      "The main Merge PDF tool does not explain packet order, file-name conventions, or size limits after merge. Those details are why applications bounce even after a technically valid merge.",
    whoShouldUse:
      "People submitting university, visa, or job packets where the UI has a single “upload document” button.",
    whenToUse: [
      "The portal says “upload one PDF.”",
      "You have certificates as separate scans.",
      "You need a predictable page order (CV first, then letters).",
    ],
    commonMistakes: [
      "Merging before rotating landscape scans. Recipients read page 4 sideways.",
      "Including a 40MB photo-scan of a certificate. Merge does not magically shrink scans.",
    ],
    tips: [
      "Name files 01-cv.pdf, 02-cover.pdf so sort order is obvious before you merge.",
      "If the portal has a MB cap, compress scans first or split later — merge only concatenates.",
    ],
    features: [
      { title: "Reorder files", body: "Put the CV first even if you uploaded certificates earlier." },
      { title: "Local merge", body: "Offer letters and IDs are not uploaded to ToolBay." },
      { title: "One download", body: "A single packet for the portal." },
    ],
    benefits: [
      { title: "One slot, full packet", body: "Stop zipping when the form wants PDF only." },
      { title: "You control order", body: "Reviewers should not hunt for the résumé." },
    ],
    steps: [
      { name: "Collect PDFs", text: "Export Word files to PDF first if needed." },
      { name: "Order them", text: "CV, letter, ID, then extras." },
      { name: "Merge", text: "Run merge and open the result." },
      { name: "Upload the packet", text: "Keep the separate originals in case one school wants them split." },
    ],
    useCases: [
      { title: "Job portals", body: "Workday-style systems with one attachment." },
      { title: "Admissions", body: "Transcripts plus SOP as one file." },
    ],
    examples: [
      {
        title: "Three-file job pack",
        body: "01-resume.pdf, 02-cover.pdf, 03-portfolio-select.pdf → one merged.pdf.",
      },
    ],
    faqs: [
      {
        question: "Does merge compress the PDF?",
        answer: "No. It concatenates pages. Huge scans stay huge. Shrink those first if the portal has a cap.",
      },
      {
        question: "Are bookmarks preserved?",
        answer: "Treat the output as a simple page stream. Do not rely on advanced PDF features.",
      },
    ],
    relatedSlugs: [
      "split-pdf-extract-pages",
      "merge-pdf-for-print",
      "json-pretty-print",
    ],
    body: [
      "Portals are allergic to ZIP files and extra fields. They want one PDF because their ATS vendor billed them for one blob column. Your job is to make that blob readable in the first thirty seconds.",
      "Order is courtesy. A reviewer who opens a 20-page scan of certificates before the résumé will not hunt. Put the document they asked for first.",
    ],
  },
  {
    type: "landing",
    slug: "merge-pdf-for-print",
    cluster: "pdf",
    keyword: "merge PDF for print",
    h1: "Merge PDF for Print",
    title: "Merge PDF for Print Online",
    description:
      "Combine handouts, slides, and worksheets into one print job. Merge locally, then send a single file to the printer.",
    hubSlug: "pdf-tools",
    toolSlug: "merge-pdf",
    categorySlug: "documents",
    intent: "One print queue item instead of ten open files at a copy shop or office printer.",
    audience: "Teachers, students, and office staff printing a set of PDFs.",
    whatItDoes:
      "Print dialogs remember settings per file. Merging first means duplex, staple, and page range apply once. This landing is about that print-shop workflow, not job applications.",
    whyThisVersion:
      "Application merge cares about reviewer order. Print merge cares about paper, duplex, and not reprinting file 7 because you forgot it in the tray.",
    whoShouldUse:
      "Anyone standing at a printer with a pile of slide decks and PDFs.",
    whenToUse: [
      "A copy shop asks for one file.",
      "You want the same duplex setting on every handout.",
      "You keep skipping a file in a folder of ten.",
    ],
    commonMistakes: [
      "Mixing A4 and Letter without checking. The printer may scale oddly.",
      "Merging password-protected PDFs without unlocking first.",
    ],
    tips: [
      "Put a one-page cover first if the shop needs a job ticket.",
      "If one file is a presentation with huge images, expect a large merged file.",
    ],
    features: [
      { title: "Preserve order", body: "Slides, then worksheet, then rubric — as you arranged." },
      { title: "Offline-friendly", body: "No upload of internal handouts." },
      { title: "Single spool", body: "One document in the print dialog." },
    ],
    benefits: [
      { title: "Fewer misprints", body: "Settings apply to the whole packet." },
      { title: "Shop-friendly", body: "Copy centres prefer one PDF.", },
    ],
    steps: [
      { name: "Gather print-ready PDFs", text: "Export from slides if needed." },
      { name: "Order for the reader", text: "Cover, content, appendix." },
      { name: "Merge", text: "Download the combined file." },
      { name: "Print once", text: "Set duplex on the whole job." },
    ],
    useCases: [
      { title: "Classroom packs", body: "Lecture slides plus lab sheet." },
      { title: "Meeting decks", body: "Agenda + slides + budget appendix." },
    ],
    examples: [
      {
        title: "Workshop pack",
        body: "00-agenda.pdf, 01-slides.pdf, 02-exercises.pdf merged for a 40-copy run.",
      },
    ],
    faqs: [
      {
        question: "Will page numbers restart?",
        answer: "Each source keeps its own numbering unless you add numbers in another tool.",
      },
      {
        question: "Color vs grayscale?",
        answer: "That is a printer setting, not a merge setting.",
      },
    ],
    relatedSlugs: [
      "merge-pdf-for-application",
      "split-pdf-extract-pages",
    ],
    body: [
      "Printers are stateful. Ten files means ten chances to forget staple or duplex. One file is one chance.",
      "If a deck is already 80MB of photos, merging will not help toner or time. Flatten or compress that deck in a dedicated workflow first.",
    ],
  },
  {
    type: "landing",
    slug: "split-pdf-extract-pages",
    cluster: "pdf",
    keyword: "split PDF extract pages",
    h1: "Extract Pages from a PDF",
    title: "Extract PDF Pages Online",
    description:
      "Pull a page range or every page from a PDF. Useful when a portal wants only the ID page, not the whole scan. Runs locally.",
    hubSlug: "pdf-tools",
    toolSlug: "split-pdf",
    categorySlug: "documents",
    intent: "Send only the pages a form asked for instead of a 30-page household scan.",
    audience: "People with a multi-page scan who must upload one certificate or ID page.",
    whatItDoes:
      "Scanners spit out entire packets. Portals want page 2. This page uses split/extract so you do not photograph a screen or print-and-rescan. Range mode is the usual path; per-page ZIP is for when each page goes to a different field.",
    whyThisVersion:
      "Merge landings build packets. This landing disassembles them. Same PDF family, opposite job.",
    whoShouldUse:
      "Anyone whose “upload passport” field rejected a 15-page immigration PDF.",
    whenToUse: [
      "The form wants pages 1–2 only.",
      "Each annexure must be a separate file.",
      "You need page 7 as its own PDF for email.",
    ],
    commonMistakes: [
      "Extracting the wrong 1-based page because you counted a cover you forgot.",
      "Expecting OCR. Split does not make a scan searchable.",
    ],
    tips: [
      "Open the PDF and note printed page numbers vs PDF page index. They can differ.",
      "If you need many single pages, use each-page mode and unzip.",
    ],
    features: [
      { title: "Range extract", body: "From–to pages as one PDF." },
      { title: "All pages ZIP", body: "One file per page when forms want splits." },
      { title: "Local", body: "ID scans stay on the device." },
    ],
    benefits: [
      { title: "Smaller uploads", body: "One ID page instead of the household file." },
      { title: "Fewer privacy leaks", body: "Do not send pages the portal did not ask for." },
    ],
    steps: [
      { name: "Upload the PDF", text: "The full scan." },
      { name: "Choose range or each page", text: "Range for one extract; each page for many fields." },
      { name: "Download", text: "Check you have the right page." },
      { name: "Upload to the form", text: "Keep the original packet." },
    ],
    useCases: [
      { title: "KYC", body: "Passport data page only." },
      { title: "Finance", body: "One statement page with the needed line items." },
    ],
    examples: [
      {
        title: "Pages 3–4 of a 12-page scan",
        body: "Range mode from 3 to 4, download, open, confirm the address page is there.",
      },
    ],
    faqs: [
      {
        question: "Can I extract non-contiguous pages (1, 5, 9)?",
        answer: "This tool does a single range or every page. For a custom set, extract twice or use another editor.",
      },
      {
        question: "Does this unlock a password PDF?",
        answer: "Encrypted files may fail. Unlock first if you have the password.",
      },
    ],
    relatedSlugs: [
      "merge-pdf-for-application",
      "merge-pdf-for-print",
    ],
    body: [
      "Over-sharing a scan is how extra IDs leak into a vendor’s blob store. Extract is a privacy tool as much as a convenience tool.",
      "Page indexes are 1-based here. If your viewer shows a cover as page i and the PDF index disagrees, trust the viewer’s page box after extract.",
    ],
  },
];

import type { PseoLanding } from "@/lib/pseo/types";

export const IMAGE_LANDINGS: PseoLanding[] = [
  {
    type: "landing",
    slug: "compress-image-to-20kb",
    cluster: "image",
    keyword: "compress image to 20KB",
    h1: "Compress Image to 20KB",
    title: "Compress Image to 20KB Online",
    description:
      "Shrink a photo to about 20KB for government forms and portals. Runs in your browser — the file is not uploaded.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Meet a hard 20KB upload cap on forms that reject larger JPEGs.",
    audience: "People filing government, exam, or recruitment forms that still ask for 20KB photos.",
    whatItDoes:
      "This page is for the 20KB cap, not generic “make it smaller.” Many Indian and APAC portals still reject profile photos above 20KB even when the form looks modern. You compress here, check the output size, and download a JPG small enough to attach.",
    whyThisVersion:
      "A generic compressor often stops at 200KB or 80% quality — still too big for these forms. Targeting 20KB usually means JPEG, a modest pixel size (around 200–400px on the long edge), and quality in the 40–70% range. This landing exists so you do not have to guess those settings on a generic tool page.",
    whoShouldUse:
      "Applicants uploading a passport-style photo to SSC, banking KYC, university admissions, or older HR portals that still list “maximum 20KB.”",
    whenToUse: [
      "The form error says the photo exceeds 20KB or 20480 bytes.",
      "You already cropped a headshot and only the file size is failing.",
      "Email is not involved — you need the smallest acceptable still image, not print quality.",
    ],
    commonMistakes: [
      "Keeping a 4000px phone photo and only lowering JPEG quality. Dimensions dominate file size at 20KB.",
      "Exporting PNG. PNG rarely hits 20KB unless the image is tiny or nearly flat color.",
      "Uploading HEIC from an iPhone. Convert to JPG first, then compress.",
    ],
    tips: [
      "Start with max width around 320px, JPEG, quality ~60%. If you are still over 20KB, drop quality or width, not both at once so you can tell what worked.",
      "Face should stay recognizable. If the portal also requires a min width (for example 200px), do not go below that even if size is still high — crop tighter instead.",
    ],
    features: [
      {
        title: "Runs on your device",
        body: "The compressor uses the canvas in your browser. The photo is not sent to ToolBay servers.",
      },
      {
        title: "JPG, WebP, or PNG out",
        body: "For 20KB targets, JPG is usually the only format that works. WebP can win on some photos; PNG almost never does.",
      },
      {
        title: "Resize and quality together",
        body: "You can cap width and quality in one pass instead of bouncing between two apps.",
      },
    ],
    benefits: [
      {
        title: "Stop failing the same form",
        body: "Once you know a 320px JPEG at medium quality lands near 20KB, you can reuse that recipe for every portal with the same cap.",
      },
      {
        title: "Keep the original",
        body: "Work on a copy. Your camera roll stays untouched.",
      },
    ],
    steps: [
      { name: "Upload the photo", text: "Drop a JPG, PNG, or WebP. iPhone HEIC should be converted first." },
      { name: "Cap the long edge", text: "Set max width around 300–400px so pixel count is in the right range for 20KB." },
      { name: "Use JPEG and lower quality", text: "Switch to JPG and move quality down until the result is at or under 20KB." },
      { name: "Download and attach", text: "Save the JPG and upload it to the form. Keep the original in case the portal also checks dimensions." },
    ],
    useCases: [
      {
        title: "Exam and recruitment photos",
        body: "Portals for government exams often inherited 20KB limits from older ASP.NET uploaders. The photo must still show a clear face.",
      },
      {
        title: "KYC and bank forms",
        body: "Some KYC widgets compress on the server and still reject the source file if it is over 20KB before that step.",
      },
    ],
    examples: [
      {
        title: "Phone selfie to form photo",
        body: "A 3MB iPhone still is far too large. Convert HEIC → JPG if needed, set width 320, JPEG quality ~55, confirm the download is ≤20KB.",
      },
    ],
    faqs: [
      {
        question: "Can every photo reach exactly 20KB?",
        answer:
          "No. Busy photos (trees, patterned shirts) need more bytes. Crop to the face, reduce width, then quality. If you still cannot hit 20KB, the source may be too detailed for that cap at a usable resolution.",
      },
      {
        question: "Is 20KB the same as 20KB on disk after download?",
        answer:
          "Check the downloaded file in Finder or Explorer. Browser “saved percent” is a guide; the form reads the file you attach.",
      },
    ],
    relatedSlugs: [
      "compress-image-to-50kb",
      "compress-image-to-100kb",
      "passport-photo-compressor",
      "resize-image-for-government-form",
    ],
    body: [
      "Twenty kilobytes is a 1990s-era cap that never left a surprising number of production forms. It is not a photography standard. It is a server setting. Treating it like “make my photo a bit smaller” wastes time because a slightly compressed 12-megapixel JPEG is still hundreds of kilobytes.",
      "Think in pixels first, quality second. Halving width and height cuts pixel count by four. That is why a 320px-wide headshot can sit near 20KB while a 2000px shot at 10% JPEG quality still looks blocky and stays large. If a portal also demands a minimum size (200×200 is common), crop so the face fills the frame instead of letterboxing a tiny head on a huge canvas.",
    ],
  },
  {
    type: "landing",
    slug: "compress-image-to-50kb",
    cluster: "image",
    keyword: "compress image to 50KB",
    h1: "Compress Image to 50KB",
    title: "Compress Image to 50KB Online",
    description:
      "Reduce images to around 50KB for email signatures, tickets, and portals that cap uploads at 50KB. Private, in-browser compression.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Hit a 50KB limit used by email systems and mid-size web forms.",
    audience: "Support teams, students, and anyone attaching a photo to mail or a 50KB widget.",
    whatItDoes:
      "Fifty kilobytes is the next common cap after 20KB — enough for a recognizable face or a small product crop, not for a full-resolution screenshot. This page is tuned for that band: typically 600–1000px on the long edge and moderate JPEG quality.",
    whyThisVersion:
      "Email clients and helpdesks still throttle inline images. A 50KB JPEG is much more likely to survive Outlook, Gmail clip, and ticketing tools than a 2MB PNG screenshot. This is not the 20KB government recipe and not the 1MB “web hero” recipe.",
    whoShouldUse:
      "People pasting a headshot into an email signature, attaching ID to a ticket, or filling a form that says “max 50KB.”",
    whenToUse: [
      "An email signature image makes messages huge or gets stripped.",
      "A support form rejects files over 50KB but accepts JPG.",
      "You need a small thumbnail, not a printable portrait.",
    ],
    commonMistakes: [
      "Sending a PNG screenshot of a UI. Flatten to JPEG or crop to the relevant panel first.",
      "Leaving EXIF and a 4K canvas. Resize before you obsess over the quality slider.",
    ],
    tips: [
      "For signatures, 120–160px height is usually enough. File size follows.",
      "If the result is far under 50KB and looks soft, raise quality or width slightly — you have budget.",
    ],
    features: [
      {
        title: "Preview before you send",
        body: "See the compressed image and its size before it hits someone’s inbox.",
      },
      {
        title: "No account",
        body: "Compress a one-off attachment without creating a cloud folder.",
      },
      {
        title: "Width and quality controls",
        body: "Match the 50KB cap without installing an editor.",
      },
    ],
    benefits: [
      {
        title: "Mailboxes stay small",
        body: "Signatures and thread attachments stop blowing through corporate quotas.",
      },
      {
        title: "Forms accept the file",
        body: "50KB is a documented limit on many older PHP and .NET uploaders.",
      },
    ],
    steps: [
      { name: "Add the image", text: "Upload the photo or screenshot you need to send." },
      { name: "Set a sensible width", text: "For email, try max width 800px. For a signature, go much smaller." },
      { name: "Export JPEG", text: "Use JPG and adjust quality until the output is at or under 50KB." },
      { name: "Attach the download", text: "Use the new file, not the original, in mail or the form." },
    ],
    useCases: [
      {
        title: "Email signatures",
        body: "A company logo or headshot in the footer should not be a 2MB retina asset.",
      },
      {
        title: "Helpdesk attachments",
        body: "Zendesk-style forms often cap images well below what a phone produces.",
      },
    ],
    examples: [
      {
        title: "Screenshot of an error",
        body: "Crop to the dialog, JPEG quality ~70, max width 900. That is usually enough to read text and stay near 50KB.",
      },
    ],
    faqs: [
      {
        question: "Why not always use 20KB settings?",
        answer:
          "20KB settings smash detail you can keep at 50KB. Use the looser cap so text in screenshots stays readable.",
      },
      {
        question: "Does this email the file for me?",
        answer: "No. It only creates a smaller file. You attach it in your own mail client.",
      },
    ],
    relatedSlugs: [
      "compress-image-to-20kb",
      "compress-image-to-100kb",
      "compress-image-for-email",
      "compress-image-under-1mb",
    ],
    body: [
      "Fifty kilobytes sits in a practical middle: small enough for picky uploaders, large enough that a cropped screenshot can still be read. If you apply 20KB tactics here, you throw away that extra detail for no reason.",
      "Corporate mail is the usual villain. Transport agents rewrite HTML, downscale images, and still count the MIME part against size limits. Starting at 50KB gives the pipeline headroom so the recipient actually sees the picture.",
    ],
  },
  {
    type: "landing",
    slug: "compress-image-to-100kb",
    cluster: "image",
    keyword: "compress image to 100KB",
    h1: "Compress Image to 100KB",
    title: "Compress Image to 100KB Online",
    description:
      "Compress images to about 100KB for job portals, CMS uploads, and app avatars. Browser-based, no sign-up.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Meet 100KB caps used by ATS software, blogs, and profile avatars.",
    audience: "Job applicants, marketers, and developers uploading assets to a 100KB field.",
    whatItDoes:
      "One hundred kilobytes is a common CMS and ATS limit. It is enough for a sharp web headshot or a blog inline image if you resize first. This page is not for print PDFs or 20KB government photos.",
    whyThisVersion:
      "WordPress, Greenhouse, and similar products often document 100KB as the max for featured images or profile pictures. Generic “compress” pages do not mention that workflow or the usual 1200px-wide blog recipe.",
    whoShouldUse:
      "Applicants uploading a CV photo, authors adding a post image, or anyone hitting a 100KB validation error.",
    whenToUse: [
      "An ATS rejects the profile photo as too large.",
      "A CMS says “featured image must be under 100KB.”",
      "You want a web-ready image without opening Photoshop.",
    ],
    commonMistakes: [
      "Uploading a 4K PNG screenshot of a design. Convert and resize; 100KB cannot hold 4K PNG.",
      "Ignoring the CMS max dimension. Some themes also require a minimum width.",
    ],
    tips: [
      "Blog inlines: max width 1200, JPEG 70–80%. Drop quality only if you are still over 100KB.",
      "Avatars: 400–800px is plenty. Extra pixels only cost bytes.",
    ],
    features: [
      { title: "In-browser", body: "No CDN upload of your résumé photo." },
      { title: "Resize modes", body: "Max width, max height, or exact pixels if the ATS is picky." },
      { title: "Format choice", body: "JPEG for photos, PNG only if you truly need transparency." },
    ],
    benefits: [
      { title: "Pages load faster", body: "A 100KB hero is kinder to mobile than a 3MB phone dump." },
      { title: "Fewer upload errors", body: "Match the documented cap instead of guessing." },
    ],
    steps: [
      { name: "Upload", text: "Add the image the portal rejected." },
      { name: "Match layout", text: "Set max width to what the site actually displays (often 400–1200px)." },
      { name: "Compress", text: "JPEG quality until the file is ≤100KB." },
      { name: "Replace the upload", text: "Download and try the form again." },
    ],
    useCases: [
      {
        title: "Applicant tracking systems",
        body: "Profile photos are stored as small blobs. 100KB is a frequent ceiling.",
      },
      {
        title: "CMS featured images",
        body: "Editors get a validation error instead of an automatic resize.",
      },
    ],
    examples: [
      {
        title: "LinkedIn-style headshot for an ATS",
        body: "Start from a well-lit face crop, max width 800, JPEG ~75%. Confirm size before submitting the application.",
      },
    ],
    faqs: [
      {
        question: "Will 100KB look bad on a retina screen?",
        answer:
          "For a 200px CSS avatar, 800px source is already 4×. You do not need a 3MB original.",
      },
      {
        question: "WebP or JPEG?",
        answer:
          "If the portal accepts WebP, it can look better at 100KB. Many ATS still want JPEG only.",
      },
    ],
    relatedSlugs: [
      "compress-image-to-50kb",
      "compress-image-under-1mb",
      "resize-image-for-linkedin",
      "compress-image-for-email",
    ],
    body: [
      "One hundred kilobytes is a product manager’s round number, not a visual standard. It usually means “we did not want to pay for image processing, so we reject large files.” Your job is to look acceptable at the size the page actually paints.",
      "If the layout shows a 160px circle, feeding it a 100KB 2000px image is waste. Resize to ~2–3× the display size, then use the quality slider only as a fine adjustment.",
    ],
  },
  {
    type: "landing",
    slug: "compress-image-under-1mb",
    cluster: "image",
    keyword: "compress image under 1MB",
    h1: "Compress Image Under 1MB",
    title: "Compress Image Under 1MB Online",
    description:
      "Get photos under 1MB for hosting, LMS uploads, and chat apps that block larger files. Free in-browser compressor.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Stay under a 1MB ceiling without destroying a photo meant for screens.",
    audience: "Students, sellers, and anyone hitting a 1MB upload wall on a course or marketplace.",
    whatItDoes:
      "A 1MB cap is generous compared with 20–100KB forms, but phone photos still miss it. This page is about keeping a full-screen-quality image under one megabyte — typically 1600–2400px JPEG at high quality.",
    whyThisVersion:
      "LMS platforms, classifieds, and some WhatsApp-to-web flows still advertise 1MB. You should not use the 20KB government recipe here; you would throw away quality you are allowed to keep.",
    whoShouldUse:
      "People uploading course assignments, marketplace listings, or gallery images with a 1MB documented limit.",
    whenToUse: [
      "Moodle, Canvas, or a similar LMS rejects the file.",
      "A classifieds form says maximum 1MB per image.",
      "The photo is for screens, not a 300dpi print.",
    ],
    commonMistakes: [
      "Exporting PNG from a screenshot of a photo. JPEG is the right container.",
      "Shrinking to 400px because you used a 20KB tutorial. That is the wrong cap.",
    ],
    tips: [
      "Try max width 1920 and JPEG 80% first. Only drop quality if you are still over 1MB.",
      "Burst and Live Photos are huge. Pick a single still frame.",
    ],
    features: [
      { title: "High-quality default", body: "You can start near 80% JPEG quality because 1MB allows it." },
      { title: "Local processing", body: "Listing photos never hit our servers." },
      { title: "Instant download", body: "Replace the rejected upload and resubmit." },
    ],
    benefits: [
      { title: "Looks like a real photo", body: "You are not forced into a 320px stamp." },
      { title: "Fits common LMS caps", body: "1MB is a default in many education products." },
    ],
    steps: [
      { name: "Upload", text: "Use the original from the camera roll if you can." },
      { name: "Set web width", text: "1920px on the long edge is a solid default for 1MB." },
      { name: "Keep quality high", text: "Start at JPEG 80–85% and lower only if needed." },
      { name: "Confirm size", text: "Download and check that the file is under 1MB before submitting." },
    ],
    useCases: [
      { title: "Coursework photos", body: "Lab photos and handwritten notes must be readable and still under 1MB." },
      { title: "Marketplace listings", body: "Buyers need detail; the platform still wants small blobs." },
    ],
    examples: [
      {
        title: "12MP phone photo",
        body: "Max width 1920, JPEG 82%. That combination is under 1MB for most outdoor shots.",
      },
    ],
    faqs: [
      {
        question: "Is under 1MB always lossless?",
        answer: "No. JPEG is lossy. At this budget you can keep artifacts hard to see on a phone screen.",
      },
      {
        question: "What if I need print?",
        answer: "Do not use this cap as a print workflow. Keep the original and make a separate web copy.",
      },
    ],
    relatedSlugs: [
      "compress-image-to-100kb",
      "compress-image-for-whatsapp",
      "compress-image-for-email",
      "resize-image-for-instagram",
    ],
    body: [
      "One megabyte is where “web photo” and “phone original” meet. You should feel almost no pain if you resize to HD-ish dimensions first. People who jump straight to quality 20% are following advice meant for 20KB forms.",
      "If you are still over 1MB at 1920px and 70% JPEG, the shot may be extremely noisy (night ISO). Noise compresses poorly. A light denoise in another app, or a tighter crop, helps more than another quality click.",
    ],
  },
  {
    type: "landing",
    slug: "compress-image-for-email",
    cluster: "image",
    keyword: "compress image for email",
    h1: "Compress Image for Email",
    title: "Compress Image for Email Online",
    description:
      "Shrink photos and screenshots so email stays fast and under attachment limits. Free, private, in your browser.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Make images safe to send by email without bouncing or bloating the thread.",
    audience: "Anyone attaching photos or screenshots to Gmail, Outlook, or a corporate mailbox.",
    whatItDoes:
      "Email is not a photo host. Each attached image is base64-wrapped in MIME, which adds overhead. This page focuses on that path: readable screenshots and photos that will not trip 10MB, 20MB, or 25MB message caps when combined with the rest of the thread.",
    whyThisVersion:
      "Size-target pages (20KB, 50KB) solve form validators. Email is about the whole message. You might attach three screenshots. This landing talks about per-image budgets so the message still sends.",
    whoShouldUse:
      "People sending product photos, error screenshots, or event pictures through mail instead of a drive link.",
    whenToUse: [
      "Outlook warns the message is too large.",
      "Gmail hangs on send with several photos.",
      "A client asks for pictures but their mail gateway is strict.",
    ],
    commonMistakes: [
      "Attaching original HEIC files. Many Windows users cannot open them, and they are large.",
      "Sending five uncropped 12MP photos. Crop first, then compress.",
    ],
    tips: [
      "Budget ~200–400KB per photo if you send several. Use the 50KB page only for tiny signatures.",
      "Prefer a shared folder for full-resolution sets. Email the compressed previews.",
    ],
    features: [
      { title: "JPEG for photos", body: "Photos belong in JPEG for mail. Keep PNG for UI with text if needed." },
      { title: "Resize for screens", body: "1920px is enough for almost any email preview." },
      { title: "Local files", body: "Confidential screenshots never upload to ToolBay." },
    ],
    benefits: [
      { title: "Messages actually send", body: "Stay under gateway limits." },
      { title: "Recipients can open them", body: "JPEG opens everywhere; HEIC does not." },
    ],
    steps: [
      { name: "Convert HEIC if needed", text: "Use HEIC to JPG first for iPhone photos." },
      { name: "Resize for a screen", text: "Max width 1600–1920px is plenty in mail." },
      { name: "Compress", text: "JPEG 70–80% is a good email default." },
      { name: "Attach the downloads", text: "Send the new files, not the camera originals." },
    ],
    useCases: [
      { title: "Client proofing", body: "Send a preview set by mail; keep RAW or HEIC in cloud storage." },
      { title: "IT tickets", body: "One cropped JPEG of the error beats a 8MB PNG of the entire desktop." },
    ],
    examples: [
      {
        title: "Three event photos",
        body: "Each at 1600px JPEG 75% is often ~200–400KB. Three attachments stay well under common 20MB caps.",
      },
    ],
    faqs: [
      {
        question: "Does compressing here also compress the email on the server?",
        answer: "No. You create smaller files. Your mail provider still wraps them in MIME.",
      },
      {
        question: "Inline image or attachment?",
        answer: "Both count toward size. Compress either way.",
      },
    ],
    relatedSlugs: [
      "compress-image-to-50kb",
      "compress-image-under-1mb",
      "heic-to-jpg-converter",
      "compress-image-for-whatsapp",
    ],
    body: [
      "Mail gateways still behave like 2005: they scan MIME, rewrite HTML, and drop the hammer at a fixed megabyte cap. They do not care that your phone thinks 4MB is a normal photo.",
      "If the recipient only needs to recognize a face or read an error string, you are done at HD JPEG. If they need to print a poster, email is the wrong channel — send a link.",
    ],
  },
  {
    type: "landing",
    slug: "compress-image-for-whatsapp",
    cluster: "image",
    keyword: "compress image for WhatsApp",
    h1: "Compress Image for WhatsApp",
    title: "Compress Image for WhatsApp Online",
    description:
      "Prepare photos for WhatsApp so they send quickly and stay readable. Compress locally in your browser.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Pre-compress photos so WhatsApp’s own squeeze is less ugly — or send as document when you need detail.",
    audience: "People sharing product shots, IDs, or notes in WhatsApp chats.",
    whatItDoes:
      "WhatsApp recompresses images you send as photos. Pre-sizing to something like 1600px JPEG gives you control before that second compression. If you need a document scan to stay sharp, WhatsApp’s “document” send is a different path — this page explains both.",
    whyThisVersion:
      "This is not a 20KB form tool. WhatsApp can take larger files. The pain is double compression, blurry text on notes, and data caps on mobile networks.",
    whoShouldUse:
      "Sellers sending catalog photos, families sending school notes, and anyone whose WhatsApp photos come out mushy.",
    whenToUse: [
      "Text on a whiteboard photo becomes unreadable after send.",
      "You are on a slow mobile connection and the upload spins.",
      "You want a consistent catalog size before the app compresses again.",
    ],
    commonMistakes: [
      "Sending a 12MP photo as a “photo” and expecting print sharpness. Use Document for scans.",
      "Pre-compressing to 20KB. WhatsApp will still recompress; you only added blockiness.",
    ],
    tips: [
      "For chat photos, 1280–1600px JPEG ~75% is a sensible pre-size.",
      "For homework and IDs, send as Document so WhatsApp does not run its photo pipeline.",
    ],
    features: [
      { title: "You choose dimensions", body: "Do not let a 12MP original be the only input to WhatsApp." },
      { title: "Works offline-ish", body: "Compression is local; you only need the network to send the chat." },
      { title: "JPG output", body: "Matches what most chat apps expect." },
    ],
    benefits: [
      { title: "Faster sends", body: "Smaller originals upload quicker on LTE." },
      { title: "Less mush", body: "Starting from a sane size beats starting from a huge noisy file." },
    ],
    steps: [
      { name: "Upload", text: "Pick the photo from your camera roll." },
      { name: "Cap width", text: "1600px is a good WhatsApp-oriented default." },
      { name: "Export JPEG", text: "Quality around 75%." },
      { name: "Send in WhatsApp", text: "Use Document send if the image is a scan with small type." },
    ],
    useCases: [
      { title: "Catalog shares", body: "Keep product shots consistent before the app compresses them." },
      { title: "School notes", body: "Pre-sharpen by cropping; send as document when type is small." },
    ],
    examples: [
      {
        title: "Product on a table",
        body: "Crop clutter, 1600px JPEG 75%, send as photo. For a label with tiny ingredients, send as document instead.",
      },
    ],
    faqs: [
      {
        question: "Will WhatsApp still compress my file?",
        answer:
          "Yes if you send as a photo. Pre-sizing still helps. Send as document to skip the photo encoder.",
      },
      {
        question: "Does ToolBay send to WhatsApp for me?",
        answer: "No. You download, then attach in the app.",
      },
    ],
    relatedSlugs: [
      "compress-image-under-1mb",
      "compress-image-for-email",
      "resize-image-for-instagram",
      "heic-to-jpg-converter",
    ],
    body: [
      "WhatsApp’s photo encoder is built for faces and landscapes, not for 8-point font on a worksheet. If your use case is a document, stop fighting the photo path.",
      "If your use case is a snapshot, give the encoder a reasonably sized JPEG instead of a 10MB night-mode stack. You cannot turn off their compressor, but you can stop feeding it a terrible source.",
    ],
  },
  {
    type: "landing",
    slug: "passport-photo-compressor",
    cluster: "image",
    keyword: "passport photo compressor",
    h1: "Passport Photo Compressor",
    title: "Passport Photo Compressor Online",
    description:
      "Resize and compress a passport-style photo for digital uploads. Check the portal’s pixel and KB rules — processing stays in your browser.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Prepare a compliant-looking passport or visa photo for a digital form, not print at a booth.",
    audience: "Travelers and applicants uploading photos to visa, passport, or ID portals.",
    whatItDoes:
      "Digital passport uploads mix two constraints: aspect (often 35×45mm or 2×2 inch) and file size. This page uses the image compressor with exact or max dimensions so you can match a portal’s pixel box, then lower JPEG quality to the KB cap. It does not print on photo paper or guarantee a government will accept the crop.",
    whyThisVersion:
      "A 20KB compressor ignores aspect ratio. A generic resize tool ignores KB caps. Passport portals usually need both. This landing exists to walk that dual constraint.",
    whoShouldUse:
      "People who already have a studio or booth photo as a digital file and need to fit an online form.",
    whenToUse: [
      "The site asks for 35×45mm equivalent in pixels (for example 413×531 at 300dpi — check the form).",
      "The site also sets a max KB.",
      "You are not trying to photograph yourself in-browser.",
    ],
    commonMistakes: [
      "Stretching a landscape selfie to 2×2. Use crop, not distort.",
      "Trusting a random pixel size from a blog instead of the embassy page.",
    ],
    tips: [
      "Read the official pixel size and KB cap first. Then use exact width/height here.",
      "Keep the original studio file. Make a copy for each country — rules differ.",
    ],
    features: [
      { title: "Exact size mode", body: "Set width and height if the portal specifies pixels." },
      { title: "JPEG quality", body: "Hit the KB cap after dimensions are right." },
      { title: "Private", body: "ID photos stay on your machine." },
    ],
    benefits: [
      { title: "Fewer rejected uploads", body: "Match both geometry and weight when the form lists both." },
      { title: "Reusable recipe", body: "Once you know Country A wants 600×600 under 300KB, save those numbers." },
    ],
    steps: [
      { name: "Read the official spec", text: "Pixels, KB, background color, and face height if listed." },
      { name: "Crop elsewhere if needed", text: "This tool resizes; it is not a full passport cropper." },
      { name: "Set exact dimensions", text: "Use exact size mode with the portal’s pixel values." },
      { name: "Compress to the KB cap", text: "JPEG quality down until the file is accepted." },
    ],
    useCases: [
      { title: "Visa DS-160 style uploads", body: "Square-ish digital photos with a tight KB limit." },
      { title: "Passport Seva style portals", body: "Often combine a small KB cap with a defined aspect." },
    ],
    examples: [
      {
        title: "2×2 inch at 300dpi",
        body: "That is 600×600 pixels. Set exact 600×600, JPEG, then lower quality if the KB cap is small.",
      },
    ],
    faqs: [
      {
        question: "Will this be accepted at a passport office?",
        answer:
          "In-person booths have lighting and paper rules this page cannot satisfy. Use it for digital uploads when you already have a proper photo file.",
      },
      {
        question: "Do you change the background to white?",
        answer: "No. Background replacement is a different tool. Start with a correct studio photo.",
      },
    ],
    relatedSlugs: [
      "resize-image-for-government-form",
      "compress-image-to-20kb",
      "signature-image-compressor",
      "resize-image-for-linkedin",
    ],
    body: [
      "Governments publish photo rules as if everyone still walks into a booth. Digital portals bolted a file input onto those rules and added a KB number from an old server. You have to satisfy both, which is why a single “compress” slider fails.",
      "Always prefer the embassy or passport authority page over a YouTube thumbnail size. If two sources disagree, the official form wins. This compressor cannot invent compliance; it only helps you hit the numbers they printed.",
    ],
  },
  {
    type: "landing",
    slug: "signature-image-compressor",
    cluster: "image",
    keyword: "signature image compressor",
    h1: "Signature Image Compressor",
    title: "Signature Image Compressor Online",
    description:
      "Shrink a scanned signature for bank and government PDFs. Keep ink readable. Processing stays in your browser.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Fit a signature scan into a small KB box without turning the ink into noise.",
    audience: "People uploading signatures to banks, PF, tax, and HR systems.",
    whatItDoes:
      "Signature uploads are usually tiny (10–50KB) and almost always JPEG or PNG on a white background. Phone photos of paper are the wrong source — too much wood grain and shadow. This page is for flattening a reasonably scanned or cropped signature so a form accepts it.",
    whyThisVersion:
      "Photo compressors optimize faces and skies. Signatures are sparse black strokes. You often want PNG for sharp edges, or a small JPEG with little chroma. The 20KB headshot recipe will wreck a signature.",
    whoShouldUse:
      "Anyone a bank asked for “signature image max 20KB” or similar.",
    whenToUse: [
      "A PDF form has a signature field that only takes a small image.",
      "The scan is 2MB and the portal wants 20–50KB.",
      "The ink looks fine but the file includes the whole A4 page.",
    ],
    commonMistakes: [
      "Photographing the signature at an angle. Crop tightly and shoot straight-on, or scan.",
      "Heavy JPEG on thin pen strokes. Try PNG if the portal allows it, or higher JPEG quality with a tighter crop.",
    ],
    tips: [
      "Crop until you only see ink and white paper.",
      "If the portal allows PNG, use it for signatures. If it requires JPG, keep quality higher than you would for a 20KB face photo and crop harder instead.",
    ],
    features: [
      { title: "Tight resize", body: "Signatures rarely need more than a few hundred pixels wide." },
      { title: "Format toggle", body: "PNG for ink, JPEG if the form forbids PNG." },
      { title: "Local only", body: "Your signature never uploads to us." },
    ],
    benefits: [
      { title: "Forms accept the file", body: "Meet the KB cap after cropping, not before." },
      { title: "Ink stays ink", body: "Avoid the muddy look of over-compressed JPEG on thin lines." },
    ],
    steps: [
      { name: "Crop first", text: "Use any editor to cut away the rest of the page." },
      { name: "Upload the crop", text: "Drop the tight signature image here." },
      { name: "Keep it small in pixels", text: "200–400px wide is usually enough in a PDF field." },
      { name: "Export", text: "PNG if allowed; otherwise JPEG at a quality that still looks like pen." },
    ],
    useCases: [
      { title: "Bank mandate scans", body: "Tiny JPEG slots next to account numbers." },
      { title: "HR onboarding", body: "E-sign packets that still want a drawn signature image." },
    ],
    examples: [
      {
        title: "Phone photo of a sign on paper",
        body: "Retake on white paper, crop to ink, 300px wide, PNG. Check KB. If still huge, the crop is not tight enough.",
      },
    ],
    faqs: [
      {
        question: "Can you extract a signature from a PDF?",
        answer: "Not on this page. Export or screenshot the signature, crop, then compress.",
      },
      {
        question: "Is a photographed signature legally ideal?",
        answer: "Portals still ask for it. A scan on white paper is cleaner than a wooden-table photo.",
      },
    ],
    relatedSlugs: [
      "passport-photo-compressor",
      "compress-image-to-20kb",
      "resize-image-for-government-form",
      "compress-image-to-50kb",
    ],
    body: [
      "Signature fields are leftover from paper. The server wants a postage-stamp file. Your phone wants a 12MP texture shot of a desk. Those goals conflict until you crop.",
      "Treat ink like line art. Chroma and film grain are the enemy. If JPEG artifacts ring around the pen, you went too far on quality. Crop smaller before you crush quality again.",
    ],
  },
  {
    type: "landing",
    slug: "resize-image-for-linkedin",
    cluster: "image",
    keyword: "resize image for LinkedIn",
    h1: "Resize Image for LinkedIn",
    title: "Resize Image for LinkedIn Online",
    description:
      "Resize a profile or banner photo for LinkedIn’s display sizes. Compress in the browser — nothing is uploaded.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Match LinkedIn profile and cover display sizes so the site does not crop your face off.",
    audience: "Professionals updating a LinkedIn photo or banner.",
    whatItDoes:
      "LinkedIn displays a round profile photo and a wide banner. Feeding it a random phone photo lets their cropper decide what to keep. This page is about resizing to the dimensions LinkedIn actually shows, then compressing so the upload is snappy.",
    whyThisVersion:
      "This is a crop-and-display problem, not a 20KB government cap. You want enough pixels for a sharp avatar on a retina laptop, not the smallest possible file.",
    whoShouldUse:
      "Anyone whose LinkedIn photo looks zoomed-in, off-center, or fuzzy after upload.",
    whenToUse: [
      "The banner cuts off a logo or text.",
      "The profile circle crops out half your head.",
      "The upload looks softer than the original file.",
    ],
    commonMistakes: [
      "Using a 200px avatar. LinkedIn will upscale and it looks soft.",
      "Putting important banner text in the far corners — UI chrome covers them on some devices.",
    ],
    tips: [
      "Profile photos look best when the face is centered in a square. Use exact size around 400–800px.",
      "Banners are wide. Keep the subject near the center third.",
    ],
    features: [
      { title: "Exact or max width", body: "Square avatars and wide banners need different modes." },
      { title: "JPEG/PNG", body: "Photos as JPEG; logos with text may prefer PNG." },
      { title: "Local", body: "Your headshot is not stored on our servers." },
    ],
    benefits: [
      { title: "You control the crop", body: "Resize a pre-cropped square instead of hoping LinkedIn guesses." },
      { title: "Sharp on laptop screens", body: "Upload 2× the CSS size, not a tiny thumbnail." },
    ],
    steps: [
      { name: "Crop to square or banner off-site if needed", text: "Center the face for an avatar." },
      { name: "Resize here", text: "Avatar: ~800×800. Banner: width 1584 if you follow LinkedIn’s current recommended width — confirm in their help center." },
      { name: "Compress lightly", text: "You have KB budget; keep quality high." },
      { name: "Upload to LinkedIn", text: "Replace the photo in settings." },
    ],
    useCases: [
      { title: "New role headshot", body: "Studio photo → square → 800px JPEG." },
      { title: "Personal brand banner", body: "Wide graphic with the subject in the safe center." },
    ],
    examples: [
      {
        title: "Soft avatar after upload",
        body: "The source was 180px. Recreate at 800×800 JPEG 85% and replace.",
      },
    ],
    faqs: [
      {
        question: "Do you log into LinkedIn for me?",
        answer: "No. This only prepares a file.",
      },
      {
        question: "Will LinkedIn change recommended sizes?",
        answer:
          "Yes. Check LinkedIn’s own help article if a layout looks wrong. The compressor still does the resize you type in.",
      },
    ],
    relatedSlugs: [
      "resize-image-for-instagram",
      "compress-image-to-100kb",
      "passport-photo-compressor",
      "resize-image-for-government-form",
    ],
    body: [
      "Social networks crop aggressively because they have to fill a circle and a banner from whatever you upload. If you upload a 3:2 vacation photo as an avatar, the algorithm picks a crop. Doing the square yourself is the whole job.",
      "LinkedIn is viewed on large monitors. A 200px source looks cheap. Overshoot pixels slightly, keep JPEG quality high, and let their CDN do the last step.",
    ],
  },
  {
    type: "landing",
    slug: "resize-image-for-instagram",
    cluster: "image",
    keyword: "resize image for Instagram",
    h1: "Resize Image for Instagram",
    title: "Resize Image for Instagram Online",
    description:
      "Resize photos for Instagram feed, portrait, or square posts. Compress locally before you post.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Start from the aspect Instagram will publish so their extra compression is less of a surprise.",
    audience: "Creators and businesses posting stills to Instagram.",
    whatItDoes:
      "Instagram still prefers certain aspect ratios (square, 4:5 portrait, 1.91:1 landscape). This page helps you resize a already-cropped image to a sensible pixel width (often 1080px on the short or long edge, depending on layout) and export a reasonably sized JPEG.",
    whyThisVersion:
      "WhatsApp and email care about KB caps. Instagram cares about aspect and a 1080px pipeline. Using a 20KB government preset here will make the post look like 2009.",
    whoShouldUse:
      "People who crop in another app and want a clean 1080-wide JPEG without a desktop editor.",
    whenToUse: [
      "Stories or feed posts look softer than Lightroom.",
      "You export huge TIFFs and the phone struggles to upload.",
      "You want a consistent 1080px catalog.",
    ],
    commonMistakes: [
      "Uploading 6000px JPEGs. Instagram downsamples anyway and may add artifacts.",
      "Letterboxing with huge black bars instead of cropping to 4:5.",
    ],
    tips: [
      "Feed portrait is often 1080×1350. Square is 1080×1080. Confirm current IG guidelines if you need pixel-perfect ads.",
      "Export JPEG around 80–90% after resize. You are not chasing 50KB.",
    ],
    features: [
      { title: "Exact dimensions", body: "Type 1080×1350 when you already cropped 4:5." },
      { title: "Fast JPEG", body: "Smaller uploads, similar look." },
      { title: "On-device", body: "Brand shoots stay local until you post." },
    ],
    benefits: [
      { title: "Predictable posts", body: "You choose 4:5 vs 1:1 before Instagram does." },
      { title: "Lighter uploads", body: "Phones thank you." },
    ],
    steps: [
      { name: "Crop to the aspect you want", text: "Do this in IG, Lightroom, or any cropper." },
      { name: "Resize to ~1080 on the width", text: "Use exact or max-width mode." },
      { name: "Keep quality high", text: "JPEG 80%+." },
      { name: "Post the file", text: "Upload from the camera roll." },
    ],
    useCases: [
      { title: "Product grids", body: "Same width every time so the grid does not jump." },
      { title: "Portrait posts", body: "4:5 uses more feed real estate than landscape." },
    ],
    examples: [
      {
        title: "Phone photo to 4:5",
        body: "Crop 4:5 elsewhere, then exact 1080×1350 JPEG 85% here.",
      },
    ],
    faqs: [
      {
        question: "Does this post to Instagram?",
        answer: "No. It only prepares an image file.",
      },
      {
        question: "Stories vs feed?",
        answer: "Stories are 9:16. This resizer will do any pixels you enter — set 1080×1920 if that is what you need.",
      },
    ],
    relatedSlugs: [
      "resize-image-for-linkedin",
      "compress-image-for-whatsapp",
      "compress-image-under-1mb",
      "resize-image-for-government-form",
    ],
    body: [
      "Instagram will encode your file again. Starting from a 50MB original does not preserve more detail in the feed; it just gives their encoder a harder job. 1080px on the relevant edge is the practical master.",
      "Aspect is the real creative choice. A 4:5 crop changes the story. Resize cannot invent that crop. Do the crop with intent, then use this page as the last export.",
    ],
  },
  {
    type: "landing",
    slug: "resize-image-for-government-form",
    cluster: "image",
    keyword: "resize image for government form",
    h1: "Resize Image for Government Form",
    title: "Resize Image for Government Form Online",
    description:
      "Match pixel size and file weight for government photo uploads. Free, private, in-browser.",
    hubSlug: "image-tools",
    toolSlug: "image-compress",
    categorySlug: "images",
    intent: "Follow a government form’s pixel box and KB limit without installing desktop software.",
    audience: "Applicants dealing with portals that list both dimensions and kilobytes.",
    whatItDoes:
      "Government forms often say “200×230 pixels, 20–50KB, JPEG.” That is a resize job plus a compress job. This landing is the checklist for those specs, using the same compressor as the 20KB page but with emphasis on reading the form before you touch quality.",
    whyThisVersion:
      "The 20KB page assumes size is the only constraint. Many forms also reject photos that are too wide or too tall. This page starts with pixels, then KB.",
    whoShouldUse:
      "Anyone staring at a red error that mentions dimensions, DPI, or KB together.",
    whenToUse: [
      "The help text lists exact pixels.",
      "You already have a compliant-looking photo that is simply the wrong size.",
      "You do not need background removal.",
    ],
    commonMistakes: [
      "Only compressing. A 4000×3000 JPEG at 20KB looks like soup and may still fail min-width checks.",
      "Using PNG when the form says JPG only.",
    ],
    tips: [
      "Write down width, height, min KB, max KB from the form. Then enter width/height here.",
      "If min and max KB both exist, stay in the band — some portals reject files that are “too small” as well.",
    ],
    features: [
      { title: "Exact pixels", body: "Type the form’s width and height." },
      { title: "Quality slider", body: "Land inside the KB band after geometry is right." },
      { title: "JPEG export", body: "Most government uploaders still want JPG." },
    ],
    benefits: [
      { title: "One checklist", body: "Pixels first, then weight — the order the validator uses." },
      { title: "No install", body: "Works on a locked-down office browser." },
    ],
    steps: [
      { name: "Copy the spec", text: "Pixels and KB from the official page, not a forum." },
      { name: "Exact resize", text: "Set width and height to those pixels." },
      { name: "JPEG quality", text: "Adjust until you are inside the KB range." },
      { name: "Upload the download", text: "Keep the original in case another portal wants different numbers." },
    ],
    useCases: [
      { title: "National ID portals", body: "Strict boxes, old validators." },
      { title: "Scholarship and exam sites", body: "Copied specs across decades of vendors." },
    ],
    examples: [
      {
        title: "200×230 and 20–50KB",
        body: "Exact 200×230, JPEG, quality until size is between 20 and 50KB. If quality 90% is already under 20KB, the crop may be too small — check min KB.",
      },
    ],
    faqs: [
      {
        question: "Do you verify DPI?",
        answer:
          "Browsers do not really have DPI the way print does. Portals that say 300dpi usually mean a pixel count equivalent. Follow their pixel numbers.",
      },
      {
        question: "Can I do this on a phone?",
        answer: "Yes. The compressor runs in the mobile browser.",
      },
    ],
    relatedSlugs: [
      "compress-image-to-20kb",
      "passport-photo-compressor",
      "signature-image-compressor",
      "compress-image-to-50kb",
    ],
    body: [
      "Validators are if-statements: width, height, type, length. They do not know if you look like your ID. Your job is to satisfy the if-statements without destroying the face.",
      "When min KB and max KB both exist, you are in a tunnel. Too much quality overshoots max; too little plus a tiny canvas undershoots min. Change one variable at a time.",
    ],
  },
  {
    type: "landing",
    slug: "heic-to-jpg-converter",
    cluster: "image",
    keyword: "HEIC to JPG converter",
    h1: "HEIC to JPG Converter",
    title: "HEIC to JPG Converter Online",
    description:
      "Convert iPhone HEIC photos to JPG in your browser. Then compress if a form still rejects the size.",
    hubSlug: "image-tools",
    toolSlug: "heic-to-jpg",
    categorySlug: "images",
    intent: "Turn iPhone HEIC/HEIF files into JPGs that Windows PCs and old portals can open.",
    audience: "iPhone users sending photos to Windows users or uploading to sites that reject HEIC.",
    whatItDoes:
      "iPhones save HEIC by default. Many office PCs, printers, and government sites only accept JPEG. This page embeds the HEIC converter. It is a format bridge, not a 20KB compressor — convert first, then use a compress landing if the portal still complains about size.",
    whyThisVersion:
      "Compress-image pages cannot decode HEIC in Chrome until this conversion exists. This URL is the missing step in that pipeline, with copy aimed at iPhone → form, not generic “image converter.”",
    whoShouldUse:
      "Anyone whose file is named .HEIC or whose Windows machine shows a blank preview.",
    whenToUse: [
      "A portal lists JPG/PNG only.",
      "Outlook on Windows will not display the photo.",
      "You need to compress next and the compressor does not accept HEIC.",
    ],
    commonMistakes: [
      "Emailing HEIC to a Windows-only office and calling it a mail problem.",
      "Compressing after conversion with 20KB settings when the real issue was only the container.",
    ],
    tips: [
      "Convert, check the JPG opens, then compress only if a KB cap remains.",
      "Live Photos are two files. Convert the still image.",
    ],
    features: [
      { title: "Browser decode", body: "Safari can decode HEIC natively; Chrome uses a local decoder." },
      { title: "Quality slider", body: "You choose how hard to encode the JPEG." },
      { title: "No upload", body: "Vacation photos stay on the device." },
    ],
    benefits: [
      { title: "Compatibility", body: "JPG opens in everything that still runs in an office." },
      { title: "Pipeline", body: "Unlocks the rest of the image tools on Chrome." },
    ],
    steps: [
      { name: "Upload HEIC", text: "Drop the iPhone photo." },
      { name: "Convert", text: "Download JPG." },
      { name: "Open it", text: "Confirm Windows or the portal accepts JPEG." },
      { name: "Compress if needed", text: "Use a size-specific page if there is a KB cap." },
    ],
    useCases: [
      { title: "Office laptops", body: "IT never installed HEIC codecs." },
      { title: "Old uploaders", body: "MIME type image/heic is not on the allow list." },
    ],
    examples: [
      {
        title: "IMG_1234.HEIC to a job portal",
        body: "Convert here, then if the portal wants 100KB, open the 100KB compressor with the new JPG.",
      },
    ],
    faqs: [
      {
        question: "Is this the same as the Image Converter?",
        answer:
          "Image Converter handles PNG/JPG/WebP. HEIC needs a different decoder. Use this page for iPhone stills.",
      },
      {
        question: "Are files uploaded?",
        answer: "No. Conversion runs locally.",
      },
    ],
    relatedSlugs: [
      "compress-image-for-email",
      "compress-image-to-100kb",
      "resize-image-for-government-form",
      "compress-image-for-whatsapp",
    ],
    body: [
      "HEIC is a fine camera format and a terrible interchange format. Until every Windows box and Java uploader catches up, JPEG is the lingua franca.",
      "Do not skip this step and smash quality on a file Chrome cannot even preview. Convert, then apply the cap that actually belongs to the destination.",
    ],
  },
];

# Converters Roadmap

Full converter catalog for DevKit. Implement in phases. Prefer browser-local tools first.

## Phase 1 (done) — High-traffic client tools
- [x] Base64 Encode/Decode
- [x] URL Encode/Decode
- [x] JWT Decoder
- [x] JSON ↔ YAML
- [x] JSON ↔ XML
- [x] CSV ↔ JSON
- [x] Markdown ↔ HTML
- [x] HEX ↔ RGB
- [x] Unix Timestamp Converter (full UI)

## Phase 2 (done) — Code & data formats
- [x] JSON ↔ TOML
- [x] YAML ↔ XML
- [x] CSV ↔ XML
- [x] .env ↔ JSON
- [x] SQL ↔ JSON (INSERT best-effort)
- [x] HTML ↔ JSX
- [x] CSS ↔ SCSS (nest/flatten best-effort)
- [x] CommonJS ↔ ESM (best-effort)

## Phase 3 (done) — Image converters (client)
- [x] Image Converter (PNG/JPG/WebP out; GIF/BMP/AVIF in)
- [x] SVG Converter (SVG → PNG/JPG/WebP + image → embedded SVG)
- [x] ICO ↔ PNG (favicon sizes)

## Phase 4 (done) — Mobile model generators
- [x] JSON → Model (TS / Swift / Kotlin / Dart / C# / Java / Go / Rust)
- [x] SEO pages: json-to-typescript, swift, kotlin, dart, csharp, java, go, rust

## Phase 5 (done) — Crypto, network, units, finance, text
- [x] Hash Generator (MD5 + SHA family)
- [x] UUID Generator
- [x] Number Base Converter (bin/oct/dec/hex)
- [x] Color Converter (HEX/RGB/HSL/HSV/CMYK)
- [x] Color Palette Generator
- [x] Unit Converter (length/mass/temp/data/time)
- [x] Currency Converter (ECB via Frankfurter)
- [x] Text Case Converter
- [x] Word Counter
- [x] Percentage Calculator

## Placeholders completed
- [x] QR Code Generator
- [x] Regex Tester
- [x] Lottie Viewer
- [x] Deep Link Generator
- [x] API Response Viewer

## Phase 6a (done) — Documents & archives (browser)
- [x] Markdown → PDF
- [x] HTML → PDF
- [x] Image → PDF
- [x] PDF → Text
- [x] PDF → Image (PNG / ZIP)
- [x] ZIP create / extract
- [x] Word DOCX → PDF (browser via Mammoth; layout approximate)

## Out of scope (for now)
- Video / audio / ffmpeg
- Server/LibreOffice workers / API convert routes
- PDF → Word, Excel/PPT ↔ PDF, EPUB

## Document Converters
Word DOCX→PDF (client), Image↔PDF, PDF↔Image, PDF↔Text, HTML↔PDF, Markdown→PDF

## Image Converters
PNG↔JPG, WEBP↔PNG/JPG, SVG→PNG/JPG, PNG→SVG, BMP→PNG, GIF→PNG, ICO↔PNG, AVIF→PNG

## Encoding already shipped
Base64, URL encode/decode

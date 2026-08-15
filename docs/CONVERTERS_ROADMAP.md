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

## Phase 5 — Crypto, network, units, finance, text
Hashes, color full set, units, currency, calculators, text utilities

## Phase 6 — Documents & media (server required)
Word↔PDF, Excel, PowerPoint, EPUB, video (ffmpeg), audio, ZIP/TAR

## Document Converters
Word↔PDF, PDF↔Word, Excel↔PDF, PDF↔Excel, PowerPoint↔PDF, PDF↔PowerPoint, Image↔PDF, PDF↔Image, PDF↔Text, HTML↔PDF, Markdown→PDF, PDF↔HTML, EPUB↔PDF, MOBI↔EPUB, RTF↔DOCX, ODT↔DOCX

## Image Converters
PNG↔JPG, WEBP↔PNG/JPG, HEIC→JPG/PNG, SVG→PNG/JPG/PDF, PNG→SVG, BMP→PNG, TIFF→JPG, GIF→PNG, ICO↔PNG, AVIF↔PNG

## Video / Audio / Archive
See product backlog — requires server workers.

## Encoding already shipped
Base64, URL encode/decode

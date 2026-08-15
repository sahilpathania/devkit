import DOMPurify from "dompurify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/** A4 in mm */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/** Equal margin on every PDF page (mm). Keeps content off the edge. */
const PAGE_MARGIN_MM = 14;

/** Content box inside the page margins */
const CONTENT_WIDTH_MM = A4_WIDTH_MM - PAGE_MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PAGE_MARGIN_MM * 2;

/** CSS px per mm at 96dpi — used only for the offscreen layout width */
const PX_PER_MM = 96 / 25.4;
const RENDER_WIDTH_PX = Math.round(CONTENT_WIDTH_MM * PX_PER_MM);

/** html2canvas scale (2 ≈ retina; balances clarity vs memory) */
const CAPTURE_SCALE = 2;

/** Extra bottom space baked into the HTML so the last page is not flush-cut */
const CONTENT_BOTTOM_PAD_PX = 48;

/**
 * Isolated print CSS — hex/rgb only (html2canvas cannot parse lab/oklch).
 * Box model uses content-box padding so scrollHeight includes bottom pad.
 */
const PRINT_CSS = `
  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #111111;
  }
  #root {
    box-sizing: border-box;
    width: ${RENDER_WIDTH_PX}px;
    margin: 0;
    padding: 28px 28px ${CONTENT_BOTTOM_PAD_PX}px 28px;
    background: #ffffff;
    color: #111111;
    font: 16px/1.55 system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  #root > *:last-child {
    margin-bottom: 0;
  }
  * {
    box-sizing: border-box;
    max-width: 100%;
  }
  p, ul, ol, pre, blockquote, table {
    margin: 0 0 0.85em 0;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #111111;
    line-height: 1.3;
    margin: 1.1em 0 0.5em 0;
  }
  h1:first-child, h2:first-child, h3:first-child {
    margin-top: 0;
  }
  a { color: #0645ad; text-decoration: underline; }
  code, pre {
    background: #f4f4f4;
    color: #111111;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.92em;
  }
  code { padding: 0.1em 0.35em; border-radius: 3px; }
  pre {
    padding: 12px 14px;
    overflow: auto;
    border-radius: 4px;
    white-space: pre-wrap;
    word-break: break-word;
  }
  img, svg { max-width: 100%; height: auto; display: block; }
  table { border-collapse: collapse; width: 100%; }
  th, td {
    border: 1px solid #cccccc;
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
  }
  blockquote {
    margin: 0 0 0.85em 0;
    padding: 4px 0 4px 14px;
    border-left: 3px solid #cccccc;
    color: #333333;
  }
  ul, ol { padding-left: 1.4em; }
  hr {
    border: 0;
    border-top: 1px solid #dddddd;
    margin: 1.2em 0;
  }
`;

export function sanitizeHtml(html: string): string {
  const cleaned = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });
  // Drop inline colors html2canvas cannot parse
  return cleaned.replace(
    /\s(style|color|bgcolor)\s*=\s*(["'])[\s\S]*?\2/gi,
    (attr) =>
      /lab\s*\(|oklch\s*\(|color-mix\s*\(|lch\s*\(/i.test(attr) ? "" : attr
  );
}

function waitForIframeLoad(iframe: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve) => {
    if (iframe.contentDocument?.readyState === "complete") {
      resolve();
      return;
    }
    iframe.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitTwoFrames(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

async function waitForImages(doc: Document): Promise<void> {
  const images = Array.from(doc.images);
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    )
  );
}

function measureCaptureHeight(root: HTMLElement): number {
  // Prefer the largest of layout metrics so bottom padding is never dropped.
  const rect = root.getBoundingClientRect();
  return Math.ceil(
    Math.max(root.scrollHeight, root.offsetHeight, root.clientHeight, rect.height, 100)
  );
}

/**
 * Render HTML in a blank iframe (no app oklch/lab theme), then capture to canvas.
 */
async function htmlToCanvas(html: string): Promise<HTMLCanvasElement> {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    `width:${RENDER_WIDTH_PX}px`,
    "height:800px",
    "border:0",
    "opacity:0",
    "pointer-events:none",
    "visibility:hidden",
  ].join(";");
  document.body.appendChild(iframe);

  try {
    await waitForIframeLoad(iframe);
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("Could not create print frame.");

    doc.open();
    doc.write(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${PRINT_CSS}</style></head>` +
        `<body><div id="root">${html}</div></body></html>`
    );
    doc.close();

    await waitTwoFrames();
    await waitForImages(doc);
    await waitTwoFrames();

    const root = doc.getElementById("root");
    if (!root) throw new Error("Print root missing.");

    const captureHeight = measureCaptureHeight(root);
    // Give the iframe enough room so nothing is clipped during layout/paint
    iframe.style.height = `${captureHeight + 80}px`;
    await waitTwoFrames();

    const finalHeight = measureCaptureHeight(root);

    const canvas = await html2canvas(root, {
      scale: CAPTURE_SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      foreignObjectRendering: false,
      scrollX: 0,
      scrollY: -doc.documentElement.scrollTop,
      windowWidth: RENDER_WIDTH_PX,
      windowHeight: finalHeight,
      width: RENDER_WIDTH_PX,
      height: finalHeight,
      onclone(clonedDoc: Document, clonedRoot: Element) {
        const style = clonedDoc.createElement("style");
        style.textContent = PRINT_CSS;
        clonedDoc.head.appendChild(style);

        const el = clonedRoot as HTMLElement;
        el.style.width = `${RENDER_WIDTH_PX}px`;
        el.style.paddingBottom = `${CONTENT_BOTTOM_PAD_PX}px`;
        el.style.background = "#ffffff";
        el.style.color = "#111111";

        clonedDoc.querySelectorAll("*").forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const s = node.style;
          if (s.color && /lab|oklch|color-mix|lch|hwb/i.test(s.color)) {
            s.color = "#111111";
          }
          if (
            s.backgroundColor &&
            /lab|oklch|color-mix|lch|hwb/i.test(s.backgroundColor)
          ) {
            s.backgroundColor = "transparent";
          }
        });
      },
      // @types/html2canvas lags the runtime options (scale, etc.)
    } as never);

    // If html2canvas still returned a canvas shorter than expected, pad white below
    const expectedPx = Math.ceil(finalHeight * CAPTURE_SCALE);
    if (canvas.height < expectedPx - 2) {
      const padded = document.createElement("canvas");
      padded.width = canvas.width;
      padded.height = expectedPx;
      const ctx = padded.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, padded.width, padded.height);
        ctx.drawImage(canvas, 0, 0);
        return padded;
      }
    }

    return canvas;
  } finally {
    iframe.remove();
  }
}

/**
 * Slice a tall canvas into A4 pages with consistent margins.
 * Last page keeps its natural height (no stretch) so bottom padding stays visible.
 */
function canvasToPdf(canvas: HTMLCanvasElement, filename: string): {
  blob: Blob;
  filename: string;
} {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // How many source canvas pixels map to one content-box page height
  const pageSliceHeightPx = Math.max(
    1,
    Math.floor(canvas.width * (CONTENT_HEIGHT_MM / CONTENT_WIDTH_MM))
  );

  const totalHeight = canvas.height;
  const pageCount = Math.max(1, Math.ceil(totalHeight / pageSliceHeightPx));

  const sliceCanvas = document.createElement("canvas");
  const sliceCtx = sliceCanvas.getContext("2d");
  if (!sliceCtx) {
    throw new Error("Canvas unavailable for PDF paging.");
  }

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    const sourceY = pageIndex * pageSliceHeightPx;
    const sliceHeight = Math.min(pageSliceHeightPx, totalHeight - sourceY);

    sliceCanvas.width = canvas.width;
    sliceCanvas.height = sliceHeight;

    sliceCtx.fillStyle = "#ffffff";
    sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    sliceCtx.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight
    );

    const imgData = sliceCanvas.toDataURL("image/jpeg", 0.93);
    const sliceHeightMm =
      (sliceHeight / canvas.width) * CONTENT_WIDTH_MM;

    if (pageIndex > 0) {
      pdf.addPage();
    }

    // White page bg, then image inset by PAGE_MARGIN_MM on all sides
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, "F");
    pdf.addImage(
      imgData,
      "JPEG",
      PAGE_MARGIN_MM,
      PAGE_MARGIN_MM,
      CONTENT_WIDTH_MM,
      sliceHeightMm
    );
  }

  return { blob: pdf.output("blob"), filename };
}

/**
 * Render arbitrary HTML to a multi-page A4 PDF in the browser.
 * Used by Markdown → PDF, HTML → PDF, and Word → PDF.
 */
export async function htmlToPdfBlob(
  html: string,
  filename = "document.pdf"
): Promise<{ blob: Blob; filename: string }> {
  const safe = sanitizeHtml(html);
  if (!safe.trim()) {
    throw new Error("HTML is empty after sanitizing.");
  }

  const canvas = await htmlToCanvas(safe);
  if (canvas.width < 1 || canvas.height < 1) {
    throw new Error("PDF capture produced an empty page.");
  }

  return canvasToPdf(canvas, filename);
}

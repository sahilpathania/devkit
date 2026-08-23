import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image for social sharing. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0b1f4a 0%, #1d6cf0 55%, #0ea5e9 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#1d6cf0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: "white",
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          >
            TB
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
              Tool<span style={{ color: "#7dd3fc" }}>Bay</span>
            </span>
            <span style={{ fontSize: 18, opacity: 0.85, marginTop: 4 }}>
              {SITE_CONFIG.tagline}
            </span>
          </div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
          Everything you need. One place.
        </div>
        <div style={{ marginTop: 28, fontSize: 24, opacity: 0.85, maxWidth: 800 }}>
          Free online tools for everyone. Private by default.
        </div>
      </div>
    ),
    { ...size }
  );
}

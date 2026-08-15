export type DeepLinkPlatform = "custom" | "https" | "ios" | "android";

export interface DeepLinkFields {
  platform: DeepLinkPlatform;
  scheme: string;
  host: string;
  path: string;
  /** Query as key=value lines */
  query: string;
  packageName: string;
  appStoreId: string;
  fallbackUrl: string;
}

export function parseQueryLines(query: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of query.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return out;
}

export function buildDeepLink(fields: DeepLinkFields): {
  primary: string;
  variants: { label: string; url: string }[];
} {
  const path = fields.path.replace(/^\/+/, "");
  const params = parseQueryLines(fields.query);
  const qs = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

  const scheme = (fields.scheme || "myapp").replace(/:\/\/*$/, "");
  const host = fields.host.trim();

  let primary = "";
  if (fields.platform === "https") {
    const baseHost = host || "example.com";
    primary = `https://${baseHost}/${path}${qs ? `?${qs}` : ""}`;
  } else {
    primary = `${scheme}://${host ? `${host}/` : ""}${path}${qs ? `?${qs}` : ""}`;
  }

  const variants: { label: string; url: string }[] = [
    { label: "Primary", url: primary },
  ];

  if (fields.platform === "android" || fields.packageName) {
    const pkg = fields.packageName || "com.example.app";
    const intent = `intent://${host ? `${host}/` : ""}${path}${qs ? `?${qs}` : ""}#Intent;scheme=${scheme};package=${pkg};end`;
    variants.push({ label: "Android Intent", url: intent });
  }

  if (fields.appStoreId) {
    variants.push({
      label: "App Store",
      url: `https://apps.apple.com/app/id${fields.appStoreId}`,
    });
  }

  if (fields.fallbackUrl.trim()) {
    variants.push({ label: "Fallback / Universal", url: fields.fallbackUrl.trim() });
  }

  return { primary, variants };
}

export const DEEP_LINK_SAMPLE: DeepLinkFields = {
  platform: "custom",
  scheme: "myapp",
  host: "product",
  path: "123",
  query: "ref=devkit\nutm_source=share",
  packageName: "com.example.myapp",
  appStoreId: "123456789",
  fallbackUrl: "https://example.com/product/123",
};

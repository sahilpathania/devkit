import QRCode from "qrcode";

export type QrMode = "text" | "url" | "wifi";

export interface WifiFields {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export function buildWifiPayload(fields: WifiFields): string {
  const escape = (v: string) => v.replace(/([\\;,:"])/g, "\\$1");
  const type = fields.encryption === "nopass" ? "nopass" : fields.encryption;
  const pass =
    fields.encryption === "nopass" ? "" : `P:${escape(fields.password)};`;
  const hidden = fields.hidden ? "H:true;" : "";
  return `WIFI:T:${type};S:${escape(fields.ssid)};${pass}${hidden};`;
}

export async function generateQrDataUrl(
  text: string,
  options?: { width?: number; margin?: number; dark?: string; light?: string }
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Enter text, a URL, or WiFi details.");
  return QRCode.toDataURL(trimmed, {
    width: options?.width ?? 280,
    margin: options?.margin ?? 2,
    color: {
      dark: options?.dark ?? "#0f172a",
      light: options?.light ?? "#ffffff",
    },
    errorCorrectionLevel: "M",
  });
}

export async function generateQrSvg(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Enter text, a URL, or WiFi details.");
  return QRCode.toString(trimmed, {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
  });
}

export const QR_SAMPLE_URL = "https://toolbay.in";

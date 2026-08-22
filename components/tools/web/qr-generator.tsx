"use client";

import { useCallback, useId, useState } from "react";
import { AlertCircle, Download, Eraser, QrCode, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  QR_SAMPLE_URL,
  buildWifiPayload,
  generateQrDataUrl,
  generateQrSvg,
  type QrMode,
  type WifiFields,
} from "@/lib/tools/qr";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Generate QR codes from text, URLs, or WiFi credentials.
 */
export function QrGenerator(_props: ToolComponentProps) {
  const inputId = useId();
  const [mode, setMode] = useState<QrMode>("url");
  const [text, setText] = useState(QR_SAMPLE_URL);
  const [wifi, setWifi] = useState<WifiFields>({
    ssid: "ToolBay-WiFi",
    password: "secret123",
    encryption: "WPA",
    hidden: false,
  });
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const payload =
    mode === "wifi"
      ? buildWifiPayload(wifi)
      : text;

  const generate = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      setDataUrl(await generateQrDataUrl(payload));
    } catch (err) {
      setDataUrl(null);
      setError(err instanceof Error ? err.message : "Could not generate QR code.");
    } finally {
      setBusy(false);
    }
  }, [payload]);

  const downloadPng = useCallback(() => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    a.click();
  }, [dataUrl]);

  const downloadSvg = useCallback(async () => {
    try {
      const svg = await generateQrSvg(payload);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code.svg";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "SVG export failed.");
    }
  }, [payload]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={() => void generate()} disabled={busy} className="gap-1.5">
            <QrCode className="size-4" />
            {busy ? "Generating…" : "Generate"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setMode("url");
              setText(QR_SAMPLE_URL);
              setError(null);
            }}
            className="gap-1.5"
          >
            <Sparkles className="size-4" />
            Sample
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setText("");
              setDataUrl(null);
              setError(null);
            }}
            className="gap-1.5 text-muted-foreground"
          >
            <Eraser className="size-4" />
            Clear
          </Button>
          {dataUrl && (
            <>
              <Button type="button" variant="outline" onClick={downloadPng} className="gap-1.5">
                <Download className="size-4" />
                PNG
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => void downloadSvg()}
                className="gap-1.5"
              >
                <Download className="size-4" />
                SVG
              </Button>
            </>
          )}
        </div>

        <div className="flex rounded-lg border border-border/60 p-0.5" role="group">
          {(
            [
              { value: "url" as const, label: "URL" },
              { value: "text" as const, label: "Text" },
              { value: "wifi" as const, label: "WiFi" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setMode(option.value);
                setError(null);
              }}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-colors",
                mode === option.value
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={mode === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          {mode === "wifi" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="wifi-ssid">Network name (SSID)</Label>
                <Input
                  id="wifi-ssid"
                  value={wifi.ssid}
                  onChange={(e) => setWifi((w) => ({ ...w, ssid: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wifi-pass">Password</Label>
                <Input
                  id="wifi-pass"
                  type="password"
                  value={wifi.password}
                  onChange={(e) => setWifi((w) => ({ ...w, password: e.target.value }))}
                  disabled={wifi.encryption === "nopass"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wifi-enc">Encryption</Label>
                <select
                  id="wifi-enc"
                  value={wifi.encryption}
                  onChange={(e) =>
                    setWifi((w) => ({
                      ...w,
                      encryption: e.target.value as WifiFields["encryption"],
                    }))
                  }
                  className="h-8 w-full rounded-lg border border-border bg-background px-2 text-sm"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={wifi.hidden}
                  onChange={(e) => setWifi((w) => ({ ...w, hidden: e.target.checked }))}
                />
                Hidden network
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor={inputId}>{mode === "url" ? "URL" : "Text"}</Label>
              <Textarea
                id={inputId}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={mode === "url" ? "https://…" : "Any text…"}
                className="min-h-[140px]"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex size-[280px] items-center justify-center rounded-2xl border border-border/60 bg-white p-3">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt="Generated QR code" className="size-full" />
            ) : (
              <p className="px-4 text-center text-sm text-muted-foreground">
                Click Generate to preview
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

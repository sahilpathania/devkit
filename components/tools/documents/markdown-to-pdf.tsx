"use client";

import { useCallback, useState } from "react";
import { AlertCircle, CheckCircle2, Download, Eraser, FileDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { downloadBlob, formatBytes } from "@/lib/tools/image-convert";
import { markdownToPdfBlob } from "@/lib/tools/markdown-pdf";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const SAMPLE = `# DevKit Markdown → PDF

Convert **Markdown** to PDF in your browser.

- No upload for this tool
- Supports headings, lists, and code

\`\`\`ts
const ok = true;
\`\`\`
`;

export function MarkdownToPdf(_props: ToolComponentProps) {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [result, setResult] = useState<{ blob: Blob; filename: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const clear = useCallback(() => {
    setMarkdown("");
    setResult(null);
    setError(null);
  }, []);

  const convert = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const next = await markdownToPdfBlob(markdown, "markdown.pdf");
      setResult(next);
      toast.success("Conversion successful", {
        description: `${next.filename} · ${formatBytes(next.blob.size)}`,
      });
    } catch (err) {
      setResult(null);
      const message = err instanceof Error ? err.message : "Conversion failed.";
      setError(message);
      toast.error("Conversion failed", { description: message });
    } finally {
      setBusy(false);
    }
  }, [markdown]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => void convert()} disabled={busy} className="gap-1.5">
          <FileDown className="size-4" />
          {busy ? "Creating PDF…" : "Convert to PDF"}
        </Button>
        <Button type="button" variant="ghost" onClick={clear} className="gap-1.5 text-muted-foreground">
          <Eraser className="size-4" />
          Clear
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setMarkdown(SAMPLE)}
          className="gap-1.5"
        >
          Sample
        </Button>
        {result && (
          <Button
            type="button"
            variant="outline"
            onClick={() => downloadBlob(result.blob, result.filename)}
            className="gap-1.5"
          >
            <Download className="size-4" />
            Download
          </Button>
        )}
      </div>

      {(error || result) && (
        <div
          role="status"
          className={cn(
            "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
            error
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
          )}
        >
          {error ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          )}
          <span>
            {error
              ? error
              : result
                ? `Ready · ${formatBytes(result.blob.size)} · ${result.filename}`
                : null}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="md-pdf-input">Markdown</Label>
        <textarea
          id="md-pdf-input"
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value);
            setResult(null);
            setError(null);
          }}
          rows={16}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-border/60 bg-background px-3 py-2 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="# Heading"
        />
      </div>
    </div>
  );
}

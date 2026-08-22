"use client";

import { useCallback, useId, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  Eraser,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import {
  JSON_MODEL_SAMPLE,
  MODEL_LANGUAGES,
  convertJsonToModel,
  type ModelLanguage,
} from "@/lib/tools/json-model";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const SLUG_DEFAULT_LANGUAGE: Record<string, ModelLanguage> = {
  "json-to-model": "typescript",
  "json-to-typescript": "typescript",
  "json-to-swift": "swift",
  "json-to-kotlin": "kotlin",
  "json-to-dart": "dart",
  "json-to-csharp": "csharp",
  "json-to-java": "java",
  "json-to-go": "go",
  "json-to-rust": "rust",
};

/**
 * Generate typed models from sample JSON for mobile and backend languages.
 */
export function JsonModelGenerator({ tool }: ToolComponentProps) {
  const inputId = useId();
  const outputId = useId();
  const rootId = useId();
  const slugLang = SLUG_DEFAULT_LANGUAGE[tool.slug] ?? "typescript";

  const [language, setLanguage] = useState<ModelLanguage>(slugLang);
  const [prevSlug, setPrevSlug] = useState(tool.slug);
  const [rootName, setRootName] = useState("Root");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (tool.slug !== prevSlug) {
    setPrevSlug(tool.slug);
    setLanguage(slugLang);
  }

  const run = useCallback(() => {
    const result = convertJsonToModel(input, language, rootName);
    if (result.success) {
      setOutput(result.output);
      setError(null);
      setSuccess(true);
    } else {
      setError(result.error);
      setSuccess(false);
    }
  }, [input, language, rootName]);

  useKeyboardShortcut(run, { key: "Enter", modifier: "meta" });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={run} className="gap-1.5">
            <Code2 className="size-4" />
            Generate
            <kbd className="ml-1 hidden rounded border border-primary-foreground/20 px-1.5 py-0.5 text-[10px] font-medium opacity-70 sm:inline">
              ⌘↵
            </kbd>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setInput(JSON_MODEL_SAMPLE);
              setError(null);
              setSuccess(false);
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
              setInput("");
              setOutput("");
              setError(null);
              setSuccess(false);
            }}
            className="gap-1.5 text-muted-foreground"
          >
            <Eraser className="size-4" />
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Smartphone className="size-3.5" />
          Best-effort from sample JSON
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Target language">
        {MODEL_LANGUAGES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setLanguage(option.value);
              setSuccess(false);
              setError(null);
            }}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs transition-colors",
              language === option.value
                ? "border-border bg-muted font-medium text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={language === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="max-w-xs space-y-2">
        <Label htmlFor={rootId}>Root type name</Label>
        <Input
          id={rootId}
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          placeholder="Root"
          className="font-mono"
        />
      </div>

      {(error || success) && (
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
              : `Generated ${MODEL_LANGUAGES.find((l) => l.value === language)?.label} model`}
          </span>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={inputId}>JSON</Label>
            <CopyButton value={input} label="Copy JSON" disabled={!input} />
          </div>
          <Textarea
            id={inputId}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSuccess(false);
              setError(null);
            }}
            placeholder='{"id": 1, "name": "ToolBay"}'
            className="min-h-[320px] font-mono text-xs"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={outputId}>
              {MODEL_LANGUAGES.find((l) => l.value === language)?.label} model
            </Label>
            <CopyButton value={output} label="Copy code" disabled={!output} />
          </div>
          <Textarea
            id={outputId}
            value={output}
            readOnly
            placeholder="Generated model appears here"
            className="min-h-[320px] font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}

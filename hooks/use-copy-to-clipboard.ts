"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UseCopyToClipboardOptions {
  /** Toast message shown on successful copy */
  successMessage?: string;
}

/** Copy text to clipboard with toast feedback. */
export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const { successMessage = "Copied to clipboard" } = options;
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(successMessage);
        setTimeout(() => setCopied(false), 2000);
        return true;
      } catch {
        toast.error("Failed to copy to clipboard");
        return false;
      }
    },
    [successMessage]
  );

  return { copy, copied };
}

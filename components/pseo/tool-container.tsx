"use client";

import { ToolRenderer } from "@/components/tools/tool-renderer";
import type { Tool } from "@/types";

interface PseoToolContainerProps {
  tool: Tool;
}

/** Lazy tool embed for programmatic landings. */
export function PseoToolContainer({ tool }: PseoToolContainerProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
      <ToolRenderer tool={tool} />
    </div>
  );
}

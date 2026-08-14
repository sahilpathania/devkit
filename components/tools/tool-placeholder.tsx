import { Wrench } from "lucide-react";
import type { Tool } from "@/types";

interface ToolPlaceholderProps {
  tool: Tool;
}

/** Placeholder shown until individual tool components are implemented. */
export function ToolPlaceholder({ tool }: ToolPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
        <Wrench className="size-8 text-muted-foreground" />
      </div>
      <h2 className="mt-4 text-lg font-medium">{tool.name} coming soon</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        This tool is registered in the DevKit architecture and will be implemented in the next iteration.
      </p>
    </div>
  );
}

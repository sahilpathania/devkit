"use client";

import { useCallback, useId, useState } from "react";
import { Eraser, Hash, RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NIL_UUID, generateUuidV4, generateUuids } from "@/lib/tools/uuid";
import type { ToolComponentProps } from "@/types";

/**
 * Generate UUID v4 identifiers (single or bulk).
 */
export function UuidGenerator(_props: ToolComponentProps) {
  const countId = useId();
  const [single, setSingle] = useState(() => generateUuidV4());
  const [count, setCount] = useState("10");
  const [bulk, setBulk] = useState("");

  const regenerate = useCallback(() => {
    setSingle(generateUuidV4());
  }, []);

  const generateBulk = useCallback(() => {
    const n = Number(count);
    setBulk(generateUuids(Number.isFinite(n) ? n : 10).join("\n"));
  }, [count]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={regenerate} className="gap-1.5">
            <RefreshCw className="size-4" />
            New UUID
          </Button>
          <CopyButton value={single} label="Copy UUID" />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSingle(NIL_UUID)}
            className="gap-1.5 text-muted-foreground"
          >
            Nil UUID
          </Button>
        </div>
        <code className="block rounded-xl border border-border/60 bg-muted/20 px-4 py-3 font-mono text-sm break-all">
          {single}
        </code>
      </div>

      <div className="space-y-3 border-t border-border/60 pt-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-2">
            <Label htmlFor={countId}>Bulk count (max 500)</Label>
            <Input
              id={countId}
              inputMode="numeric"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-28 font-mono"
            />
          </div>
          <Button type="button" onClick={generateBulk} className="gap-1.5">
            <Hash className="size-4" />
            Generate bulk
          </Button>
          <CopyButton value={bulk} label="Copy all" disabled={!bulk} />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setBulk("")}
            className="gap-1.5 text-muted-foreground"
          >
            <Eraser className="size-4" />
            Clear
          </Button>
        </div>
        <Textarea
          value={bulk}
          readOnly
          placeholder="Bulk UUIDs appear here"
          className="min-h-[220px] font-mono text-xs"
        />
      </div>
    </div>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/shared/copy-button";
import {
  DEFAULT_CHARSET,
  estimateStrength,
  generatePassword,
  type PasswordCharset,
} from "@/lib/tools/password";
import type { ToolComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const TOGGLES: { key: keyof PasswordCharset; label: string }[] = [
  { key: "lower", label: "a–z" },
  { key: "upper", label: "A–Z" },
  { key: "digits", label: "0–9" },
  { key: "symbols", label: "!@#" },
];

export function PasswordGenerator(_props: ToolComponentProps) {
  const [length, setLength] = useState(16);
  const [charset, setCharset] = useState<PasswordCharset>(DEFAULT_CHARSET);
  const [password, setPassword] = useState(() => generatePassword(16, DEFAULT_CHARSET));

  const strength = useMemo(() => estimateStrength(password), [password]);

  const regenerate = useCallback(() => {
    try {
      const next = generatePassword(length, charset);
      setPassword(next);
      toast.success("Password generated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not generate.");
    }
  }, [charset, length]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="password-out">Password</Label>
        <div className="flex gap-2">
          <Input
            id="password-out"
            readOnly
            value={password}
            className="font-mono text-base tracking-wide"
          />
          <CopyButton value={password} />
          <Button type="button" variant="outline" onClick={regenerate} className="gap-1.5 shrink-0">
            <RefreshCw className="size-4" />
            New
          </Button>
        </div>
        <p
          className={cn(
            "text-xs font-medium",
            strength.label === "Weak" && "text-destructive",
            strength.label === "Fair" && "text-amber-600 dark:text-amber-400",
            strength.label === "Strong" && "text-emerald-600 dark:text-emerald-400",
            strength.label === "Excellent" && "text-teal-600 dark:text-teal-400"
          )}
        >
          Strength: {strength.label}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pw-len">Length ({length})</Label>
        <input
          id="pw-len"
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-teal-600"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Character sets">
        {TOGGLES.map((toggle) => (
          <button
            key={toggle.key}
            type="button"
            onClick={() =>
              setCharset((prev) => ({ ...prev, [toggle.key]: !prev[toggle.key] }))
            }
            className={cn(
              "rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors",
              charset[toggle.key]
                ? "border-border bg-muted font-medium"
                : "border-border/60 text-muted-foreground"
            )}
            aria-pressed={charset[toggle.key]}
          >
            {toggle.label}
          </button>
        ))}
      </div>

      <Button type="button" onClick={regenerate} className="gap-1.5">
        <RefreshCw className="size-4" />
        Generate password
      </Button>
    </div>
  );
}

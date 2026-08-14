"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  size?: "default" | "sm" | "icon" | "icon-sm";
  variant?: "default" | "ghost" | "outline" | "secondary";
  disabled?: boolean;
}

export function CopyButton({
  value,
  label = "Copy",
  className,
  size = "icon-sm",
  variant = "ghost",
  disabled = false,
}: CopyButtonProps) {
  const { copy, copied } = useCopyToClipboard();
  const isDisabled = disabled || !value;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant={variant}
            size={size}
            className={cn(className)}
            onClick={() => copy(value)}
            disabled={isDisabled}
            aria-label={copied ? "Copied" : label}
          />
        }
      >
        {copied ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied!" : label}</TooltipContent>
    </Tooltip>
  );
}

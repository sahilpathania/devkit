import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className
      )}
      aria-label={`${SITE_CONFIG.name} home`}
    >
      <div className="relative flex size-8 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
        <Sparkles className="size-3.5" aria-hidden="true" />
      </div>
      {showText && (
        <span className="text-lg font-semibold tracking-tight">
          {SITE_CONFIG.name}
        </span>
      )}
    </Link>
  );
}

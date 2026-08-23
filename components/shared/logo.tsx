import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Icon only, or icon + wordmark (default) */
  variant?: "full" | "icon";
  showTagline?: boolean;
  /** Load eagerly — use in header */
  priority?: boolean;
}

export function Logo({
  className,
  variant = "full",
  showTagline = false,
  priority = false,
}: LogoProps) {
  const label = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90",
        className
      )}
      aria-label={label}
    >
      <Image
        src={SITE_CONFIG.logoIcon}
        alt=""
        width={1024}
        height={1024}
        priority={priority}
        className="size-9 shrink-0 rounded-xl object-cover shadow-sm"
      />

      {variant === "full" && (
        <div className="flex min-w-0 flex-col leading-none">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-foreground">Tool</span>
            <span className="text-[#1d6cf0]">Bay</span>
          </span>
          {showTagline && (
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {SITE_CONFIG.tagline}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

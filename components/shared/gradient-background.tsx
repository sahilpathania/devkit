import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

/** Subtle grid + radial glow background used on hero and tool pages. */
export function GradientBackground({ className, children }: GradientBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden bg-hero-glow", className)}>
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

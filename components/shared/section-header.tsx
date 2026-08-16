import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeader({
  title,
  description,
  className,
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        <h2 className="text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.05em] sm:text-[2.2rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

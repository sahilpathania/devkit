import { Lock, ShieldCheck, Sparkles, Zap } from "lucide-react";

/** Trust / privacy strip shown on every tool page. */
export function ToolTrustStrip({ local = true }: { local?: boolean }) {
  const items = local
    ? [
        { icon: Lock, label: "Processed in your browser" },
        { icon: ShieldCheck, label: "Privacy-first" },
        { icon: Zap, label: "No account required" },
        { icon: Sparkles, label: "Nothing uploaded by default" },
      ]
    : [
        { icon: ShieldCheck, label: "Secure processing" },
        { icon: Lock, label: "Ephemeral files" },
        { icon: Zap, label: "No account required" },
      ];

  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 px-3 py-2.5 text-xs text-muted-foreground"
        >
          <item.icon className="size-3.5 shrink-0 text-foreground/70" aria-hidden />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

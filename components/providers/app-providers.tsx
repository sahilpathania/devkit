"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/shared/command-palette";

interface AppProvidersProps {
  children: React.ReactNode;
}

/** Root client-side providers wrapper. */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <TooltipProvider delay={300}>
        {children}
        <CommandPalette />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: "border-border bg-card text-card-foreground shadow-lg",
              success:
                "border-emerald-500/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
              error:
                "border-destructive/40 bg-destructive/10 text-destructive",
            },
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}

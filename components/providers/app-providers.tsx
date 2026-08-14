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
          toastOptions={{
            classNames: {
              toast: "border-border bg-card text-card-foreground shadow-lg",
            },
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}

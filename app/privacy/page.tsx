import type { Metadata } from "next";
import { GradientBackground } from "@/components/shared/gradient-background";
import { SITE_CONFIG } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy — ToolBay",
  description: "How ToolBay handles your data. Free tools run locally in your browser.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: August 14, 2026</p>
        </div>
      </GradientBackground>

      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="space-y-4 text-muted-foreground">
          <p>
            {SITE_CONFIG.name} (“we”, “our”) provides free browser-based online tools for
            everyone. This policy explains what we collect and what we do not.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Tool input data</h2>
          <p>
            Free tools process your input entirely in your browser. JSON, JWTs, tokens, and
            similar content are not uploaded to our servers for formatting, decoding, or
            generation unless a specific tool explicitly states otherwise.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Local storage</h2>
          <p>
            Preferences such as theme, favorites, and recent history are stored in your
            browser (localStorage). Clearing site data removes them.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
          <p>
            We may use privacy-conscious analytics (for example PostHog or Google Analytics)
            to understand aggregate usage. These may collect anonymized page views and device
            information. You can block analytics via browser extensions or settings.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about privacy:{" "}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-foreground underline underline-offset-4"
            >
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import { GradientBackground } from "@/components/shared/gradient-background";
import { SITE_CONFIG } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service — DevKit",
  description: "Terms governing use of DevKit developer tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last updated: August 14, 2026</p>
        </div>
      </GradientBackground>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="space-y-4 text-muted-foreground">
          <p>
            By using {SITE_CONFIG.name}, you agree to these terms. If you do not agree, do
            not use the site.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Use of tools</h2>
          <p>
            Tools are provided free of charge for lawful purposes. You are responsible for
            any data you paste into tools, including secrets and production credentials.
          </p>

          <h2 className="text-xl font-semibold text-foreground">No warranty</h2>
          <p>
            Tools are provided “as is” without warranties of accuracy, availability, or
            fitness for a particular purpose. Do not rely on them as the sole check for
            security-sensitive or production-critical work.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE_CONFIG.name} is not liable for
            damages arising from use of the site or tools.
          </p>

          <h2 className="text-xl font-semibold text-foreground">Changes</h2>
          <p>
            We may update these terms. Continued use after changes constitutes acceptance of
            the updated terms.
          </p>
        </section>
      </article>
    </>
  );
}

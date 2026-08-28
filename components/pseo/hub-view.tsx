import Link from "next/link";
import { Breadcrumb } from "@/components/tools/breadcrumb";
import { GradientBackground } from "@/components/shared/gradient-background";
import { hubBreadcrumbs } from "@/lib/pseo/schema";
import { getLandingsByHub, getPseoHubs } from "@/lib/pseo/registry";
import type { PseoHub } from "@/lib/pseo/types";

interface PseoHubViewProps {
  page: PseoHub;
}

export function PseoHubView({ page }: PseoHubViewProps) {
  const landings = getLandingsByHub(page.slug);
  const relatedHubs = getPseoHubs().filter((hub) => page.relatedHubSlugs.includes(hub.slug));

  return (
    <div>
      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb items={hubBreadcrumbs(page)} />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{page.h1}</h1>
          <div className="mt-4 max-w-3xl space-y-3 text-muted-foreground">
            {page.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </GradientBackground>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold tracking-tight">Guides</h2>
        <ul className="mt-4 divide-y divide-border/60 rounded-2xl border border-border/60">
          {landings.map((landing) => (
            <li key={landing.slug}>
              <Link href={`/${landing.slug}`} className="block px-4 py-3 hover:bg-muted/40">
                <span className="font-medium">{landing.h1}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{landing.intent}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted-foreground">
          Full catalog:{" "}
          <Link href={`/category/${page.categorySlug}`} className="underline underline-offset-4">
            {page.categorySlug} tools
          </Link>
          .
        </p>

        <section className="mt-10 max-w-3xl">
          <h2 className="text-lg font-semibold tracking-tight">FAQ</h2>
          <dl className="mt-4 space-y-4 text-sm">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-medium">{faq.question}</dt>
                <dd className="mt-1 text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav className="mt-10 text-sm" aria-label="Other guides">
          <h2 className="text-lg font-semibold tracking-tight">Other hubs</h2>
          <ul className="mt-3 space-y-2">
            {relatedHubs.map((hub) => (
              <li key={hub.slug}>
                <Link href={`/${hub.slug}`} className="underline-offset-4 hover:underline">
                  {hub.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

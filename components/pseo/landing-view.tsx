import Link from "next/link";
import { Breadcrumb } from "@/components/tools/breadcrumb";
import { GradientBackground } from "@/components/shared/gradient-background";
import { PseoToolContainer } from "@/components/pseo/tool-container";
import { landingBreadcrumbs } from "@/lib/pseo/schema";
import { getHubBySlug, resolveRelatedLandings } from "@/lib/pseo/registry";
import type { PseoLanding } from "@/lib/pseo/types";
import type { Tool } from "@/types";

interface PseoLandingViewProps {
  page: PseoLanding;
  tool: Tool;
}

export function PseoLandingView({ page, tool }: PseoLandingViewProps) {
  const hub = getHubBySlug(page.hubSlug);
  const crumbs = landingBreadcrumbs(page, hub?.h1 ?? "Tools");
  const related = resolveRelatedLandings(page);

  return (
    <div>
      <GradientBackground className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb items={crumbs} />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{page.h1}</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">{page.intent}</p>
        </div>
      </GradientBackground>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PseoToolContainer tool={tool} />

        <article className="mt-12 max-w-3xl space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">What this does</h2>
            <p className="mt-2">{page.whatItDoes}</p>
            <p className="mt-3">{page.whyThisVersion}</p>
            <p className="mt-3">{page.whoShouldUse}</p>
            {page.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-3">
                {paragraph}
              </p>
            ))}
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">When to use it</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              {page.whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">How to</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              {page.steps.map((step) => (
                <li key={step.name}>
                  <span className="font-medium text-foreground">{step.name}.</span> {step.text}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Features</h2>
            <ul className="mt-2 space-y-3">
              {page.features.map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-foreground">{item.title}.</span> {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Why it helps</h2>
            <ul className="mt-2 space-y-3">
              {page.benefits.map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-foreground">{item.title}.</span> {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Use cases</h2>
            <ul className="mt-2 space-y-3">
              {page.useCases.map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-foreground">{item.title}.</span> {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>
            <ul className="mt-2 space-y-3">
              {page.examples.map((item) => (
                <li key={item.title}>
                  <span className="font-medium text-foreground">{item.title}.</span> {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Common mistakes</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              {page.commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Tips</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              {page.tips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-3 space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-medium text-foreground">{faq.question}</dt>
                  <dd className="mt-1">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <nav className="mt-12 border-t border-border/60 pt-8" aria-label="Related">
          <h2 className="text-lg font-semibold tracking-tight">Related</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {hub && (
              <li>
                <Link href={`/${hub.slug}`} className="underline-offset-4 hover:underline">
                  {hub.h1}
                </Link>
              </li>
            )}
            <li>
              <Link
                href={`/tool/${page.toolSlug}`}
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Open the full {tool.name} tool page
              </Link>
            </li>
            <li>
              <Link
                href={`/category/${page.categorySlug}`}
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                All {page.categorySlug} tools
              </Link>
            </li>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`} className="underline-offset-4 hover:underline">
                  {item.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

import Link from "next/link";
import { buildToolSeoContent, getToolPrivacyLine } from "@/lib/tool-seo-content";
import { getCategoryBySlug } from "@/services/categories";
import type { Tool } from "@/types";

interface ToolSeoContentProps {
  tool: Tool;
}

/**
 * Compact server-rendered copy for crawlers and users who scroll past the tool.
 */
export function ToolSeoContent({ tool }: ToolSeoContentProps) {
  const category = getCategoryBySlug(tool.category);
  const content = buildToolSeoContent(tool);

  return (
    <section aria-labelledby="tool-seo-heading" className="mt-12 max-w-3xl">
      <h2 id="tool-seo-heading" className="text-lg font-semibold tracking-tight">
        {content.heading}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.intro}</p>

      <ol className="mt-6 space-y-3">
        {content.steps.map((step, index) => (
          <li key={step.title} className="text-sm leading-relaxed">
            <span className="font-medium text-foreground">
              {index + 1}. {step.title}.
            </span>{" "}
            <span className="text-muted-foreground">{step.description}</span>
          </li>
        ))}
      </ol>

      {content.useCases.length > 0 && (
        <ul className="mt-6 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          {content.useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      )}

      {tool.faqs.length > 0 && (
        <dl className="mt-8 space-y-4">
          {tool.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-sm font-medium">{faq.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        {getToolPrivacyLine()}
        {category && (
          <>
            {" "}
            More{" "}
            <Link
              href={`/category/${category.slug}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {category.name.toLowerCase()} tools
            </Link>
            .
          </>
        )}
      </p>
    </section>
  );
}

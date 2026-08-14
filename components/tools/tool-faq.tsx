import type { ToolFAQ as ToolFAQType } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ToolFAQProps {
  faqs: ToolFAQType[];
}

/** FAQ section for tool detail pages — also feeds JSON-LD schema. */
export function ToolFAQ({ faqs }: ToolFAQProps) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-semibold tracking-tight">
        Frequently Asked Questions
      </h2>
      <Accordion className="mt-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

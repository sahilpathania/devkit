interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown> | null>;
}

/**
 * Renders JSON-LD for search engines.
 * Escape `<` to avoid breaking out of the script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data.filter(Boolean) : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}

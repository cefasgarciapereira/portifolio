interface JsonLdProps {
  data: object;
}

/** Renders a schema.org JSON-LD block into the document. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

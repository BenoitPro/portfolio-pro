import { seo, profile, experience } from "@/data/portfolio";

export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: seo.url,
    jobTitle: experience[0].role,
    worksFor: { "@type": "Organization", name: experience[0].company },
    description: seo.description,
    sameAs: [
      "https://www.linkedin.com/in/benoit-baillon-cloud/",
      "https://www.youtube.com/@ZeroCode_Benoit",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

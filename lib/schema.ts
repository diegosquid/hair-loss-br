import { Article, Author } from "@/types";

export const SITE_URL = "https://capilarmente.com.br";
export const SITE_NAME = "Capilarmente";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Guia brasileiro de tratamentos para queda de cabelo baseado em evidências científicas, revisado por dermatologistas.",
    sameAs: [],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function personSchema(author: Author): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/autores/${author.slug}#person`,
    name: author.name,
    url: `${SITE_URL}/autores/${author.slug}`,
    jobTitle: author.title,
    description: author.bio,
    knowsAbout: author.specialties,
    memberOf: author.affiliations.map((name) => ({ "@type": "Organization", name })),
    identifier: author.credentials,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(article: Article): JsonLd {
  const url = `${SITE_URL}/${article.categorySlug}/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: article.title,
    description: article.description,
    url,
    inLanguage: "pt-BR",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/autores/${article.author.slug}#person`,
      name: article.author.name,
      url: `${SITE_URL}/autores/${article.author.slug}`,
    },
    reviewedBy: article.medicalReviewer
      ? {
          "@type": "Person",
          "@id": `${SITE_URL}/autores/${article.medicalReviewer.slug}#person`,
          name: article.medicalReviewer.name,
          url: `${SITE_URL}/autores/${article.medicalReviewer.slug}`,
        }
      : undefined,
    publisher: { "@id": `${SITE_URL}/#organization` },
    keywords: article.tags.join(", "),
    about: article.category,
  };
}

export function itemListSchema(
  items: { title: string; url: string; description?: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.title,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function jsonLdScript(schema: JsonLd | JsonLd[]) {
  return {
    __html: JSON.stringify(schema),
  };
}

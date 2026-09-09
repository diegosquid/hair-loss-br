export interface Article {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  seoTitle?: string;
  image: string;
  imageAlt: string;
  toc: { id: string; title: string }[];
  correctionNote?: string;
  author: Author;
  medicalReviewer?: Author;
  category: string;
  tags: string[];
  featured?: boolean;
  readingTime: number;
  faq?: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Author {
  kind?: "Organization" | "Person";
  name: string;
  slug: string;
  title: string;
  credentials: string;
  bio: string;
  specialties: string[];
  affiliations: string[];
}

export interface Treatment {
  slug: string;
  name: string;
  category: 'medication' | 'procedure' | 'supplement' | 'device';
  description: string;
  efficacy: string;
  timeToResults: string;
  prescriptionRequired: boolean;
  priceRange: string;
}

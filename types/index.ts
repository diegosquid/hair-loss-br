export interface Article {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  medicalReviewer?: Author;
  category: string;
  tags: string[];
  featured?: boolean;
  readingTime: number;
}

export interface Author {
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

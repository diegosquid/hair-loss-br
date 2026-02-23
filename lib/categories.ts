export interface CategoryConfig {
  slug: string;
  name: string;
  label: string;
  description: string;
  accent: "forest" | "sage" | "terra";
  seoTitle: string;
  seoDescription: string;
}

export const categories: Record<string, CategoryConfig> = {
  medicamentos: {
    slug: "medicamentos",
    name: "Medicamentos",
    label: "Guia de Medicamentos",
    description:
      "Conheça os principais medicamentos para tratamento da queda de cabelo disponíveis no Brasil.",
    accent: "forest",
    seoTitle: "Medicamentos para Queda de Cabelo — Capilarmente",
    seoDescription:
      "Guia completo sobre medicamentos para queda de cabelo: minoxidil, finasterida, dutasterida e mais. Informações verificadas por dermatologistas.",
  },
  tratamentos: {
    slug: "tratamentos",
    name: "Tratamentos",
    label: "Guia de Tratamentos",
    description:
      "Procedimentos e terapias comprovados para restauração capilar no Brasil.",
    accent: "sage",
    seoTitle: "Tratamentos para Queda de Cabelo — Capilarmente",
    seoDescription:
      "Transplante capilar, PRP, laser e microagulhamento. Tratamentos com eficácia comprovada para queda de cabelo.",
  },
  causas: {
    slug: "causas",
    name: "Causas",
    label: "Causas da Queda de Cabelo",
    description:
      "Entenda as causas da queda de cabelo e como identificar o seu tipo de alopecia.",
    accent: "terra",
    seoTitle: "Causas da Queda de Cabelo — Capilarmente",
    seoDescription:
      "Alopecia androgenética, queda hormonal, estresse e nutrição. Entenda as causas da queda de cabelo e quando procurar ajuda.",
  },
  blog: {
    slug: "blog",
    name: "Blog",
    label: "Artigos e Guias",
    description:
      "Artigos e guias sobre queda de cabelo, tratamentos e cuidados capilares.",
    accent: "terra",
    seoTitle: "Blog — Capilarmente",
    seoDescription:
      "Artigos, guias práticos e dicas sobre queda de cabelo, calvície e cuidados capilares no Brasil.",
  },
};

export function getCategoryConfig(slug: string): CategoryConfig | undefined {
  return categories[slug];
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(categories);
}

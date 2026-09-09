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
    seoTitle: "Medicamentos para Queda de Cabelo",
    seoDescription:
      "Guia completo sobre medicamentos para queda de cabelo: minoxidil, finasterida, dutasterida e mais. Entenda usos, riscos e dúvidas para discutir em consulta.",
  },
  tratamentos: {
    slug: "tratamentos",
    name: "Tratamentos",
    label: "Guia de Tratamentos",
    description:
      "Conheça procedimentos e terapias capilares, suas evidências, riscos e custos.",
    accent: "sage",
    seoTitle: "Tratamentos para Queda de Cabelo",
    seoDescription:
      "Transplante capilar, PRP, laser e microagulhamento. Entenda as evidências e os limites de cada opção para queda de cabelo.",
  },
  causas: {
    slug: "causas",
    name: "Causas",
    label: "Causas da Queda de Cabelo",
    description:
      "Entenda as causas da queda de cabelo e quando procurar uma avaliação profissional.",
    accent: "terra",
    seoTitle: "Causas da Queda de Cabelo",
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
    seoTitle: "Blog",
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

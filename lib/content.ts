import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { Article, Author } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const authors: Record<string, Author> = {
  "dr-silva": {
    name: "Dr. Ricardo Silva",
    slug: "dr-silva",
    title: "Dermatologista",
    credentials: "CRM-SP 123456 | RQE 78901",
    bio: "Dermatologista com 15 anos de experiência em tricologia e tratamentos capilares. Membro da Sociedade Brasileira de Dermatologia.",
    specialties: ["Dermatologia", "Tricologia", "Alopecia"],
    affiliations: ["Sociedade Brasileira de Dermatologia", "American Academy of Dermatology"],
  },
  "dra-oliveira": {
    name: "Dra. Carolina Oliveira",
    slug: "dra-oliveira",
    title: "Endocrinologista",
    credentials: "CRM-RJ 654321 | RQE 10987",
    bio: "Endocrinologista especializada em distúrbios hormonais que afetam o cabelo. Pesquisadora em alopecia androgenética feminina.",
    specialties: ["Endocrinologia", "Dermatologia Hormonal", "Alopecia Feminina"],
    affiliations: ["Sociedade Brasileira de Endocrinologia", "International Society of Hair Restoration Surgery"],
  },
  "dr-santos": {
    name: "Dr. Fernando Santos",
    slug: "dr-santos",
    title: "Cirurgião Capilar",
    credentials: "CRM-SP 234567 | RQE 34567",
    bio: "Cirurgião especializado em transplante capilar com mais de 3.000 procedimentos FUE realizados. Membro da ISHRS.",
    specialties: ["Transplante Capilar", "Cirurgia FUE/FUT", "Restauração Capilar"],
    affiliations: ["International Society of Hair Restoration Surgery", "Associação Brasileira de Cirurgia da Restauração Capilar"],
  },
  "dra-costa": {
    name: "Dra. Mariana Costa",
    slug: "dra-costa",
    title: "Tricologista",
    credentials: "CRM-MG 345678 | RQE 45678",
    bio: "Tricologista com formação em dermatologia e especialização em diagnóstico capilar. Pesquisadora em novas terapias para alopecia.",
    specialties: ["Tricologia", "Diagnóstico Capilar", "Terapia com Laser"],
    affiliations: ["Sociedade Brasileira de Dermatologia", "World Trichology Society"],
  },
  "dr-almeida": {
    name: "Dr. Paulo Almeida",
    slug: "dr-almeida",
    title: "Dermatologista",
    credentials: "CRM-RJ 456789 | RQE 56789",
    bio: "Dermatologista com foco em alopecia androgenética e terapias farmacológicas. Professor associado com publicações em periódicos internacionais.",
    specialties: ["Farmacologia Dermatológica", "Alopecia Androgenética", "Pesquisa Clínica"],
    affiliations: ["Sociedade Brasileira de Dermatologia", "European Academy of Dermatology and Venereology"],
  },
  "dra-lima": {
    name: "Dra. Juliana Lima",
    slug: "dra-lima",
    title: "Nutrologista",
    credentials: "CRM-SP 567890 | RQE 67890",
    bio: "Nutrologista especializada na relação entre nutrição e saúde capilar. Experiência em tratamentos integradores para queda de cabelo.",
    specialties: ["Nutrologia", "Nutrição Capilar", "Suplementação"],
    affiliations: ["Associação Brasileira de Nutrologia", "International Society of Dermatology"],
  },
};

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const categories = fs.readdirSync(CONTENT_DIR).filter((name) => {
    return fs.statSync(path.join(CONTENT_DIR, name)).isDirectory();
  });

  const articles: Article[] = [];

  for (const categorySlug of categories) {
    const categoryDir = path.join(CONTENT_DIR, categorySlug);
    const files = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.mdx?$/, "");
      const article = parseArticleFile(categorySlug, slug);
      if (article) articles.push(article);
    }
  }

  return articles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter((a) => a.categorySlug === categorySlug);
}

export function getArticleBySlug(categorySlug: string, slug: string): Article | undefined {
  return parseArticleFile(categorySlug, slug);
}

function parseArticleFile(categorySlug: string, slug: string): Article | undefined {
  const extensions = [".mdx", ".md"];
  let filePath: string | null = null;

  for (const ext of extensions) {
    const candidate = path.join(CONTENT_DIR, categorySlug, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const htmlContent = marked(content) as string;

  const author = authors[data.author as string] ?? authors["dr-silva"];
  const medicalReviewer = data.medicalReviewer
    ? authors[data.medicalReviewer as string]
    : undefined;

  const wordCount = content.split(/\s+/).length;
  const readingTime = data.readingTime ?? Math.ceil(wordCount / 200);

  return {
    slug,
    categorySlug,
    title: data.title as string,
    description: data.description as string,
    content: htmlContent,
    publishedAt: data.publishedAt as string,
    updatedAt: data.updatedAt as string | undefined,
    author,
    medicalReviewer,
    category: data.category as string,
    tags: (data.tags as string[]) ?? [],
    featured: (data.featured as boolean) ?? false,
    readingTime,
  };
}

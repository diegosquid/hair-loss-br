import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { Article, Author, FaqItem } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const authors: Record<string, Author> = {
  "equipe-editorial": {
    kind: "Organization",
    name: "Redação Capilarmente",
    slug: "equipe-editorial",
    title: "Publicação independente",
    credentials: "",
    bio: "Conteúdo editorial produzido com apoio de ferramentas de inteligência artificial e consulta às fontes indicadas em cada artigo. Não declaramos revisão médica independente para este conteúdo.",
    specialties: ["Informação sobre queda de cabelo", "Comparação de custos", "Cuidados capilares"],
    affiliations: [],
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

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = getAllArticles().filter(
    (a) => !(a.categorySlug === article.categorySlug && a.slug === article.slug),
  );

  const tagSet = new Set(article.tags);

  const scored = all.map((candidate) => {
    const sharedTags = candidate.tags.filter((t) => tagSet.has(t)).length;
    const sameCategory = candidate.categorySlug === article.categorySlug ? 1 : 0;
    return { article: candidate, score: sharedTags * 2 + sameCategory };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return getAllArticles().filter((a) => a.author.slug === authorSlug);
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

  // The page template owns H1. Keep article headings at H2 or below.
  const body = content.replace(/^# .+\r?\n+/m, "");
  let htmlContent = marked(body) as string;
  const usedIds = new Map<string, number>();
  const toc: { id: string; title: string }[] = [];
  htmlContent = htmlContent.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const title = inner.replace(/<[^>]*>/g, "");
    const base = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "secao";
    const count = usedIds.get(base) ?? 0;
    usedIds.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    toc.push({ id, title });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  const author = authors[data.author as string] ?? authors["equipe-editorial"];
  const medicalReviewer = undefined; // No independently verified medical reviewers registered.

  const wordCount = content.split(/\s+/).length;
  const readingTime = data.readingTime ?? Math.ceil(wordCount / 200);

  return {
    slug,
    categorySlug,
    title: data.title as string,
    seoTitle: data.seoTitle as string | undefined,
    image: `/images/articles/${categorySlug}-${slug}.png`,
    imageAlt: `Guia ilustrado: ${data.title}`,
    toc,
    correctionNote: data.correctionNote as string | undefined,
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
    faq: (data.faq as FaqItem[] | undefined) ?? undefined,
  };
}

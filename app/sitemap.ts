import type { MetadataRoute } from "next";
import { getAllArticles, authors } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://capilarmente.com.br";

const STATIC_PAGES = [
  { path: "", priority: 1.0, changefreq: "weekly" },
  { path: "tratamentos", priority: 0.9, changefreq: "weekly" },
  { path: "medicamentos", priority: 0.9, changefreq: "weekly" },
  { path: "causas", priority: 0.8, changefreq: "weekly" },
  { path: "blog", priority: 0.8, changefreq: "daily" },
  { path: "avaliacao", priority: 0.9, changefreq: "monthly" },
  { path: "autores", priority: 0.5, changefreq: "monthly" },
  { path: "sobre", priority: 0.5, changefreq: "monthly" },
  { path: "editorial", priority: 0.3, changefreq: "monthly" },
  { path: "privacidade", priority: 0.3, changefreq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const today = new Date().toISOString().split("T")[0];

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}/${page.path}`,
    lastModified: today,
    changeFrequency: page.changefreq as "weekly" | "monthly" | "daily",
    priority: page.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/${article.categorySlug}/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const authorEntries: MetadataRoute.Sitemap = Object.keys(authors).map((slug) => ({
    url: `${BASE_URL}/autores/${slug}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticEntries, ...articleEntries, ...authorEntries];
}

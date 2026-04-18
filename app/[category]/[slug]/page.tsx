import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/lib/content";
import { getCategoryConfig } from "@/lib/categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  SITE_URL,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLdScript,
} from "@/lib/schema";

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.category, params.slug);
  if (!article) return {};

  const url = `/${params.category}/${params.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${SITE_URL}${url}`,
      locale: "pt_BR",
      siteName: "Capilarmente",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [`${SITE_URL}/autores/${article.author.slug}`],
      tags: article.tags,
    },
    authors: [{ name: article.author.name, url: `${SITE_URL}/autores/${article.author.slug}` }],
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.category, params.slug);

  if (!article) {
    notFound();
  }

  const categoryConfig = getCategoryConfig(params.category);
  const categoryName = categoryConfig?.name ?? article.category;
  const related = getRelatedArticles(article, 3);

  const schemas = [
    articleSchema(article),
    breadcrumbSchema([
      { name: "Início", url: `${SITE_URL}/` },
      { name: categoryName, url: `${SITE_URL}/${params.category}` },
      { name: article.title, url: `${SITE_URL}/${params.category}/${params.slug}` },
    ]),
    ...(article.faq && article.faq.length > 0 ? [faqSchema(article.faq)] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schemas)}
      />
      <Header />
      <main className="pt-28 pb-24">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-warm-400 mb-8">
            <Link href="/" className="hover:text-forest-600 transition-colors">Inicio</Link>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${params.category}`} className="hover:text-forest-600 transition-colors capitalize">
              {article.category}
            </Link>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-warm-500 truncate">{article.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="badge-green">{article.category}</span>
              <time
                dateTime={article.publishedAt}
                className="text-warm-400 text-[13px]"
              >
                {new Date(article.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              {article.updatedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-warm-300" />
                  <time dateTime={article.updatedAt} className="text-warm-400 text-[13px]">
                    Atualizado: {new Date(article.updatedAt).toLocaleDateString("pt-BR")}
                  </time>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-warm-950 leading-[1.1] mb-5">
              {article.title}
            </h1>

            <p className="text-xl text-warm-500 leading-relaxed font-light">{article.description}</p>
          </header>

          {/* Author card */}
          <Link
            href={`/autores/${article.author.slug}`}
            className="flex items-center gap-4 p-5 bg-sage-50/60 rounded-2xl border border-sage-200/40 mb-10 hover:bg-sage-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-forest-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-warm-900 text-[15px]">{article.author.name}</p>
              <p className="text-[13px] text-warm-500">{article.author.credentials}</p>
            </div>
          </Link>

          {/* Content */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-14 pt-8 border-t border-warm-200">
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-warm-400 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-[13px] font-medium bg-warm-100 text-warm-600 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <aside className="mt-14 pt-8 border-t border-warm-200" aria-label="Artigos relacionados">
              <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-warm-400 mb-5">
                Artigos relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={`${r.categorySlug}-${r.slug}`}
                    href={`/${r.categorySlug}/${r.slug}`}
                    className="group block p-5 rounded-2xl border border-warm-200/60 hover:border-forest-300 hover:bg-forest-50/30 transition-colors"
                  >
                    <span className="text-[11px] font-medium tracking-wider uppercase text-forest-600">
                      {r.category}
                    </span>
                    <h3 className="mt-2 text-[15px] font-display font-semibold text-warm-900 leading-snug group-hover:text-forest-700 transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-warm-500 line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          )}

          {/* Medical Disclaimer */}
          <div className="mt-8 p-5 bg-terra-50/50 rounded-2xl border border-terra-200/30">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-terra-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-[14px] text-warm-600 leading-relaxed">
                <strong className="text-warm-800">Aviso medico:</strong> Este conteudo e informativo e nao substitui consulta com dermatologista ou medico especialista. Sempre procure orientacao profissional antes de iniciar qualquer tratamento.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    category: a.categorySlug,
    slug: a.slug,
  }));
}

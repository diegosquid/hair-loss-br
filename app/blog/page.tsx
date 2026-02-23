import { getAllArticles } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Page header */}
          <div className="text-center mb-14">
            <div className="section-label justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-terra-400" />
              Artigos e Guias
            </div>
            <h1 className="section-title">Blog</h1>
            <p className="section-subtitle mx-auto">
              Artigos e guias sobre queda de cabelo, tratamentos e cuidados capilares.
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={`${article.categorySlug}-${article.slug}`}
                href={`/${article.categorySlug}/${article.slug}`}
                className="group"
              >
                <div className="card h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge-green">{article.category}</span>
                    <span className="text-[12px] text-warm-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readingTime} min
                    </span>
                  </div>

                  <h2 className="text-lg font-display font-bold text-warm-900 mb-2 group-hover:text-forest-700 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-warm-500 text-[14px] leading-relaxed mb-5 line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between text-[13px] text-warm-400 pt-4 border-t border-warm-100">
                    <span className="font-medium">{article.author.name}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {articles.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sage-50 text-sage-500 mb-5">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-warm-800 mb-2">Nenhum artigo ainda</h3>
              <p className="text-warm-500">Em breve teremos artigos para voce.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

import { getArticlesByCategory } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function MedicamentosPage() {
  const articles = getArticlesByCategory("medicamentos");

  return (
    <>
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Page header */}
          <div className="text-center mb-14">
            <div className="section-label justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
              Guia de Medicamentos
            </div>
            <h1 className="section-title">Medicamentos</h1>
            <p className="section-subtitle mx-auto">
              Conheca os principais medicamentos para tratamento da queda de cabelo disponiveis no Brasil.
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/medicamentos/${article.slug}`}
                className="group"
              >
                <div className="card h-full hover:-translate-y-1 transition-transform duration-300">
                  <h2 className="text-2xl font-display font-bold text-warm-900 mb-3 group-hover:text-forest-700 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-warm-500 text-[15px] leading-relaxed mb-5">{article.description}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[12px] font-medium bg-sage-50 text-sage-700 border border-sage-200/50 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-warm-800 mb-2">Conteudo em breve</h3>
              <p className="text-warm-500">Estamos preparando guias detalhados sobre medicamentos.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

import { getArticlesByCategory } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function MedicamentosPage() {
  const articles = getArticlesByCategory("medicamentos");

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="section-title">Medicamentos</h1>
            <p className="section-subtitle mx-auto">
              Conheça os principais medicamentos para tratamento da queda de cabelo disponíveis no Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/medicamentos/${article.slug}`}
                className="group"
              >
                <div className="card h-full">
                  <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-navy-400 mb-4">{article.description}</p>
                  
                  <div className="flex items-center gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-navy-800 text-navy-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { getAllArticles } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="section-title">Blog</h1>
            <p className="section-subtitle mx-auto">
              Artigos e guias sobre queda de cabelo, tratamentos e cuidados capilares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={`${article.categorySlug}-${article.slug}`}
                href={`/${article.categorySlug}/${article.slug}`}
                className="group"
              >
                <div className="card h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-navy-500">
                      {article.readingTime} min
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-navy-400 text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-navy-500">
                    <span>{article.author.name}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
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

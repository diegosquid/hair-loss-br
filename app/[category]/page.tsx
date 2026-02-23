import { getArticlesByCategory } from "@/lib/content";
import { getCategoryConfig, getAllCategorySlugs } from "@/lib/categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: {
    category: string;
  };
}

const ACCENT_DOT: Record<string, string> = {
  forest: "bg-forest-500",
  sage: "bg-sage-500",
  terra: "bg-terra-400",
};

const ACCENT_BADGE: Record<string, string> = {
  forest: "bg-forest-50 text-forest-700 border-forest-200/50",
  sage: "bg-sage-50 text-sage-700 border-sage-200/50",
  terra: "bg-terra-50 text-terra-700 border-terra-200/50",
};

export function generateStaticParams() {
  return getAllCategorySlugs()
    .filter((slug) => slug !== "blog")
    .map((slug) => ({ category: slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const config = getCategoryConfig(params.category);
  if (!config) return {};
  return {
    title: config.seoTitle,
    description: config.seoDescription,
  };
}

export default function CategoryPage({ params }: Props) {
  const config = getCategoryConfig(params.category);

  if (!config || params.category === "blog") {
    notFound();
  }

  const articles = getArticlesByCategory(params.category);
  const dotClass = ACCENT_DOT[config.accent] ?? "bg-forest-500";
  const badgeClass = ACCENT_BADGE[config.accent] ?? ACCENT_BADGE.forest;

  return (
    <>
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Page header */}
          <div className="text-center mb-14">
            <div className="section-label justify-center">
              <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
              {config.label}
            </div>
            <h1 className="section-title">{config.name}</h1>
            <p className="section-subtitle mx-auto">{config.description}</p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${params.category}/${article.slug}`}
                className="group"
              >
                <div className="card h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${badgeClass}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-[12px] text-warm-400 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {article.readingTime} min
                    </span>
                  </div>

                  <h2 className="text-xl font-display font-bold text-warm-900 mb-3 group-hover:text-forest-700 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-warm-500 text-[14.5px] leading-relaxed mb-5">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[12px] font-medium bg-warm-100 text-warm-600 rounded-full"
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
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-warm-800 mb-2">
                Conteúdo em breve
              </h3>
              <p className="text-warm-500">
                Estamos preparando guias detalhados para esta seção.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

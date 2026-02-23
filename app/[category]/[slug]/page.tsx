import { getArticleBySlug } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.category, params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-primary-500/20 text-primary-300 rounded-full">
                {article.category}
              </span>
              <span className="text-navy-500">•</span>
              <span className="text-navy-400 text-sm">
                {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
              </span>
              {article.updatedAt && (
                <>
                  <span className="text-navy-500">•</span>
                  <span className="text-navy-400 text-sm">
                    Atualizado: {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>

            <p className="text-xl text-navy-400">{article.description}</p>
          </header>

          {/* Author */}
          <div className="flex items-center gap-4 p-4 bg-navy-900/50 rounded-xl border border-navy-800 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
              <span className="text-xl">👨‍⚕️</span>
            </div>
            <div>
              <p className="font-medium text-white">{article.author.name}</p>
              <p className="text-sm text-navy-400">{article.author.credentials}</p>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-semibold
              prose-p:text-navy-300 prose-p:leading-relaxed
              prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-navy-300 prose-ol:text-navy-300
              prose-li:marker:text-primary-500
              prose-blockquote:border-primary-500 prose-blockquote:bg-navy-900/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-hr:border-navy-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-navy-800">
            <h3 className="text-sm font-medium text-navy-400 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-navy-800 text-navy-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-8 p-4 bg-navy-900/50 rounded-xl border border-navy-800">
            <p className="text-sm text-navy-400">
              <strong className="text-navy-300">Aviso médico:</strong> Este conteúdo é informativo e não substitui consulta com dermatologista ou médico especialista. Sempre procure orientação profissional antes de iniciar qualquer tratamento.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  // Return empty array - Next.js will generate params at build time
  return [];
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { authors, getArticlesByAuthor } from "@/lib/content";
import { SITE_URL, personSchema, breadcrumbSchema, jsonLdScript } from "@/lib/schema";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const author = authors[params.slug];
  if (!author) return {};
  const url = `/autores/${params.slug}`;
  return {
    title: `${author.name} — ${author.title}`,
    description: author.bio,
    alternates: { canonical: url },
    openGraph: {
      title: `${author.name} — ${author.title}`,
      description: author.bio,
      type: "profile",
      url: `${SITE_URL}${url}`,
      locale: "pt_BR",
      siteName: "Capilarmente",
    },
  };
}

export default function AuthorPage({ params }: Props) {
  const author = authors[params.slug];
  if (!author) notFound();

  const articles = getArticlesByAuthor(params.slug);

  const schemas = [
    personSchema(author),
    breadcrumbSchema([
      { name: "Início", url: `${SITE_URL}/` },
      { name: "Equipe", url: `${SITE_URL}/autores` },
      { name: author.name, url: `${SITE_URL}/autores/${params.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schemas)}
      />
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-warm-400 mb-8">
            <Link href="/" className="hover:text-forest-600 transition-colors">Inicio</Link>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/autores" className="hover:text-forest-600 transition-colors">Equipe</Link>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-warm-500 truncate">{author.name}</span>
          </nav>

          <header className="mb-10">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 text-forest-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-warm-950 leading-tight">
                  {author.name}
                </h1>
                <p className="text-forest-600 font-medium mt-1">{author.title}</p>
                <p className="text-[13px] text-warm-400 mt-1">{author.credentials}</p>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-warm-400 mb-3">Biografia</h2>
            <p className="text-warm-600 leading-relaxed">{author.bio}</p>
          </section>

          {author.specialties.length > 0 && (
            <section className="mb-12">
              <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-warm-400 mb-3">Especialidades</h2>
              <div className="flex flex-wrap gap-2">
                {author.specialties.map((s) => (
                  <span key={s} className="px-3 py-1.5 text-[13px] font-medium bg-warm-100 text-warm-600 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {author.affiliations.length > 0 && (
            <section className="mb-12">
              <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-warm-400 mb-3">Afiliações</h2>
              <ul className="space-y-2">
                {author.affiliations.map((a) => (
                  <li key={a} className="text-warm-600 text-[14.5px]">• {a}</li>
                ))}
              </ul>
            </section>
          )}

          {articles.length > 0 && (
            <section className="mt-14 pt-8 border-t border-warm-200">
              <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-warm-400 mb-5">
                Artigos de {author.name}
              </h2>
              <div className="space-y-3">
                {articles.map((a) => (
                  <Link
                    key={`${a.categorySlug}-${a.slug}`}
                    href={`/${a.categorySlug}/${a.slug}`}
                    className="group block p-5 rounded-2xl border border-warm-200/60 hover:border-forest-300 hover:bg-forest-50/30 transition-colors"
                  >
                    <span className="text-[11px] font-medium tracking-wider uppercase text-forest-600">
                      {a.category}
                    </span>
                    <h3 className="mt-2 text-[16px] font-display font-semibold text-warm-900 group-hover:text-forest-700 transition-colors leading-snug">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-warm-500 leading-relaxed line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

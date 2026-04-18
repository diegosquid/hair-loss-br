import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { authors } from "@/lib/content";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Nossa Equipe — Dermatologistas e Especialistas",
  description:
    "Conheça os dermatologistas, endocrinologistas e tricologistas que revisam o conteúdo da Capilarmente.",
  alternates: { canonical: "/autores" },
  openGraph: {
    title: "Equipe Capilarmente",
    description: "Especialistas que revisam nosso conteúdo médico.",
    type: "website",
    url: `${SITE_URL}/autores`,
    locale: "pt_BR",
    siteName: "Capilarmente",
  },
};

export default function AutoresPage() {
  const list = Object.values(authors);

  return (
    <>
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <div className="section-label justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
              Equipe Médica
            </div>
            <h1 className="section-title">Nossa equipe</h1>
            <p className="section-subtitle mx-auto">
              Dermatologistas, endocrinologistas e tricologistas que escrevem e revisam o conteúdo da Capilarmente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((author) => (
              <Link
                key={author.slug}
                href={`/autores/${author.slug}`}
                className="group card hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-forest-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-display font-bold text-warm-900 group-hover:text-forest-700 transition-colors">
                      {author.name}
                    </h2>
                    <p className="text-[13px] text-forest-600 font-medium mt-0.5">{author.title}</p>
                    <p className="text-[12px] text-warm-400 mt-1">{author.credentials}</p>
                    <p className="text-[14px] text-warm-500 mt-3 leading-relaxed line-clamp-3">
                      {author.bio}
                    </p>
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

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AvaliacaoWizard from "@/components/avaliacao/AvaliacaoWizard";

export const metadata: Metadata = {
  title: "Avaliação Capilar Gratuita — Capilarmente",
  description:
    "Faça uma avaliação personalizada da sua queda de cabelo em 5 minutos. Identifique as possíveis causas, severidade e receba recomendações de tratamento baseadas no seu perfil.",
  keywords: [
    "avaliação capilar",
    "teste queda de cabelo",
    "escala norwood",
    "escala ludwig",
    "alopecia teste",
    "calvície grau",
    "diagnóstico capilar online",
  ],
  openGraph: {
    title: "Avaliação Capilar Gratuita — Capilarmente",
    description:
      "Descubra em 5 minutos a severidade da sua queda de cabelo e receba recomendações personalizadas de tratamento.",
    type: "website",
  },
};

export default function AvaliacaoPage() {
  return (
    <>
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden pt-8 pb-6 md:pt-12 md:pb-8">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sage-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="max-w-3xl mx-auto px-5 text-center">
          <span className="section-label justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Avaliação Gratuita
          </span>
          <h1 className="section-title !mb-4">
            Avaliação Capilar{" "}
            <span className="gradient-text">Personalizada</span>
          </h1>
          <p className="section-subtitle mx-auto !mb-6">
            Responda 12 perguntas em 5 minutos e receba uma análise completa da
            sua situação capilar — com diagnósticos possíveis, severidade e um
            plano de ação personalizado.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-warm-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              100% Privado
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 Minutos
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Base Científica
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Sem Cadastro
            </div>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="max-w-3xl mx-auto px-5 pb-20">
        <AvaliacaoWizard />
      </section>
      <Footer />
    </>
  );
}

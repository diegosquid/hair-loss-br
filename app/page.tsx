import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Base Cientifica",
    description: "Tratamentos com eficacia comprovada em estudos clinicos revisados por pares",
    accent: "forest",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Verificado por Medicos",
    description: "Conteudo revisado por dermatologistas e tricologistas especializados",
    accent: "sage",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Foco no Brasil",
    description: "Precos, disponibilidade e regulamentacao ANVISA para o mercado brasileiro",
    accent: "terra",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Resultados Reais",
    description: "Expectativas realistas com dados de estudos clinicos brasileiros e internacionais",
    accent: "forest",
  },
];

const TREATMENTS = [
  {
    title: "Minoxidil",
    description: "O tratamento topico mais popular para queda de cabelo. Estimula o crescimento capilar e freia a queda progressiva.",
    href: "/medicamentos/minoxidil",
    tag: "Mais Popular",
    tagColor: "badge-green",
    stat: "80%",
    statLabel: "eficacia",
  },
  {
    title: "Finasterida",
    description: "Bloqueia a DHT, hormonio responsavel pela calvicie. Resultados comprovados em estudos clinicos de longo prazo.",
    href: "/medicamentos/finasterida",
    tag: "Prescricao",
    tagColor: "badge-terra",
    stat: "90%",
    statLabel: "sucesso",
  },
  {
    title: "Transplante Capilar",
    description: "Solucao definitiva para areas sem cabelo. Tecnicas modernas como FUE e FUT com resultados naturais.",
    href: "/tratamentos/transplante-capilar",
    tag: "Cirurgico",
    tagColor: "badge-sage",
    stat: "95%",
    statLabel: "satisfacao",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 bg-hero-mesh" />

          {/* Decorative floating shapes */}
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-forest-500/[0.04] blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-terra-400/[0.04] blur-3xl animate-pulse-soft [animation-delay:1.5s]" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(31,74,47,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(31,74,47,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-32 md:py-40">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-forest-50/80 border border-forest-200/50 mb-8">
                <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
                <span className="text-[13px] font-medium text-forest-700 tracking-wide">
                  Baseado em evidencias cientificas
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-bold leading-[1.05] tracking-tight text-warm-950 mb-7">
                Recupere sua{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">autoestima</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-forest-300/30" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 8c50-8 100-8 196 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <br />
                capilar
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-warm-500 max-w-xl leading-relaxed mb-10 font-light">
                Guia completo sobre tratamentos para queda de cabelo no Brasil.
                Informacoes verificadas por dermatologistas sobre minoxidil,
                finasterida e mais.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/tratamentos" className="btn-primary group">
                  Ver Tratamentos
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/avaliacao" className="btn-secondary">
                  Fazer Avaliacao
                </Link>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-0 max-w-2xl">
              {[
                { value: "15M+", label: "Brasileiros afetados" },
                { value: "80%", label: "Eficacia do minoxidil" },
                { value: "90%", label: "Sucesso finasterida" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-5">
                  {i > 0 && <div className="hidden sm:block w-px h-12 bg-warm-200/80 mr-5" />}
                  <div>
                    <div className="text-3xl md:text-4xl font-display font-bold text-forest-700">
                      {stat.value}
                    </div>
                    <div className="text-[13px] text-warm-400 mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FEATURES ═══════ */}
        <section className="py-24 md:py-32 bg-section-warm relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="text-center mb-16">
              <div className="section-label justify-center">
                <div className="w-5 h-px bg-forest-400" />
                Por que confiar
                <div className="w-5 h-px bg-forest-400" />
              </div>
              <h2 className="section-title">
                Informacao que voce <span className="gradient-text">pode confiar</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="card group text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 transition-colors duration-300
                    ${feature.accent === "forest" ? "bg-forest-50 text-forest-600 group-hover:bg-forest-100" : ""}
                    ${feature.accent === "sage" ? "bg-sage-50 text-sage-600 group-hover:bg-sage-100" : ""}
                    ${feature.accent === "terra" ? "bg-terra-50 text-terra-600 group-hover:bg-terra-100" : ""}
                  `}>
                    {feature.icon}
                  </div>
                  <h3 className="text-[17px] font-display font-semibold text-warm-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[14.5px] text-warm-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ TREATMENTS ═══════ */}
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <div className="section-label">
                  <div className="w-1.5 h-1.5 rounded-full bg-terra-400" />
                  Tratamentos
                </div>
                <h2 className="section-title mb-0">Principais Tratamentos</h2>
                <p className="section-subtitle mt-4">
                  Opcoes mais eficazes com resultados comprovados cientificamente.
                </p>
              </div>
              <Link
                href="/tratamentos"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-forest-600 hover:text-forest-700 transition-colors shrink-0"
              >
                Ver todos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TREATMENTS.map((treatment) => (
                <Link key={treatment.title} href={treatment.href} className="group">
                  <div className="card h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={treatment.tagColor}>{treatment.tag}</span>
                      <div className="text-right">
                        <div className="text-2xl font-display font-bold text-forest-700">
                          {treatment.stat}
                        </div>
                        <div className="text-[11px] text-warm-400 uppercase tracking-wider">
                          {treatment.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-bold text-warm-900 group-hover:text-forest-700 transition-colors mb-3">
                      {treatment.title}
                    </h3>
                    <p className="text-[14.5px] text-warm-500 leading-relaxed mb-5 flex-1">
                      {treatment.description}
                    </p>

                    {/* Bottom link */}
                    <div className="flex items-center gap-2 text-[13.5px] font-medium text-forest-600 group-hover:text-forest-700 transition-colors pt-4 border-t border-warm-100">
                      Saiba mais
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-forest-800" />
          <div className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0, transparent 50%)",
            }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8">
              <svg className="w-4 h-4 text-terra-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="text-[13px] font-medium text-white/80">Avaliacao personalizada</span>
            </div>

            <h2 className="text-3xl md:text-[2.75rem] font-display font-bold text-white mb-5 leading-[1.1]">
              Nao sabe por onde comecar?
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed font-light">
              Faca nossa avaliacao gratuita e descubra qual tratamento e mais indicado para o seu tipo de queda de cabelo.
            </p>

            <Link
              href="/avaliacao"
              className="inline-flex items-center gap-3 px-8 py-4 text-[15px] font-semibold text-forest-900 bg-white rounded-full hover:bg-cream-100 shadow-soft-lg hover:shadow-soft transition-all duration-300 hover:-translate-y-[1px]"
            >
              Iniciar Avaliacao Gratis
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

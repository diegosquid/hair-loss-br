import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const FEATURES = [
  {
    icon: "💊",
    title: "Medicamentos Comprovados",
    description: "Minoxidil, finasterida e outros tratamentos com base científica",
  },
  {
    icon: "🔬",
    title: "Informações Verificadas",
    description: "Conteúdo revisado por especialistas em dermatologia",
  },
  {
    icon: "🇧🇷",
    title: "Foco no Brasil",
    description: "Preços, disponibilidade e regulamentação ANVISA",
  },
  {
    icon: "📊",
    title: "Resultados Reais",
    description: "Estudos clínicos e expectativas realistas de tratamento",
  },
];

const TREATMENTS = [
  {
    title: "Minoxidil",
    description: "O tratamento tópico mais popular para queda de cabelo. Estimula o crescimento capilar e freia a queda.",
    href: "/medicamentos/minoxidil",
    tag: "Mais Popular",
  },
  {
    title: "Finasterida",
    description: "Bloqueia a DHT, hormônio responsável pela calvície hormonal. Resultados comprovados em estudos clínicos.",
    href: "/medicamentos/finasterida",
    tag: "Prescrição",
  },
  {
    title: "Transplante Capilar",
    description: "Solução definitiva para áreas sem cabelo. Técnicas modernas como FUE e FUT.",
    href: "/tratamentos/transplante-capilar",
    tag: "Cirúrgico",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-hero-gradient"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          
          {/* Glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/50 border border-navy-700 mb-8">
              <span className="w-2 h-2 rounded-full bg-growth-400 animate-pulse"></span>
              <span className="text-sm text-navy-300">Baseado em evidências científicas</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Recupere sua
              <br />
              <span className="gradient-text">autoestima capilar</span>
            </h1>

            <p className="text-lg md:text-xl text-navy-300 max-w-2xl mx-auto mb-10">
              Guia completo sobre tratamentos para queda de cabelo no Brasil. 
              Informações verificadas por dermatologistas sobre minoxidil, finasterida e mais.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tratamentos" className="btn-primary w-full sm:w-auto">
                Ver Tratamentos
              </Link>
              <Link href="/avaliacao" className="btn-secondary w-full sm:w-auto">
                Fazer Avaliação
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              {[
                { value: "80%", label: "Eficácia do minoxidil" },
                { value: "90%", label: "Sucesso finasterida" },
                { value: "15M+", label: "Brasileiros afetados" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-navy-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-navy-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="card text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-navy-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatments Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Principais Tratamentos</h2>
              <p className="section-subtitle mx-auto">
                Conheça as opções mais eficazes para combater a queda de cabelo, 
                com resultados comprovados cientificamente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TREATMENTS.map((treatment) => (
                <Link key={treatment.title} href={treatment.href} className="group">
                  <div className="card h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {treatment.title}
                      </h3>
                      <span className="px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full">
                        {treatment.tag}
                      </span>
                    </div>
                    <p className="text-navy-400 mb-4">{treatment.description}</p>
                    
                    <div className="flex items-center text-primary-400 text-sm font-medium">
                      Saiba mais
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-900/50 to-navy-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Não sabe por onde começar?
            </h2>
            <p className="text-navy-300 text-lg mb-8 max-w-2xl mx-auto">
              Faça nossa avaliação gratuita e descubra qual tratamento é mais indicado para o seu tipo de queda de cabelo.
            </p>
            <Link href="/avaliacao" className="btn-primary inline-flex">
              Iniciar Avaliação Grátis
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

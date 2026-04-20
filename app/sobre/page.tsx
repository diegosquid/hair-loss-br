import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sobre o Capilarmente",
  description:
    "Conheça a missão do Capilarmente — portal brasileiro de conteúdo sobre queda de cabelo baseado em evidências científicas, revisado por dermatologistas.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre o Capilarmente",
    description: "Portal independente sobre queda de cabelo, revisado por dermatologistas.",
    type: "website",
    url: `${SITE_URL}/sobre`,
    locale: "pt_BR",
    siteName: "Capilarmente",
  },
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-warm-400 mb-8">
            <Link href="/" className="hover:text-forest-600 transition-colors">Inicio</Link>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-warm-500">Sobre</span>
          </nav>

          <header className="mb-12">
            <div className="section-label">
              <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
              Quem somos
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-warm-950 leading-[1.1] mb-5">
              Sobre o Capilarmente
            </h1>
            <p className="text-xl text-warm-500 leading-relaxed font-light">
              Um portal independente sobre queda de cabelo, feito por brasileiros, com
              base em evidências científicas e revisão médica.
            </p>
          </header>

          <div className="prose-custom space-y-6">
            <section>
              <h2>Nossa missão</h2>
              <p>
                O Capilarmente nasceu da constatação de que a informação sobre queda
                de cabelo no Brasil é dominada por duas vozes: a da publicidade de
                produtos e a do alarmismo nas redes sociais. Entre as duas,
                falta o meio-termo — conteúdo profundo, atualizado, com citações
                rastreáveis e linguagem acessível.
              </p>
              <p>
                Nosso objetivo é preencher essa lacuna. Cada artigo deve responder,
                com honestidade, a três perguntas que um paciente faz ao dermatologista:
                <strong> o que é, o que funciona, e o que eu posso fazer agora?</strong>
              </p>
            </section>

            <section>
              <h2>Como produzimos conteúdo</h2>
              <p>
                Todo artigo publicado no Capilarmente passa por três camadas:
              </p>
              <ul>
                <li>
                  <strong>Pesquisa baseada em evidência</strong> — consultamos PubMed,
                  Cochrane, guidelines de sociedades médicas (SBD, AAD, ISHRS) e
                  documentos regulatórios (ANVISA, FDA) para fundamentar cada afirmação.
                  Cada dado numérico vem acompanhado de citação rastreável com DOI.
                </li>
                <li>
                  <strong>Redação por especialista</strong> — os artigos são atribuídos
                  a profissionais de cada área específica: dermatologistas para
                  medicamentos tópicos e orais, endocrinologista para causas hormonais,
                  cirurgião capilar para transplantes, nutrólogo para temas alimentares.
                  Conheça a equipe em <Link href="/autores">autores</Link>.
                </li>
                <li>
                  <strong>Revisão médica cruzada</strong> — cada artigo é lido por um
                  segundo especialista de área complementar antes da publicação, para
                  detectar erros e omissões.
                </li>
              </ul>
              <p>
                O processo completo de produção editorial está descrito na nossa{" "}
                <Link href="/editorial">política editorial</Link>.
              </p>
            </section>

            <section>
              <h2>Independência editorial</h2>
              <p>
                Não aceitamos pagamento para indicar, omitir ou distorcer conteúdo.
                Não somos clínica, farmácia ou fabricante — somos uma publicação
                independente. Quando, no futuro, houver links de afiliado em alguns
                artigos, eles aparecerão com transparência total e disclosure visível,
                conforme orientações do CONAR e práticas éticas de jornalismo de saúde.
              </p>
              <p>
                Nossa prioridade é a confiança do leitor. Artigos permanecem
                cientificamente sólidos independentemente de haver ou não link
                comercial associado.
              </p>
            </section>

            <section>
              <h2>Foco no Brasil</h2>
              <p>
                Muitos artigos sobre queda de cabelo em português brasileiro são
                traduções literais de conteúdo norte-americano ou europeu, com
                preços, regulamentações e disponibilidade que não fazem sentido
                aqui. O Capilarmente se compromete a:
              </p>
              <ul>
                <li>Citar <strong>preços em reais</strong> atualizados por mês/ano de referência</li>
                <li>Informar <strong>status ANVISA</strong> de cada medicamento</li>
                <li>Listar <strong>nomes comerciais disponíveis no mercado nacional</strong></li>
                <li>Considerar <strong>particularidades brasileiras</strong> — manipulação farmacêutica, acesso a especialistas, cobertura por planos de saúde</li>
                <li>Referenciar <strong>estudos brasileiros</strong> (HCFMUSP, UNIFESP, UFRJ) quando existirem sobre o tema</li>
              </ul>
            </section>

            <section>
              <h2>O que não somos</h2>
              <p>
                O Capilarmente é <strong>conteúdo informativo</strong>, não consulta
                médica. Nenhum artigo, avaliação online ou FAQ substitui a avaliação
                presencial de um dermatologista qualificado. Nosso papel é preparar
                você para ter uma consulta mais produtiva — não substituí-la.
              </p>
              <p>
                Também não vendemos medicamentos, dispositivos, procedimentos ou
                consultas. Se algum dia oferecermos serviços próprios, isso será
                comunicado com clareza e separadamente do conteúdo editorial.
              </p>
            </section>

            <section>
              <h2>Avaliação capilar gratuita</h2>
              <p>
                Oferecemos uma <Link href="/avaliacao">avaliação capilar online</Link>{" "}
                gratuita e sem cadastro, que ajuda a identificar possíveis causas da
                sua queda e sugerir direcionamentos de tratamento com base nas suas
                respostas. É uma ferramenta educacional — não substitui diagnóstico
                profissional, mas pode ser um ponto de partida útil antes da consulta.
              </p>
            </section>

            <section>
              <h2>Contato</h2>
              <p>
                Para dúvidas editoriais, correções, sugestões de pauta ou parcerias,
                envie mensagem através da{" "}
                <Link href="/avaliacao">página de avaliação</Link>. Respondemos em
                até 5 dias úteis.
              </p>
              <p>
                Para questões de privacidade ou direitos sobre seus dados pessoais
                (LGPD), consulte nossa{" "}
                <Link href="/privacidade">política de privacidade</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

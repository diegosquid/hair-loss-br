import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Política Editorial",
  description:
    "Como o Capilarmente produz, revisa e atualiza conteúdo médico sobre queda de cabelo — padrões de evidência, revisão por especialistas e política de correções.",
  alternates: { canonical: "/editorial" },
  openGraph: {
    title: "Política Editorial — Capilarmente",
    description: "Padrões de evidência científica, revisão médica e política de correções.",
    type: "website",
    url: `${SITE_URL}/editorial`,
    locale: "pt_BR",
    siteName: "Capilarmente",
  },
};

export default function EditorialPage() {
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
            <span className="text-warm-500">Política Editorial</span>
          </nav>

          <header className="mb-12">
            <div className="section-label">
              <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
              Como fazemos
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-warm-950 leading-[1.1] mb-5">
              Política Editorial
            </h1>
            <p className="text-xl text-warm-500 leading-relaxed font-light">
              Padrões de evidência, revisão médica e política de correções que regem
              tudo que publicamos.
            </p>
            <p className="text-[13px] text-warm-400 mt-4">Última atualização: abril de 2026</p>
          </header>

          <div className="prose-custom space-y-6">
            <section>
              <h2>1. Princípios</h2>
              <p>
                O Capilarmente é classificado pelo Google como <strong>conteúdo YMYL</strong>
                (Your Money or Your Life) — informação que pode afetar a saúde, o bem-estar
                ou as finanças do leitor. Essa classificação exige padrão elevado de E-E-A-T:
                <strong> Experience, Expertise, Authoritativeness, Trustworthiness</strong>.
                Toda a nossa política editorial é desenhada para atender esse padrão.
              </p>
              <ul>
                <li><strong>Informação, não opinião</strong> — afirmações são lastreadas em evidência científica</li>
                <li><strong>Atualização contínua</strong> — artigos são revisados a cada 3-6 meses</li>
                <li><strong>Transparência sobre incertezas</strong> — onde a ciência não tem resposta definitiva, dizemos</li>
                <li><strong>Nunca alarmismo</strong> — linguagem moderada, sem termos catastróficos</li>
              </ul>
            </section>

            <section>
              <h2>2. Hierarquia de fontes</h2>
              <p>
                Nem toda evidência científica tem o mesmo peso. Na produção do conteúdo,
                priorizamos fontes seguindo esta hierarquia:
              </p>
              <ol>
                <li><strong>Meta-análises e revisões sistemáticas</strong> (Cochrane, PubMed)</li>
                <li><strong>Ensaios clínicos randomizados</strong> (RCTs) com cegamento adequado</li>
                <li><strong>Estudos de coorte</strong> prospectivos</li>
                <li><strong>Guidelines de sociedades médicas</strong> (SBD, AAD, ISHRS, BAD)</li>
                <li><strong>Documentos regulatórios</strong> (ANVISA, FDA, EMA)</li>
                <li><strong>Estudos observacionais e séries de casos</strong></li>
                <li><strong>Opinião de especialistas</strong> (apenas quando outras evidências não existem)</li>
              </ol>
              <p>
                Cada dado numérico apresentado nos artigos deve ter citação rastreável
                com DOI quando disponível. Não aceitamos referências sem link
                verificável para o paper original.
              </p>
            </section>

            <section>
              <h2>3. Autoria e revisão médica</h2>
              <p>
                Todo artigo tem um <strong>autor nomeado</strong> com credenciais
                médicas verificáveis (CRM e RQE) e, na maioria dos casos, um{" "}
                <strong>revisor médico de área complementar</strong>. Por exemplo, um
                artigo sobre finasterida pode ter um dermatologista como autor e um
                endocrinologista como revisor, para garantir que tanto os aspectos
                cutâneos quanto hormonais sejam adequadamente cobertos.
              </p>
              <p>
                Todos os profissionais da nossa equipe editorial estão listados em{" "}
                <Link href="/autores">autores</Link>, com biografia, especialidades,
                credenciais e afiliações profissionais públicas.
              </p>
              <h3>Critérios para inclusão na equipe</h3>
              <ul>
                <li>Graduação em Medicina com CRM ativo em qualquer estado brasileiro</li>
                <li>Título de especialista reconhecido pelo CFM (RQE) em área relacionada</li>
                <li>Prática clínica ativa ou pesquisa acadêmica em saúde capilar</li>
                <li>Filiação a pelo menos uma sociedade médica reconhecida</li>
                <li>Ausência de conflitos de interesse não declarados</li>
              </ul>
            </section>

            <section>
              <h2>4. Conflito de interesse</h2>
              <p>
                Todo autor ou revisor que tenha relação comercial com uma indústria
                farmacêutica, fabricante de dispositivo, clínica ou plataforma
                mencionada no artigo deve declarar. A declaração é inclusa no artigo
                ou na página pública do profissional.
              </p>
              <p>
                A equipe editorial do Capilarmente (na data desta atualização) não
                possui participação acionária, contrato de consultoria ou recebimento
                de honorários de nenhuma marca citada no conteúdo.
              </p>
            </section>

            <section>
              <h2>5. Linguagem e tom</h2>
              <ul>
                <li>Português brasileiro (pt-BR) com acentuação correta</li>
                <li>Termos técnicos explicados na primeira ocorrência</li>
                <li>Preços em reais sempre com data de referência — "a partir de R$ X (mês/ano)"</li>
                <li>Dosagens nunca apresentadas como prescrição — sempre remetemos à consulta médica</li>
                <li>Nenhum conteúdo apresenta promessa absoluta de resultado</li>
                <li>Ausência de termos alarmistas ou sensacionalistas</li>
              </ul>
            </section>

            <section>
              <h2>6. Links de afiliado e publicidade</h2>
              <p>
                Atualmente o Capilarmente <strong>não contém links de afiliado</strong>.
                Quando forem introduzidos (parte da estratégia de sustentabilidade do
                projeto), seguirão estas regras inegociáveis:
              </p>
              <ul>
                <li>
                  <strong>Disclosure obrigatório</strong> no topo do artigo, conforme
                  orientações do CONAR/FTC
                </li>
                <li>
                  <strong>Apenas produtos com evidência científica</strong> — não
                  indicaremos produto sem base para a recomendação
                </li>
                <li>
                  <strong>Nunca em seções críticas</strong> — links de afiliado não
                  aparecem em seções sobre efeitos colaterais, contraindicações,
                  alertas ou disclaimer médico
                </li>
                <li>
                  <strong>Independência do conteúdo</strong> — o texto científico
                  existe separado dos links. Se removermos todos os links, o artigo
                  ainda faz sentido completo
                </li>
                <li>
                  <strong>Monitoramento de impacto</strong> — adição de links é
                  acompanhada por 2 semanas; se houver evidência de prejuízo ao
                  ranking ou à confiança dos leitores, são removidos
                </li>
              </ul>
            </section>

            <section>
              <h2>7. Atualização e &ldquo;freshness&rdquo;</h2>
              <p>
                Na medicina, dados envelhecem rápido. Nosso compromisso de atualização:
              </p>
              <ul>
                <li>
                  <strong>Artigos sobre medicamentos</strong> — revisão a cada 6 meses
                </li>
                <li>
                  <strong>Artigos sobre procedimentos cirúrgicos</strong> — revisão anual
                </li>
                <li>
                  <strong>Artigos sobre causas</strong> — revisão a cada 12 meses
                </li>
                <li>
                  <strong>Preços e disponibilidade no Brasil</strong> — atualização mensal
                </li>
              </ul>
              <p>
                Toda atualização relevante gera um campo <code>updatedAt</code> no
                artigo, visível no topo do texto. Artigos mais antigos sem atualização
                recente estão na fila de revisão.
              </p>
            </section>

            <section>
              <h2>8. Política de correções</h2>
              <p>
                Erros factuais são corrigidos assim que identificados. Nossa política:
              </p>
              <ul>
                <li>
                  <strong>Erros críticos</strong> (dosagem, contraindicação, efeito
                  colateral grave omitido): correção em até 24 horas, com nota
                  visível no topo do artigo
                </li>
                <li>
                  <strong>Erros relevantes</strong> (dados, porcentagens, datas):
                  correção em até 7 dias, com data de correção anotada
                </li>
                <li>
                  <strong>Erros menores</strong> (ortografia, links quebrados):
                  correção silenciosa sem aviso
                </li>
              </ul>
              <p>
                Leitores que identificarem erros podem reportar via{" "}
                <Link href="/avaliacao">formulário de avaliação</Link> ou diretamente
                pelo canal de contato.
              </p>
            </section>

            <section>
              <h2>9. Não somos consulta médica</h2>
              <p>
                Todo artigo é marcado com disclaimer claro: o conteúdo é educacional e
                não substitui avaliação presencial por dermatologista ou especialista
                qualificado. Nosso objetivo é preparar o leitor para uma consulta mais
                produtiva — não substituir a consulta.
              </p>
              <p>
                O Capilarmente <strong>não</strong> oferece prescrição, diagnóstico
                personalizado ou recomendação terapêutica individual, mesmo através da
                avaliação online — que é uma ferramenta educacional de triagem, não
                diagnóstica.
              </p>
            </section>

            <section>
              <h2>10. Contato editorial</h2>
              <p>
                Para reportar erros, sugerir pautas, questionar referências ou
                propor parcerias editoriais, use a{" "}
                <Link href="/avaliacao">página de avaliação</Link> — todos os
                contatos são lidos pela equipe. Respondemos em até 5 dias úteis.
              </p>
              <p>
                Para temas de privacidade e tratamento de dados pessoais, consulte
                nossa <Link href="/privacidade">política de privacidade</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

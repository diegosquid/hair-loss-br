import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Capilarmente coleta, usa e protege seus dados — conforme a LGPD (Lei Geral de Proteção de Dados) brasileira.",
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "Política de Privacidade — Capilarmente",
    description: "Como tratamos seus dados conforme a LGPD.",
    type: "website",
    url: `${SITE_URL}/privacidade`,
    locale: "pt_BR",
    siteName: "Capilarmente",
  },
};

export default function PrivacidadePage() {
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
            <span className="text-warm-500">Privacidade</span>
          </nav>

          <header className="mb-12">
            <div className="section-label">
              <div className="w-1.5 h-1.5 rounded-full bg-terra-400" />
              LGPD
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-warm-950 leading-[1.1] mb-5">
              Política de Privacidade
            </h1>
            <p className="text-xl text-warm-500 leading-relaxed font-light">
              Como coletamos, usamos e protegemos seus dados pessoais — em
              conformidade com a LGPD.
            </p>
            <p className="text-[13px] text-warm-400 mt-4">Última atualização: abril de 2026</p>
          </header>

          <div className="prose-custom space-y-6">
            <section>
              <h2>1. Quem somos</h2>
              <p>
                O Capilarmente (capilarmente.com.br) é um portal editorial independente
                sobre queda de cabelo. Esta política descreve como tratamos seus dados
                pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados
                (Lei 13.709/2018 — LGPD)</strong>.
              </p>
              <p>
                Saiba mais sobre nossa missão e equipe em{" "}
                <Link href="/sobre">sobre</Link>.
              </p>
            </section>

            <section>
              <h2>2. Quais dados coletamos</h2>
              <p>
                Nosso compromisso é coletar <strong>o mínimo possível</strong>. Em
                funcionamento normal do site, os dados tratados são:
              </p>

              <h3>2.1 Avaliação capilar online</h3>
              <p>
                Quando você utiliza a <Link href="/avaliacao">avaliação capilar
                gratuita</Link>, coletamos somente as respostas que você fornece
                voluntariamente ao questionário: sexo, idade aproximada, padrão
                de queda, duração, histórico familiar e condições associadas.
              </p>
              <ul>
                <li>Não exigimos cadastro nem identificação pessoal</li>
                <li>Não coletamos nome, CPF, telefone ou endereço</li>
                <li>As respostas são processadas no seu navegador — não saem do seu dispositivo sem seu consentimento explícito (ex: caso você escolha enviar para um especialista)</li>
                <li>Se você optar por receber o resultado por e-mail, solicitamos apenas o endereço eletrônico, usado exclusivamente para esse envio</li>
              </ul>

              <h3>2.2 Dados técnicos de navegação</h3>
              <p>
                Como a maioria dos sites, registramos dados técnicos anônimos via
                logs de servidor e ferramentas de analytics:
              </p>
              <ul>
                <li>Endereço IP (pseudonimizado para contagem de visitantes únicos)</li>
                <li>Tipo de navegador, sistema operacional, dispositivo</li>
                <li>Páginas visitadas, tempo de permanência, caminho de navegação</li>
                <li>URL de origem (referrer), quando disponível</li>
                <li>Localização aproximada (cidade/estado), derivada do IP</li>
              </ul>

              <h3>2.3 Cookies</h3>
              <p>
                Utilizamos cookies estritamente necessários e, eventualmente, cookies
                analíticos. Detalhes na seção "Cookies" abaixo.
              </p>
            </section>

            <section>
              <h2>3. Para que usamos seus dados</h2>
              <p>As finalidades do tratamento são limitadas a:</p>
              <ul>
                <li>
                  <strong>Operar a avaliação capilar</strong> — processar suas
                  respostas e gerar o resultado educacional personalizado
                </li>
                <li>
                  <strong>Melhorar o conteúdo</strong> — entender quais artigos são
                  mais úteis, quais questões aparecem com frequência, quais tópicos
                  merecem mais cobertura
                </li>
                <li>
                  <strong>Detectar problemas técnicos</strong> — logs de erro,
                  monitoramento de performance, identificação de acessos anômalos
                </li>
                <li>
                  <strong>Enviar comunicações solicitadas</strong> — apenas quando
                  você opta por receber e-mails de resultados ou newsletter (quando
                  disponível)
                </li>
                <li>
                  <strong>Cumprir obrigações legais</strong> — responder a requisições
                  judiciais ou de autoridades competentes, quando obrigatório
                </li>
              </ul>
              <p>
                <strong>Não usamos seus dados</strong> para: perfilamento para
                publicidade personalizada de terceiros, venda ou compartilhamento
                comercial com parceiros, decisões automatizadas com impacto médico ou
                financeiro, envio de spam.
              </p>
            </section>

            <section>
              <h2>4. Base legal do tratamento (LGPD art. 7º)</h2>
              <ul>
                <li>
                  <strong>Consentimento</strong> — para envio de e-mails de resultado
                  e newsletter
                </li>
                <li>
                  <strong>Legítimo interesse</strong> — para análise de métricas
                  agregadas de uso, segurança do site e melhoria do produto
                </li>
                <li>
                  <strong>Execução de contrato</strong> — quando você utiliza a
                  avaliação capilar, consideramos aceito o uso de seus inputs para
                  entrega do resultado educacional
                </li>
                <li>
                  <strong>Obrigação legal</strong> — quando exigido por lei ou
                  ordem judicial
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Compartilhamento com terceiros</h2>
              <p>Podemos compartilhar dados estritamente necessários com:</p>
              <ul>
                <li>
                  <strong>Provedor de hospedagem</strong> — para servir as páginas
                  (operador sujeito a contrato de proteção de dados)
                </li>
                <li>
                  <strong>Ferramentas de analytics</strong> — para análise de
                  métricas agregadas e anonimizadas (ex: Google Analytics com
                  anonimização de IP)
                </li>
                <li>
                  <strong>Serviços de e-mail</strong> — quando você solicita
                  recebimento por e-mail, utilizamos provedor especializado
                  (operador)
                </li>
                <li>
                  <strong>Autoridades competentes</strong> — mediante requisição
                  legal válida
                </li>
              </ul>
              <p>
                Não vendemos dados pessoais. Não compartilhamos dados de avaliação
                capilar individual com terceiros sem consentimento explícito.
              </p>
            </section>

            <section>
              <h2>6. Cookies</h2>
              <p>
                Usamos cookies em três categorias:
              </p>
              <ul>
                <li>
                  <strong>Essenciais</strong> — necessários para o site funcionar
                  corretamente (preferências de sessão, tokens de segurança). Não
                  podem ser desativados
                </li>
                <li>
                  <strong>Analíticos</strong> — para entender padrões de uso do site.
                  Podem ser desativados nas preferências do seu navegador
                </li>
                <li>
                  <strong>Funcionais</strong> — para lembrar preferências (ex: modo
                  de leitura). Opcionais
                </li>
              </ul>
              <p>
                Você pode gerenciar cookies nas configurações do seu navegador. A
                desativação dos cookies analíticos e funcionais não afeta o acesso ao
                conteúdo.
              </p>
            </section>

            <section>
              <h2>7. Seus direitos como titular (LGPD art. 18)</h2>
              <p>Você tem direito a:</p>
              <ul>
                <li>
                  <strong>Confirmação e acesso</strong> aos seus dados que tratamos
                </li>
                <li>
                  <strong>Correção</strong> de dados incompletos, inexatos ou
                  desatualizados
                </li>
                <li>
                  <strong>Anonimização, bloqueio ou eliminação</strong> de dados
                  desnecessários ou tratados em desconformidade com a LGPD
                </li>
                <li>
                  <strong>Portabilidade</strong> dos dados para outro fornecedor
                </li>
                <li>
                  <strong>Eliminação</strong> dos dados tratados com seu
                  consentimento
                </li>
                <li>
                  <strong>Revogação do consentimento</strong> a qualquer momento
                </li>
                <li>
                  <strong>Informação</strong> sobre com quem compartilhamos seus
                  dados
                </li>
                <li>
                  <strong>Oposição</strong> a tratamento realizado em desconformidade
                  com a LGPD
                </li>
              </ul>
              <p>
                Para exercer qualquer desses direitos, entre em contato pelo canal
                indicado na seção 10. Respondemos em até 15 dias úteis.
              </p>
            </section>

            <section>
              <h2>8. Retenção de dados</h2>
              <ul>
                <li>
                  <strong>Respostas de avaliação anônima</strong> — agregadas em
                  estatísticas, sem identificação individual, mantidas
                  indefinidamente
                </li>
                <li>
                  <strong>E-mails solicitados</strong> — mantidos enquanto você
                  estiver inscrito; removidos em até 30 dias após descadastro
                </li>
                <li>
                  <strong>Logs técnicos</strong> — retidos por até 6 meses, depois
                  anonimizados ou descartados
                </li>
                <li>
                  <strong>Backups</strong> — mantidos por até 12 meses para
                  recuperação de desastres
                </li>
              </ul>
            </section>

            <section>
              <h2>9. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger seus dados:
              </p>
              <ul>
                <li>Conexão HTTPS (TLS) em todo o site</li>
                <li>Acesso restrito a dados pela equipe editorial (princípio do menor privilégio)</li>
                <li>Monitoramento de acessos suspeitos</li>
                <li>Atualizações regulares de software e dependências</li>
              </ul>
              <p>
                Em caso de incidente de segurança que possa afetar seus dados,
                notificaremos a ANPD e os titulares afetados conforme exige a LGPD
                (art. 48).
              </p>
            </section>

            <section>
              <h2>10. Encarregado de Dados (DPO) e contato</h2>
              <p>
                Para exercer seus direitos, reportar incidentes ou fazer perguntas
                sobre o tratamento de dados, entre em contato através da{" "}
                <Link href="/avaliacao">página de avaliação</Link> (que também serve
                como canal oficial de comunicação com a equipe). Respondemos em até
                15 dias úteis.
              </p>
              <p>
                Você também pode contatar a <strong>Autoridade Nacional de Proteção
                de Dados (ANPD)</strong> diretamente, através de{" "}
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">gov.br/anpd</a>.
              </p>
            </section>

            <section>
              <h2>11. Menores de idade</h2>
              <p>
                O Capilarmente não direciona conteúdo especificamente a menores de
                18 anos. Quando adolescentes utilizam a avaliação capilar, as
                respostas são tratadas anonimamente e a recomendação sempre inclui
                orientação para consultar um dermatologista acompanhado de
                responsável.
              </p>
            </section>

            <section>
              <h2>12. Alterações nesta política</h2>
              <p>
                Esta política pode ser atualizada para refletir mudanças em nossas
                práticas, na legislação ou nas ferramentas usadas pelo site. A data
                da última atualização aparece no topo deste documento. Mudanças
                materiais serão comunicadas com destaque na página inicial.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

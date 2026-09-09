import InfoPage from "@/components/InfoPage";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Contato e correções", "Canal editorial do Capilarmente para correções, dúvidas sobre a publicação e propostas de colaboração.", "/contato");
export default function Page() { return <InfoPage title="Contato e correções" intro="Fale sobre o conteúdo e o funcionamento da publicação.">
{CONTACT_EMAIL ? <p>Contato editorial: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p> : <p>O canal de contato editorial está em configuração. Esta página será atualizada assim que o endereço estiver disponível.</p>}
<h2>Informar uma correção</h2><p>Indique a URL do artigo, o trecho e, quando possível, uma fonte que permita conferir a informação. Não envie exames, prontuários, fotografias clínicas ou outros dados de saúde.</p><h2>Colaboração editorial</h2><p>Propostas de revisão técnica devem identificar o profissional e suas credenciais verificáveis. A publicação de uma revisão depende da conferência efetiva do artigo e de autorização para atribuição.</p><h2>Limite do canal</h2><p>Não realizamos consultas ou prescrevemos tratamentos. Dúvidas sobre seu quadro clínico devem ser discutidas em atendimento profissional.</p></InfoPage>; }

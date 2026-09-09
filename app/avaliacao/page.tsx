import InfoPage from "@/components/InfoPage";
import AvaliacaoWizard from "@/components/avaliacao/AvaliacaoWizard";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Avaliação capilar gratuita: roteiro educativo", "Organize suas dúvidas sobre queda de cabelo em seis perguntas e imprima um resumo para a consulta. Gratuito, sem cadastro e sem diagnóstico online.", "/avaliacao");
export default function Page() { return <InfoPage title="Avaliação capilar gratuita: prepare sua consulta" intro="Um roteiro educativo para organizar dúvidas sobre sua queda de cabelo. Sem cadastro, diagnóstico ou indicação de medicamentos."><AvaliacaoWizard /></InfoPage>; }

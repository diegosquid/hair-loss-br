import InfoPage from "@/components/InfoPage";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Sobre o Capilarmente", "Conheça a publicação, sua autoria editorial, o uso de inteligência artificial e os limites do conteúdo sobre queda de cabelo.", "/sobre");
export default function Page() { return <InfoPage title="Sobre o Capilarmente" intro="Informação para entender a queda de cabelo, preparar uma consulta e comparar os custos dos cuidados.">
<h2>Uma publicação independente</h2><p>O Capilarmente reúne conteúdo educativo sobre causas da queda de cabelo, medicamentos, procedimentos e cuidados cosméticos. Não somos uma clínica e não oferecemos diagnóstico, prescrição ou atendimento médico.</p>
<h2>Quem produz o conteúdo</h2><p>A <Link href="/autores/equipe-editorial">Redação Capilarmente</Link> utiliza ferramentas de inteligência artificial na pesquisa, organização e redação. Indicamos fontes para permitir a conferência das informações. Não declaramos revisão médica independente dos artigos.</p><p>Em setembro de 2026, retiramos perfis e credenciais profissionais cuja comprovação não constava no projeto. Essa correção também alcança as antigas alegações de revisão por especialistas.</p>
<h2>O que você encontra aqui</h2><p>Guias explicativos, perguntas para levar à consulta e ferramentas para comparar despesas. As comparações de produtos devem identificar se foram feitas por análise documental ou por teste prático. Não atribuímos experiência de uso a produtos que não testamos.</p>
<h2>Como corrigimos e financiamos</h2><p>A <Link href="/editorial">política editorial</Link> explica os critérios de fontes, atualização e publicidade. Quando houver links remunerados, eles serão identificados junto da oferta. Para comunicar uma incorreção ou propor uma colaboração, consulte a página de <Link href="/contato">contato</Link>.</p>
</InfoPage>; }

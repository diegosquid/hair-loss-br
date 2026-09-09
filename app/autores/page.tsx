import InfoPage from "@/components/InfoPage";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Autoria do Capilarmente", "Conheça a autoria editorial e os critérios de transparência do conteúdo do Capilarmente.", "/autores");
export default function Page() { return <InfoPage title="Autoria" intro="Saiba quem assina e como o conteúdo é produzido."><h2><Link href="/autores/equipe-editorial">Redação Capilarmente</Link></h2><p>Publicação independente com apoio de inteligência artificial na pesquisa e redação. A assinatura identifica a equipe editorial, sem atribuir credenciais médicas ou revisão clínica independente.</p><p>Veja os <Link href="/editorial">critérios de fontes, correções e publicidade</Link>.</p></InfoPage>; }

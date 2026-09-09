import { authors, getArticlesByAuthor } from "@/lib/content";
import { notFound } from "next/navigation";
import InfoPage from "@/components/InfoPage";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, jsonLdScript } from "@/lib/schema";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(authors).map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props) { const a = authors[(await params).slug]; return a ? pageMetadata(a.name, a.bio, `/autores/${a.slug}`) : {}; }
export default async function Page({ params }: Props) { const a = authors[(await params).slug]; if (!a) notFound(); const articles = getArticlesByAuthor(a.slug); return <InfoPage title={a.name} intro={a.bio}>
<script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript({ "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/autores/${a.slug}#author`, name: a.name, url: `${SITE_URL}/autores/${a.slug}`, description: a.bio })} />
<p>Consulte nossa <Link href="/editorial">política editorial</Link> para entender o processo de pesquisa, as limitações e como comunicar correções.</p><h2>Artigos assinados pela redação</h2><ul>{articles.map(article => <li key={`${article.categorySlug}/${article.slug}`}><Link href={`/${article.categorySlug}/${article.slug}`}>{article.title}</Link></li>)}</ul></InfoPage>; }

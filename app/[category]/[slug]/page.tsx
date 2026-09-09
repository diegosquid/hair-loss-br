import AffiliateOffers from "@/components/AffiliateOffers";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/lib/content";
import { getCategoryConfig } from "@/lib/categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CostCalculator from "@/components/CostCalculator";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, articleSchema, breadcrumbSchema, jsonLdScript } from "@/lib/schema";
import { formatDate } from "@/lib/site";
type Props = {params: Promise<{category:string; slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata> {
 const {category, slug} = await params; const a = getArticleBySlug(category,slug); if (!a) return {};
 const title = a.seoTitle || a.title; const url = `${SITE_URL}/${category}/${slug}`;
 const images = [{url:`${SITE_URL}${a.image}`, width:1200, height:630, alt:a.imageAlt}];
 return {title, description:a.description, alternates:{canonical:url}, openGraph:{type:"article",title,description:a.description,url,locale:"pt_BR",siteName:"Capilarmente",images,publishedTime:a.publishedAt,modifiedTime:a.updatedAt || a.publishedAt,authors:[`${SITE_URL}/autores/${a.author.slug}`]},twitter:{card:"summary_large_image",title,description:a.description,images:images.map(i=>i.url)},authors:[{name:a.author.name,url:`${SITE_URL}/autores/${a.author.slug}`}],robots:{index:true,follow:true,"max-image-preview":"large"}};
}
export default async function Page({params}:Props) {
 const {category,slug} = await params; const a=getArticleBySlug(category,slug); if(!a) notFound();
 const categoryName=getCategoryConfig(category)?.name || a.category; const related=getRelatedArticles(a,4);
 const schemas=[articleSchema(a),breadcrumbSchema([{name:"Início",url:`${SITE_URL}/`},{name:categoryName,url:`${SITE_URL}/${category}`},{name:a.title,url:`${SITE_URL}/${category}/${slug}`}])];
 return <><script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schemas)} /><Header /><main id="conteudo" className="pt-28 pb-20"><article className="max-w-4xl mx-auto px-5 sm:px-8"><nav aria-label="Caminho da página" className="flex flex-wrap gap-2 text-sm mb-8"><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href={`/${category}`}>{categoryName}</Link></nav><header><span className="badge-green mb-4">{a.category}</span><h1 className="text-3xl md:text-5xl font-display leading-tight mb-5">{a.title}</h1><p className="text-xl leading-relaxed mb-6">{a.description}</p><div className="text-sm space-y-2 mb-7"><p>Por <Link className="underline text-forest-700" href={`/autores/${a.author.slug}`}>{a.author.name}</Link> · {a.readingTime} min de leitura</p><p>Publicado em <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>{a.updatedAt && <> · Atualizado em <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time></>}</p><p>Conteúdo editorial com apoio de IA. <Link className="underline" href="/editorial">Conheça os critérios e limites da publicação</Link>.</p></div></header>
<img src={a.image} alt={a.imageAlt} width={1200} height={630} className="w-full h-auto rounded-2xl border border-warm-200 mb-8" fetchPriority="high" />
{a.correctionNote && <aside aria-label="Nota de atualização" className="border-l-4 border-forest-500 bg-sage-50 p-5 mb-8 text-sm"><strong>Nota editorial:</strong> {a.correctionNote}</aside>}
{a.toc.length > 0 && <nav aria-label="Neste guia" className="rounded-2xl border border-warm-200 p-5 sm:p-7 mb-10"><h2 className="font-display text-xl mb-4">Neste guia</h2><ul className="grid sm:grid-cols-2 gap-x-7 gap-y-3 text-sm">{slug === "custo-tratar-calvicie-brasil" && <li><a className="text-forest-700 underline" href="#calculadora">Calculadora de custos</a></li>}{a.toc.map(item => <li key={item.id}><a className="text-forest-700 underline underline-offset-4" href={`#${item.id}`}>{item.title}</a></li>)}</ul></nav>}
{slug === "custo-tratar-calvicie-brasil" && category === "blog" && <CostCalculator />}
<div className="prose-custom" dangerouslySetInnerHTML={{__html:a.content}} /><AffiliateOffers slug={a.slug} />
<aside className="mt-12 bg-terra-50 rounded-xl border border-terra-200 p-5 text-sm leading-relaxed"><strong>Informação para conversar com um profissional.</strong> Este conteúdo não substitui diagnóstico, prescrição ou acompanhamento. Não inicie, combine ou interrompa medicamentos com base apenas na leitura. <Link className="underline" href="/contato">Informe uma correção</Link>.</aside>
<section className="mt-12 p-6 sm:p-8 bg-forest-50 border border-forest-200 rounded-2xl"><h2 className="text-2xl font-display mb-3">Organize a próxima etapa</h2><p className="mb-5">Prepare perguntas para uma consulta e compare o custo total dos cuidados.</p><div className="flex flex-wrap gap-3"><Link className="btn-primary" href="/avaliacao">Preparar minha consulta</Link>{slug !== "custo-tratar-calvicie-brasil" && <Link className="btn-secondary" href="/blog/custo-tratar-calvicie-brasil#calculadora">Calcular meu orçamento</Link>}</div></section>
{related.length > 0 && <aside aria-label="Continue a leitura" className="mt-14"><h2 className="text-2xl font-display mb-5">Continue a leitura</h2><div className="grid sm:grid-cols-2 gap-5">{related.map(r=><Link href={`/${r.categorySlug}/${r.slug}`} key={`${r.categorySlug}/${r.slug}`} className="card"><span className="text-sm text-forest-700">{r.category}</span><h3 className="text-xl font-display mt-2">{r.title}</h3><p className="mt-3 text-sm leading-relaxed">{r.description}</p></Link>)}</div></aside>}</article></main><Footer /></>;
}
export function generateStaticParams(){return getAllArticles().map(a=>({category:a.categorySlug,slug:a.slug}));}

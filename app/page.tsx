import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeExplorer from "@/components/HomeExplorer";
import { getArticleBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import styles from "./home.module.css";

export const metadata = pageMetadata(
  "Queda de cabelo: cuidados, tratamentos e custos",
  "Entenda causas da queda de cabelo, compare cuidados e planeje custos. Guias transparentes e roteiro gratuito para preparar uma consulta.",
  "/",
);

const readings = [
  { category: "tratamentos", slug: "prf-capilar", title: "PRF capilar: o que sabemos até aqui", label: "Evidências em perspectiva" },
  { category: "tratamentos", slug: "laser-terapia", title: "Laser capilar: possibilidades e limites", label: "Além da promessa" },
  { category: "tratamentos", slug: "transplante-barba", title: "Transplante de barba: antes de decidir", label: "Uma decisão informada" },
].map((item) => ({ ...item, article: getArticleBySlug(item.category, item.slug) }));

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export default function Home() {
  return <><Header /><main id="conteudo" className={styles.home}>
    <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="home-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><span className={styles.smallMark} aria-hidden="true" /> Um olhar atento à saúde capilar</p>
        <h1 id="home-title">Entenda a queda.<br /><em>Cuide de você.</em></h1>
        <p className={styles.heroDescription}>Queda de cabelo traz perguntas. Aqui, você encontra informação para conhecer os cuidados, entender os limites e escolher seus próximos passos.</p>
        <div className={styles.heroActions}>
          <Link href="#encontre-seu-guia" className={styles.primary}>Encontre seu ponto de partida <Arrow /></Link>
          <Link href="/avaliacao" className={styles.textLink}>Prepare sua consulta <Arrow /></Link>
        </div>
        <div className={styles.heroNote}><span aria-hidden="true">✳</span><p>Informação acessível.<br /><strong>Decisões no seu tempo.</strong></p></div>
      </div>
      <figure className={styles.heroVisual}>
        <picture>
          <source srcSet="/images/home/cuidado-capilar-640.webp 640w, /images/home/cuidado-capilar-1120.webp 1120w" sizes="(max-width: 760px) calc(100vw - 40px), 46vw" type="image/webp" />
          <img src="/images/home/cuidado-capilar-1120.webp" width="1120" height="1400" fetchPriority="high" alt="Imagem ilustrativa de uma mulher tocando os cabelos cacheados sob luz natural." />
        </picture>
        <div className={styles.photoLabel}><span>CAPILARMENTE</span><p>Cuidado começa<br />com um novo olhar.</p></div>
        <figcaption>Imagem ilustrativa criada com IA</figcaption>
      </figure>
    </section>

    <nav className={`${styles.wrap} ${styles.topicNav}`} aria-label="Explore os temas">
      {[["01", "Entenda as causas", "/causas"], ["02", "Conheça os tratamentos", "/tratamentos"], ["03", "Compare os produtos", "#comprar-com-criterio"], ["04", "Planeje os custos", "/blog/custo-tratar-calvicie-brasil"]].map(([n, text, href]) => <Link key={n} href={href}><span>{n}</span>{text}<Arrow diagonal /></Link>)}
    </nav>

    <section id="encontre-seu-guia" className={`${styles.wrap} ${styles.explore}`} aria-labelledby="explore-title">
      <div className={styles.sectionHead}>
        <div><p className={styles.eyebrow}>Por onde começar</p><h2 id="explore-title">Cada dúvida tem<br /><em>um ponto de partida.</em></h2></div>
        <p>Você não precisa entender tudo de uma vez. Escolha o que faz sentido para o seu momento.</p>
      </div>
      <HomeExplorer />
    </section>

    <section className={styles.consultation} aria-labelledby="consultation-title">
      <div className={`${styles.wrap} ${styles.consultationInner}`}>
        <div className={styles.consultationCopy}><p className={styles.eyebrow}>Uma pausa para organizar as ideias</p><h2 id="consultation-title">Sua próxima consulta<br /><em>pode começar aqui.</em></h2><p>Organize o que percebeu e o que quer perguntar. Nosso roteiro transforma seis perguntas em um resumo para levar ao profissional.</p><Link href="/avaliacao" className={styles.lightButton}>Montar meu roteiro <Arrow /></Link><p className={styles.smallPrint}>Gratuito · Sem cadastro · Sem diagnóstico online</p></div>
        <div className={styles.notebook} aria-label="O que você leva do roteiro"><div className={styles.notebookTop}><span>MEU ROTEIRO</span><span aria-hidden="true">↗</span></div><p>O que vale<br /><em>levar à consulta.</em></p><ul><li><span aria-hidden="true">01</span> O que mudou no seu cabelo</li><li><span aria-hidden="true">02</span> O que você quer entender</li><li><span aria-hidden="true">03</span> Suas dúvidas organizadas</li></ul><div className={styles.notebookFooter}>Um resumo seu, para conversar melhor.</div></div>
      </div>
    </section>

    <section id="comprar-com-criterio" className={`${styles.wrap} ${styles.shopping}`} aria-labelledby="shopping-title">
      <figure className={styles.shoppingVisual}><img src="/images/home/cuidados-e-escolhas-960.webp" width="960" height="640" loading="lazy" alt="Composição ilustrativa com frasco sem marca, pente e tecido sobre uma bancada." /><figcaption>Objetos ilustrativos criados com IA · Sem indicação de marca</figcaption></figure>
      <div><p className={styles.eyebrow}>Antes de colocar no carrinho</p><h2 id="shopping-title">Menos impulso.<br /><em>Mais critério.</em></h2><p className={styles.shoppingIntro}>O que observar no rótulo, na manutenção e nas promessas. Guias para comparar possibilidades antes de gastar.</p><div className={styles.shoppingLinks}>{[
        ["Shampoos antiqueda", "O que o produto faz — e o que esperar dele.", "/blog/guia-shampoos-antiqueda"],
        ["Fibras capilares", "Aplicação, acabamento e cuidados de uso.", "/blog/fibras-capilares-como-escolher"],
        ["Perucas e próteses", "Conforto, adaptação e manutenção.", "/blog/perucas-proteses-capilares"],
      ].map(([title, text, href]) => <Link key={href} href={href}><div><h3>{title}</h3><p>{text}</p></div><Arrow diagonal /></Link>)}</div></div>
    </section>

    <section className={`${styles.wrap} ${styles.readings}`} aria-labelledby="readings-title">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Para olhar mais de perto</p><h2 id="readings-title">Além da primeira resposta.</h2></div><Link href="/tratamentos" className={styles.textLink}>Explorar tratamentos <Arrow /></Link></div>
      <div className={styles.readingGrid}>{readings.map(({ article, title, label }) => article && <Link href={`/${article.categorySlug}/${article.slug}`} key={article.slug} className={styles.readingCard}><div className={styles.readingImage}><img src={article.image} alt="" width="1200" height="630" loading="lazy" /><span className={styles.roundArrow}><Arrow diagonal /></span></div><p className={styles.readingLabel}>{label}</p><h3>{title}</h3><p className={styles.readingMeta}>Guia de leitura · {article.readingTime} min</p></Link>)}</div>
    </section>

    <section className={`${styles.wrap} ${styles.budget}`} aria-labelledby="budget-title"><div className={styles.budgetIcon} aria-hidden="true">R$<span>↗</span></div><div><p className={styles.eyebrow}>Cuidado também é planejamento</p><h2 id="budget-title">E quanto cabe no seu orçamento?</h2><p>Coloque consultas, cuidados mensais e despesas únicas na mesma conta.</p></div><Link className={styles.primary} href="/blog/custo-tratar-calvicie-brasil#calculadora">Simular meus custos <Arrow /></Link></section>

    <section className={`${styles.wrap} ${styles.editorial}`} aria-labelledby="editorial-title"><div className={styles.editorialMark} aria-hidden="true">c.</div><div><p className={styles.eyebrow}>Nosso compromisso editorial</p><h2 id="editorial-title">Informação merece transparência.</h2><p>Somos uma publicação independente, produzida com apoio de IA e fontes indicadas nos artigos. Explicamos limites, corrigimos erros e identificamos publicidade. O conteúdo não substitui acompanhamento profissional.</p><Link href="/editorial" className={styles.textLink}>Como produzimos nossos conteúdos <Arrow /></Link></div></section>
  </main><Footer /></>;
}

"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "@/app/home.module.css";

const paths = [
  { label: "Entender a queda", intro: "Comece conhecendo as possíveis causas.", links: [
    { href: "/causas", title: "O que pode estar por trás da queda?", description: "Um panorama das causas para orientar sua leitura.", number: "01" },
    { href: "/causas/queda-cabelo-feminina", title: "Queda de cabelo na mulher", description: "Diferentes momentos, dúvidas e possibilidades de investigação.", number: "02" },
    { href: "/causas/alopecia-androgenetica", title: "Entenda a alopecia androgenética", description: "O que significa o termo e como é feita a avaliação.", number: "03" },
  ] },
  { label: "Conhecer os tratamentos", intro: "Entenda as possibilidades antes de decidir.", links: [
    { href: "/tratamentos", title: "Um mapa dos tratamentos", description: "Conheça opções, limites e perguntas para a consulta.", number: "01" },
    { href: "/medicamentos", title: "Medicamentos, com contexto", description: "Informações para conversar com o profissional que acompanha você.", number: "02" },
    { href: "/blog/custo-tratar-calvicie-brasil", title: "Planeje o custo ao longo do tempo", description: "Uma calculadora para organizar gastos recorrentes e únicos.", number: "03" },
  ] },
  { label: "Comparar os produtos", intro: "Troque a promessa por critérios de escolha.", links: [
    { href: "/blog/guia-shampoos-antiqueda", title: "Shampoos antiqueda, sem mistério", description: "O que procurar no rótulo e quais expectativas colocar no produto.", number: "01" },
    { href: "/blog/fibras-capilares-como-escolher", title: "Fibras: conheça o efeito cosmético", description: "Cor, aplicação e limites para avaliar antes de comprar.", number: "02" },
    { href: "/blog/perucas-proteses-capilares", title: "Perucas e próteses no dia a dia", description: "Critérios para comparar material, fixação e manutenção.", number: "03" },
  ] },
];

export default function HomeExplorer() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % paths.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + paths.length) % paths.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = paths.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  }
  return <div className={styles.explorer}>
    <div role="tablist" aria-label="O que você quer entender?" className={styles.tabs}>{paths.map((path, index) => <button key={path.label} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`path-tab-${index}`} aria-selected={selected === index} aria-controls={`path-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => onKeyDown(event, index)}>{path.label}<span aria-hidden="true">↗</span></button>)}</div>
    {paths.map((path, index) => <div key={path.label} role="tabpanel" id={`path-panel-${index}`} aria-labelledby={`path-tab-${index}`} hidden={selected !== index} tabIndex={0}><p className={styles.explorerIntro}>{path.intro}</p><div className={styles.pathGrid}>{path.links.map((link) => <Link key={link.href} href={link.href} className={styles.pathCard}><span className={styles.pathNumber}>{link.number}</span><h3>{link.title}</h3><p>{link.description}</p><span className={styles.pathAction}>Explorar o guia <span aria-hidden="true">↗</span></span></Link>)}</div></div>)}
  </div>;
}

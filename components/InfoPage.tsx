import type { ReactNode } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
export default function InfoPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return <><Header /><main id="conteudo" className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-20"><Link href="/" className="text-forest-700 text-sm">Início</Link><h1 className="section-title mt-6">{title}</h1>{intro && <p className="text-xl leading-relaxed mb-8">{intro}</p>}<div className="prose-custom">{children}</div></main><Footer /></>;
}

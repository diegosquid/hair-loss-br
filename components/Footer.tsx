import Link from "next/link";

const FOOTER_LINKS = {
  tratamentos: [
    { label: "Minoxidil", href: "/medicamentos/minoxidil" },
    { label: "Finasterida", href: "/medicamentos/finasterida" },
    { label: "Transplante Capilar", href: "/tratamentos/transplante-capilar" },
    { label: "Laser de Baixa Potencia", href: "/tratamentos/laser-terapia" },
  ],
  causas: [
    { label: "Alopecia Androgenetica", href: "/causas/alopecia-androgenetica" },
    { label: "Queda Hormonal", href: "/causas/queda-hormonal" },
    { label: "Estresse e Queda", href: "/causas/estresse-queda-cabelo" },
    { label: "Nutricao Capilar", href: "/causas/nutricao-capilar" },
  ],
  sobre: [
    { label: "Sobre Nos", href: "/sobre" },
    { label: "Politica Editorial", href: "/editorial" },
    { label: "Privacidade", href: "/privacidade" },
    { label: "Contato", href: "/contato" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-warm-950 text-warm-400 overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-forest-500 to-forest-700" />
                <svg className="relative w-8 h-8 p-1.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4 5-7 6 1 4 3 7 7 12 4-5 6-8 7-12-3-1-5.5-3-7-6z" />
                </svg>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-display font-bold text-white">Hair Loss</span>
                <span className="text-lg font-display font-bold text-forest-400">BR</span>
              </div>
            </Link>
            <p className="text-warm-500 text-[15px] leading-relaxed max-w-sm mb-6">
              Informacoes baseadas em evidencias cientificas sobre tratamentos para queda de cabelo no Brasil.
            </p>
            <div className="flex items-center gap-2 text-[13px] text-warm-600">
              <span className="w-2 h-2 rounded-full bg-forest-500/60" />
              Conteudo revisado por dermatologistas
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-warm-300 mb-4">
                Tratamentos
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.tratamentos.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[14px] text-warm-500 hover:text-forest-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-warm-300 mb-4">
                Causas
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.causas.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[14px] text-warm-500 hover:text-forest-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold tracking-[0.1em] uppercase text-warm-300 mb-4">
                Sobre
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.sobre.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[14px] text-warm-500 hover:text-forest-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-warm-800/50">
          <p className="text-warm-600 text-[13px]">
            &copy; {new Date().getFullYear()} Hair Loss BR. Conteudo informativo, nao substitui consulta medica.
          </p>
          <div className="flex items-center gap-1 text-[13px] text-warm-600">
            Feito com
            <svg className="w-3.5 h-3.5 text-terra-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            no Brasil
          </div>
        </div>
      </div>
    </footer>
  );
}

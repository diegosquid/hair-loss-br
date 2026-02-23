import Link from "next/link";

const FOOTER_LINKS = {
  tratamentos: [
    { label: "Minoxidil", href: "/medicamentos/minoxidil" },
    { label: "Finasterida", href: "/medicamentos/finasterida" },
    { label: "Transplante Capilar", href: "/tratamentos/transplante-capilar" },
    { label: "Laser de Baixa Potência", href: "/tratamentos/laser-terapia" },
  ],
  causas: [
    { label: "Alopecia Androgenética", href: "/causas/alopecia-androgenetica" },
    { label: "Queda Hormonal", href: "/causas/queda-hormonal" },
    { label: "Estresse e Queda", href: "/causas/estresse-queda-cabelo" },
    { label: "Nutrição Capilar", href: "/causas/nutricao-capilar" },
  ],
  sobre: [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Política Editorial", href: "/editorial" },
    { label: "Privacidade", href: "/privacidade" },
    { label: "Contato", href: "/contato" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-copper-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Hair Loss <span className="text-primary-400">BR</span>
              </span>
            </Link>
            <p className="text-navy-400 text-sm">
              Informações baseadas em evidências científicas sobre tratamentos para queda de cabelo no Brasil.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Tratamentos</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.tratamentos.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-navy-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Causas</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.causas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-navy-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Sobre</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.sobre.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-navy-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 text-center">
          <p className="text-navy-500 text-sm">
            © {new Date().getFullYear()} Hair Loss BR. Conteúdo informativo, não substitui consulta médica.
          </p>
        </div>
      </div>
    </footer>
  );
}

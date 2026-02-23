"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/tratamentos", label: "Tratamentos" },
  { href: "/medicamentos", label: "Medicamentos" },
  { href: "/causas", label: "Causas" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/90 backdrop-blur-xl shadow-soft border-b border-warm-200/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 opacity-90 group-hover:opacity-100 transition-opacity" />
              <svg className="relative w-9 h-9 p-[6px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-3.5 3-6 6-6-1 3-3 5.5-6 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-3.5-3-6-6-6 1 3 3 5.5 6 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c0-2.5 2.5-4.5 5-4.5-.8 2.2-2.5 4-5 4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c0-2.5-2.5-4.5-5-4.5.8 2.2 2.5 4 5 4.5z" />
              </svg>
            </div>
            <span className="text-[20px] font-display font-bold tracking-tight">
              <span className="text-warm-900">Capilar</span><span className="text-forest-600">mente</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[14.5px] font-medium text-warm-500 hover:text-forest-700 rounded-full hover:bg-forest-50/60 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/avaliacao"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[13.5px] font-semibold text-white bg-forest-700 rounded-full hover:bg-forest-600 shadow-soft hover:shadow-soft-md transition-all duration-300 hover:-translate-y-[1px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Avaliacao Gratis
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-warm-100 transition-colors"
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <div className={`w-5 h-[1.5px] bg-warm-700 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[5.5px]" : ""}`} />
                <div className={`w-5 h-[1.5px] bg-warm-700 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <div className={`w-5 h-[1.5px] bg-warm-700 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[5.5px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-cream-50/98 backdrop-blur-xl border-b border-warm-200/40 shadow-soft-md transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-[15px] font-medium text-warm-600 hover:text-forest-700 rounded-xl hover:bg-sage-50 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/avaliacao"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 px-4 py-3 text-[15px] font-semibold text-white bg-forest-700 rounded-xl text-center hover:bg-forest-600 transition-colors"
          >
            Avaliacao Gratis
          </Link>
        </nav>
      </div>
    </header>
  );
}

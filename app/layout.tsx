import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { SITE_URL, organizationSchema, websiteSchema, jsonLdScript } from "@/lib/schema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Capilarmente — Tratamentos para Queda de Cabelo no Brasil",
    template: "%s — Capilarmente",
  },
  description:
    "Guia completo sobre tratamentos para queda de cabelo e calvície no Brasil. Minoxidil, finasterida, transplante capilar e mais. Informações baseadas em evidências científicas.",
  keywords: [
    "queda de cabelo",
    "calvície",
    "minoxidil",
    "finasterida",
    "tratamento capilar",
    "alopecia",
    "Brasil",
    "capilarmente",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Capilarmente — Tratamentos para Queda de Cabelo",
    description: "Guia completo sobre tratamentos para queda de cabelo no Brasil",
    type: "website",
    locale: "pt_BR",
    siteName: "Capilarmente",
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([organizationSchema(), websiteSchema()])}
        />
      </head>
      <body className={`${playfair.variable} ${outfit.variable} font-body bg-cream-50 text-warm-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}

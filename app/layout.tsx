import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hair Loss BR - Tratamentos para Queda de Cabelo no Brasil",
  description: "Guia completo sobre tratamentos para queda de cabelo e calvície no Brasil. Minoxidil, finasterida, transplante capilar e mais. Informações baseadas em evidências científicas.",
  keywords: "queda de cabelo, calvície, minoxidil, finasterida, tratamento capilar, alopecia, Brasil",
  openGraph: {
    title: "Hair Loss BR - Tratamentos para Queda de Cabelo",
    description: "Guia completo sobre tratamentos para queda de cabelo no Brasil",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-navy-950 text-navy-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, socialImages } from "./site";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: `${SITE_URL}${path}`, type: "website", locale: "pt_BR", siteName: SITE_NAME, images: socialImages }, twitter: { card: "summary_large_image", title, description, images: socialImages.map(i => i.url) } };
}

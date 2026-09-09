export const SITE_URL = "https://www.capilarmente.com.br";
export const SITE_NAME = "Capilarmente";
export const EDITORIAL_UPDATED = "2026-09-09";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contato@capilarmente.com.br";
export const DEFAULT_IMAGE = `${SITE_URL}/images/capilarmente-social.png`;
export const socialImages = [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: "Capilarmente — informação para cuidar e escolher" }];

export function formatDate(date: string) {
  return new Date(`${date.slice(0, 10)}T12:00:00Z`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });
}

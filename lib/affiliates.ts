import rawOffers from "@/config/affiliate-offers.json";
export type AffiliateOffer = { id:string; title:string; merchant:string; url:string; articleSlugs:string[]; note:string };
const allowedArticles = new Set(["guia-shampoos-antiqueda", "perucas-proteses-capilares", "fibras-capilares-como-escolher"]);
export function validateOffers(value:unknown): AffiliateOffer[] {
 if (!Array.isArray(value)) throw new Error("Ofertas precisam ser uma lista");
 const ids = new Set<string>();
 return value.map(item => {
  if (!item || typeof item !== "object") throw new Error("Oferta inválida");
  const o = item as AffiliateOffer;
  if (!/^[a-z0-9-]{1,60}$/.test(o.id) || ids.has(o.id)) throw new Error("Identificador de oferta inválido ou repetido");
  ids.add(o.id);
  const url = new URL(o.url);
  if (url.protocol !== "https:" || url.username || url.password || !o.title?.trim() || !o.merchant?.trim() || !o.note?.trim()) throw new Error("Oferta precisa de HTTPS, título, loja e contexto");
  if (!Array.isArray(o.articleSlugs) || !o.articleSlugs.length || o.articleSlugs.some(s => !allowedArticles.has(s))) throw new Error("Oferta fora dos guias comerciais autorizados");
  return o;
 });
}
export function offersForArticle(slug:string) { return validateOffers(rawOffers).filter(o => o.articleSlugs.includes(slug)); }

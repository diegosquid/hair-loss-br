"use client";
import { recordEvent } from "@/lib/analytics";
import type { AffiliateOffer } from "@/lib/affiliates";
export default function AffiliateLink({offer}:{offer:AffiliateOffer}) {return <a href={offer.url} rel="sponsored nofollow noopener" target="_blank" onClick={() => recordEvent("affiliate_click",{product:offer.id})} className="inline-block mt-3 rounded-lg bg-forest-700 px-4 py-3 font-semibold text-white">Conferir na {offer.merchant} <span className="sr-only">(abre em outra aba)</span></a>;}

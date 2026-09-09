"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getConsent, measurePage, privacyOptOut, setConsent, subscribeConsent } from "@/lib/analytics";
const serverConsent = () => "pending" as const;
export default function SiteAnalytics() {
 const consent = useSyncExternalStore(subscribeConsent, getConsent, serverConsent);
 const pathname = usePathname();
 const [open, setOpen] = useState(false);
 useEffect(() => { if (consent === "granted") measurePage(pathname); }, [consent, pathname]);
 const visible = consent === "pending" || open;
 return <div className="print:hidden">{visible ? <section aria-label="Preferências de privacidade" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-md z-50 border border-warm-300 rounded-2xl bg-white text-warm-950 shadow-xl p-5"><p className="font-semibold">Métricas opcionais</p><p className="text-sm leading-relaxed mt-2">Podemos usar cookies do Google Analytics para entender as visitas e o uso das ferramentas? Respostas do roteiro e valores da calculadora ficam no seu navegador. <Link className="underline" href="/privacidade">Saiba mais</Link>.</p>{privacyOptOut() && <p className="text-sm mt-2">Seu navegador pediu para não rastrear. Essa preferência será respeitada.</p>}<div className="mt-4 flex gap-3"><button className="flex-1 rounded-lg border border-warm-700 px-3 py-2 font-semibold" onClick={() => {setConsent("denied"); setOpen(false);}}>Recusar</button><button disabled={privacyOptOut()} className="flex-1 rounded-lg border border-warm-700 px-3 py-2 font-semibold disabled:opacity-50" onClick={() => {setConsent("granted"); setOpen(false);}}>Aceitar métricas</button></div></section> : <button onClick={() => setOpen(true)} className="fixed bottom-3 left-3 z-40 rounded-full bg-white text-warm-900 border border-warm-300 shadow-sm px-3 py-2 text-xs">Privacidade</button>}</div>;
}

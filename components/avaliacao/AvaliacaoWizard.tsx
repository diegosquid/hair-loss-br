"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import QuestionCard from "./QuestionCard";
import { questions, sanitizeAnswers, isComplete, answerSummary, readingForInterest } from "@/lib/avaliacao/questions";
import type { AssessmentAnswers } from "@/lib/avaliacao/types";
import { recordEvent } from "@/lib/analytics";
const STORAGE = "capilarmente_roteiro_v2";
export default function AvaliacaoWizard() {
 const [answers, setAnswers] = useState<AssessmentAnswers>({});
 const [step, setStep] = useState(0);
 const [started, setStarted] = useState(false);
 const [ready, setReady] = useState(false);
 const [done, setDone] = useState(false);
 const heading = useRef<HTMLDivElement>(null);
 // Browser session restoration intentionally runs after hydration; never serialize these answers into HTML.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(() => { try { sessionStorage.removeItem("capilarmente_avaliacao"); const stored = JSON.parse(sessionStorage.getItem(STORAGE) || "null"); if (stored) { const clean = sanitizeAnswers(stored.answers); setAnswers(clean); const missing = questions.findIndex(q => !clean[q.id]?.length); setStep(missing < 0 ? questions.length - 1 : missing); setStarted(Object.keys(clean).length > 0); } } catch {} setReady(true); }, []);
 useEffect(() => { if (!ready) return; try { if (done || !started) sessionStorage.removeItem(STORAGE); else sessionStorage.setItem(STORAGE, JSON.stringify({answers})); } catch {} }, [answers, done, started, ready]);
 function focus() { requestAnimationFrame(() => { heading.current?.focus(); heading.current?.scrollIntoView({block:"start", behavior:"auto"}); }); }
 function restart() { setAnswers({}); setStep(0); setDone(false); setStarted(false); try {sessionStorage.removeItem(STORAGE);} catch {} focus(); }
 if (!started) return <div ref={heading} tabIndex={-1} className="card"><h2 className="text-2xl font-display mb-4">Prepare suas perguntas</h2><p className="leading-relaxed mb-5">São seis perguntas para organizar o que você deseja conversar com um profissional. Você receberá um resumo que pode imprimir. Não pedimos nome, e-mail ou fotos.</p><p className="text-sm mb-6">As respostas ficam nesta aba. Ao concluir, ficam apenas no resumo exibido; recarregar a página ou reiniciar o roteiro remove esse resumo. Nenhuma resposta é enviada às métricas do site.</p><button disabled={!ready} className="btn-primary" onClick={() => {setStarted(true); recordEvent("quiz_start"); focus();}}>Começar roteiro gratuito</button></div>;
 if (done) { const guide = readingForInterest(answers.duvida); return <div ref={heading} tabIndex={-1} className="card"><h2 className="text-3xl font-display mb-4">Seu resumo para a consulta</h2><p className="mb-6">Este é um registro das suas respostas. Ele não determina a causa da queda nem indica um tratamento.</p><dl className="space-y-4">{answerSummary(answers).map(item => <div key={item.question}><dt className="font-semibold">{item.question}</dt><dd>{item.answer}</dd></div>)}</dl><h3 className="text-xl mt-8 mb-3">O que vale levar</h3><ul className="list-disc pl-5 space-y-2"><li>Uma lista do que mudou e quando você percebeu isso.</li><li>Os nomes de medicamentos, suplementos e cosméticos que usa, para discutir na consulta.</li><li>Fotos de épocas diferentes, se você já tiver e desejar mostrar ao profissional.</li><li>Perguntas sobre alternativas, benefícios esperados, riscos, acompanhamento e custo total.</li></ul><p className="mt-6">Não interrompa tratamentos por causa deste roteiro. Mudanças repentinas ou sintomas no couro cabeludo merecem avaliação profissional.</p><p className="mt-5">Leitura sobre o assunto que você escolheu: <Link className="text-forest-700 underline" href={guide.href}>{guide.title}</Link>.</p><div className="flex flex-wrap gap-3 mt-8 print:hidden"><button className="btn-primary" onClick={() => window.print()}>Imprimir resumo</button><button className="btn-secondary" onClick={restart}>Apagar e reiniciar</button></div></div>; }
 const q = questions[step]; const answered = !!answers[q.id]?.length;
 return <div ref={heading} tabIndex={-1} className="card"><p aria-live="polite" className="text-sm mb-3">Pergunta {step + 1} de {questions.length}</p><progress className="w-full h-2 accent-forest-700 mb-7" value={step + 1} max={questions.length} aria-label="Progresso do roteiro" /><QuestionCard question={q} value={answers[q.id] || ""} onChange={value => setAnswers({...answers, [q.id]:value})} /><div className="flex justify-between gap-3 mt-8"><button className="btn-secondary" onClick={() => { if (step) setStep(step - 1); else restart(); focus(); }}>{step ? "Voltar" : "Cancelar"}</button><button className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed" disabled={!answered} onClick={() => { if (step < questions.length - 1) { setStep(step + 1); recordEvent("quiz_step", {step: step + 2}); } else if (isComplete(answers)) { setDone(true); try {sessionStorage.removeItem(STORAGE);} catch {} recordEvent("quiz_complete"); } focus(); }}>{step === questions.length - 1 ? "Ver meu resumo" : "Continuar"}</button></div></div>;
}

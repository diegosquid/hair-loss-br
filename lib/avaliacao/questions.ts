import type { Question } from "./types";
const choices = (...labels: string[]) => labels.map((label, i) => ({id: String(i), label}));
export const questions: Question[] = [
 {id:"tempo", title:"Há quanto tempo você percebe a mudança?", type:"single", options:choices("Nas últimas semanas", "Há alguns meses", "Há mais de um ano", "Não sei dizer")},
 {id:"percepcao", title:"O que você gostaria de mostrar na consulta?", type:"multi", options:choices("Mais fios caindo", "Uma área com menos cabelo", "Fios quebrando", "Uma mudança no couro cabeludo", "Uma dúvida sobre aparência")},
 {id:"registro", title:"Você tem registros para comparar?", type:"single", options:choices("Tenho fotos de épocas diferentes", "Tenho apenas fotos recentes", "Não tenho fotos", "Prefiro não usar fotos")},
 {id:"mudancas", title:"Houve alguma mudança que você quer comentar com o profissional?", description:"Você poderá detalhar isso pessoalmente, sem registrar informações de saúde aqui.", type:"single", options:choices("Sim, vou anotar para a consulta", "Não me lembro de mudanças", "Prefiro conversar pessoalmente")},
 {id:"duvida", title:"Qual assunto você quer entender melhor?", type:"single", options:choices("Como funciona a investigação da queda", "Como comparar custos", "Como escolher cuidados cosméticos", "Como disfarçar a rarefação")},
 {id:"consulta", title:"Você já tem uma consulta marcada?", type:"single", options:choices("Sim", "Ainda vou procurar um profissional", "Já estou em acompanhamento", "Ainda estou pesquisando")},
];
export function sanitizeAnswers(value: unknown): import("./types").AssessmentAnswers {
 const clean: import("./types").AssessmentAnswers = {};
 if (!value || typeof value !== "object" || Array.isArray(value)) return clean;
 for (const q of questions) {
  const raw = (value as Record<string,unknown>)[q.id];
  const allowed = new Set(q.options.map(o => o.id));
  if (q.type === "single" && typeof raw === "string" && allowed.has(raw)) clean[q.id] = raw;
  if (q.type === "multi" && Array.isArray(raw)) { const valid = Array.from(new Set(raw.filter((v): v is string => typeof v === "string" && allowed.has(v)))); if (valid.length) clean[q.id] = valid; }
 }
 return clean;
}
export function isComplete(answers: import("./types").AssessmentAnswers) { const clean = sanitizeAnswers(answers); return questions.every(q => !!clean[q.id]?.length); }
export function answerSummary(answers: import("./types").AssessmentAnswers) {
 const clean = sanitizeAnswers(answers);
 return questions.map(q => { const value = clean[q.id]; const values = Array.isArray(value) ? value : [value]; return { question: q.title, answer: q.options.filter(o => values.includes(o.id)).map(o => o.label).join("; ") || "Não informado" }; });
}
export function readingForInterest(interest: unknown) {
 const guides = {
  "0": {href:"/blog/como-escolher-tricologista", title:"Como escolher um profissional para investigar a queda"},
  "1": {href:"/blog/custo-tratar-calvicie-brasil", title:"Como calcular o custo dos cuidados"},
  "2": {href:"/blog/guia-shampoos-antiqueda", title:"Como comparar shampoos e suas promessas"},
  "3": {href:"/blog/perucas-proteses-capilares", title:"O que comparar em perucas e próteses"},
 };
 return guides[String(interest) as keyof typeof guides] ?? guides["0"];
}

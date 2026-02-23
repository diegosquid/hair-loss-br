import { STEPS } from "./questions";
import {
  AssessmentAnswers,
  DiagnosisLikelihood,
  SeverityInfo,
  SeverityLevel,
  UrgencyInfo,
  UrgencyLevel,
  Gender,
} from "./types";

// ─── Helpers ─────────────────────────────────────────────
function getAnswer(answers: AssessmentAnswers, id: string): string {
  const val = answers[id];
  return Array.isArray(val) ? val[0] || "" : val || "";
}

function getMultiAnswers(answers: AssessmentAnswers, id: string): string[] {
  const val = answers[id];
  return Array.isArray(val) ? val : val ? [val] : [];
}

function getOptionScore(questionId: string, answerId: string): number {
  for (const step of STEPS) {
    for (const q of step.questions) {
      if (q.id === questionId) {
        const opt = q.options.find((o) => o.id === answerId);
        return opt?.score ?? 0;
      }
    }
  }
  return 0;
}

function getQuestionWeight(questionId: string): number {
  for (const step of STEPS) {
    for (const q of step.questions) {
      if (q.id === questionId) return q.weight;
    }
  }
  return 0;
}

// ─── Severity Score ──────────────────────────────────────
export function calculateSeverityScore(answers: AssessmentAnswers, gender: Gender): number {
  const scoredQuestions = [
    "idade",
    "historico_familiar",
    gender === "masculino" ? "padrao_queda_masculino" : "padrao_queda_feminino",
    "duracao",
    "progressao",
    "estresse",
    "nutricao",
    "habitos",
    "condicoes_saude",
    "tratamentos_anteriores",
  ];

  let rawScore = 0;
  let maxScore = 0;

  for (const qId of scoredQuestions) {
    const weight = getQuestionWeight(qId);
    if (weight === 0) continue;

    // Find question to get max possible score
    let maxOptionScore = 0;
    for (const step of STEPS) {
      for (const q of step.questions) {
        if (q.id === qId) {
          if (q.type === "multi") {
            // Max is sum of all non-exclusive options
            maxOptionScore = q.options
              .filter((o) => !o.exclusive)
              .reduce((sum, o) => sum + (o.score ?? 0), 0);
          } else {
            maxOptionScore = Math.max(...q.options.map((o) => o.score ?? 0));
          }
        }
      }
    }

    maxScore += maxOptionScore * weight;

    // Calculate actual score
    const answer = answers[qId];
    if (!answer) continue;

    if (Array.isArray(answer)) {
      // Multi-select: sum scores
      const totalScore = answer.reduce((sum, a) => sum + getOptionScore(qId, a), 0);
      rawScore += totalScore * weight;
    } else {
      rawScore += getOptionScore(qId, answer) * weight;
    }
  }

  if (maxScore === 0) return 0;
  return Math.round((rawScore / maxScore) * 100);
}

// ─── Severity Classification ─────────────────────────────
const SEVERITY_MAP: Record<SeverityLevel, SeverityInfo> = {
  minima: {
    level: "minima",
    label: "Mínima",
    description: "Sua situação capilar está dentro da normalidade. Continue monitorando e mantenha hábitos saudáveis.",
    color: "text-forest-700",
    bgColor: "bg-forest-50",
    borderColor: "border-forest-200",
  },
  leve: {
    level: "leve",
    label: "Leve",
    description: "Sinais iniciais de queda foram identificados. É o momento ideal para prevenção — resultados são melhores quando o tratamento começa cedo.",
    color: "text-sage-700",
    bgColor: "bg-sage-50",
    borderColor: "border-sage-200",
  },
  moderada: {
    level: "moderada",
    label: "Moderada",
    description: "A queda está em estágio intermediário. Tratamentos combinados podem estabilizar e potencialmente reverter parte da perda.",
    color: "text-terra-600",
    bgColor: "bg-terra-50",
    borderColor: "border-terra-200",
  },
  significativa: {
    level: "significativa",
    label: "Significativa",
    description: "A queda é considerável. Recomendamos fortemente acompanhamento dermatológico e um plano de tratamento combinado.",
    color: "text-terra-700",
    bgColor: "bg-terra-50",
    borderColor: "border-terra-300",
  },
  severa: {
    level: "severa",
    label: "Severa",
    description: "A situação exige atenção profissional imediata. Tratamentos cirúrgicos e farmacológicos combinados podem ser necessários.",
    color: "text-terra-800",
    bgColor: "bg-terra-100",
    borderColor: "border-terra-400",
  },
};

export function getSeverity(score: number): SeverityInfo {
  if (score <= 15) return SEVERITY_MAP.minima;
  if (score <= 30) return SEVERITY_MAP.leve;
  if (score <= 50) return SEVERITY_MAP.moderada;
  if (score <= 70) return SEVERITY_MAP.significativa;
  return SEVERITY_MAP.severa;
}

// ─── Diagnosis Likelihoods ───────────────────────────────
export function calculateDiagnoses(answers: AssessmentAnswers, gender: Gender): DiagnosisLikelihood {
  const historico = getAnswer(answers, "historico_familiar");
  const padrao = getAnswer(answers, gender === "masculino" ? "padrao_queda_masculino" : "padrao_queda_feminino");
  const duracao = getAnswer(answers, "duracao");
  const progressao = getAnswer(answers, "progressao");
  const estresse = getAnswer(answers, "estresse");
  const nutricao = getAnswer(answers, "nutricao");
  const condicoes = getMultiAnswers(answers, "condicoes_saude");

  // ── Alopecia Androgenética ──
  let aga = 20; // baseline
  if (historico === "ambos") aga += 30;
  else if (historico === "pai_ou_mae") aga += 22;
  else if (historico === "distante") aga += 10;

  const padraoScore = getOptionScore(
    gender === "masculino" ? "padrao_queda_masculino" : "padrao_queda_feminino",
    padrao
  );
  aga += padraoScore * 3;

  if (duracao === "cronica" || duracao === "longa") aga += 10;
  if (progressao === "lenta") aga += 5;

  // ── Eflúvio Telógeno ──
  let et = 5;
  if (progressao === "rapida") et += 30;
  if (duracao === "recente") et += 20;
  if (estresse === "alto" || estresse === "severo") et += 20;
  if (duracao === "cronica" || duracao === "longa") et -= 15; // long-term unlikely TE

  // ── Deficiência Nutricional ──
  let dn = 5;
  if (nutricao === "pobre") dn += 25;
  if (nutricao === "muito_pobre") dn += 40;
  if (condicoes.includes("anemia")) dn += 30;

  // ── Queda Hormonal ──
  let qh = 5;
  if (condicoes.includes("tireoide")) qh += 35;
  if (condicoes.includes("sop")) qh += 30;
  if (gender === "feminino" && (progressao === "moderada" || progressao === "rapida")) qh += 15;

  // ── Componente Estresse ──
  let ce = 0;
  if (estresse === "alto") ce += 35;
  if (estresse === "severo") ce += 55;
  if (progressao === "moderada" || progressao === "rapida") ce += 15;

  // Normalize to 0-100
  const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

  return {
    alopecia_androgenetica: clamp(aga),
    efluvio_telogeno: clamp(et),
    deficiencia_nutricional: clamp(dn),
    queda_hormonal: clamp(qh),
    componente_estresse: clamp(ce),
  };
}

// ─── Urgency Level ───────────────────────────────────────
const URGENCY_MAP: Record<UrgencyLevel, UrgencyInfo> = {
  acompanhamento: {
    level: "acompanhamento",
    label: "Acompanhamento",
    description: "Monitore sua situação e considere uma consulta preventiva quando conveniente.",
    color: "text-forest-700",
    bgColor: "bg-forest-50",
    borderColor: "border-forest-200",
  },
  consulte_breve: {
    level: "consulte_breve",
    label: "Consulte em Breve",
    description: "Recomendamos agendar uma consulta com dermatologista nos próximos meses.",
    color: "text-sage-700",
    bgColor: "bg-sage-50",
    borderColor: "border-sage-200",
  },
  consulte_logo: {
    level: "consulte_logo",
    label: "Consulte Logo",
    description: "Agende uma consulta com dermatologista nas próximas semanas para avaliação profissional.",
    color: "text-terra-700",
    bgColor: "bg-terra-50",
    borderColor: "border-terra-200",
  },
  urgente: {
    level: "urgente",
    label: "Consulta Urgente",
    description: "Procure um dermatologista o mais breve possível. A queda acelerada pode indicar condições que precisam de atenção imediata.",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    pulse: true,
  },
};

export function getUrgency(score: number, answers: AssessmentAnswers): UrgencyInfo {
  const progressao = getAnswer(answers, "progressao");

  if (score > 70 || (progressao === "rapida" && score > 40)) {
    return URGENCY_MAP.urgente;
  }
  if (score > 50 && (progressao === "moderada" || progressao === "rapida")) {
    return URGENCY_MAP.consulte_logo;
  }
  if (score > 30 || progressao === "moderada") {
    return URGENCY_MAP.consulte_breve;
  }
  return URGENCY_MAP.acompanhamento;
}

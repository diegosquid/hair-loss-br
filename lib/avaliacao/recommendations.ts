import {
  AssessmentAnswers,
  AssessmentResult,
  ActionStep,
  ArticleRecommendation,
  DiagnosisLikelihood,
  Gender,
  SeverityInfo,
} from "./types";

// ─── Article Mapping ─────────────────────────────────────
interface ArticleRule {
  path: string;
  title: string;
  description: string;
  category: "causa" | "medicamento" | "tratamento" | "blog";
  badgeLabel: string;
  badgeColor: string;
  /** Minimum diagnosis likelihood thresholds to show this article */
  triggers?: Partial<DiagnosisLikelihood>;
  /** Only show for this gender */
  genderFilter?: Gender;
  /** Only show if user tried these treatments */
  showIfTried?: string[];
  /** Only show if severity is at least this level */
  minSeverityScore?: number;
  /** Only show for this objective */
  showIfObjetivo?: string[];
  /** Exclude if user already tried this */
  excludeIfTried?: string[];
  priority: number;
}

const ARTICLE_RULES: ArticleRule[] = [
  // ── Causas ──
  {
    path: "/causas/alopecia-androgenetica",
    title: "Alopecia Androgenética: Causas e Tratamento",
    description: "A principal causa de calvície — entenda o papel da genética e do DHT",
    category: "causa",
    badgeLabel: "Causas",
    badgeColor: "badge-terra",
    triggers: { alopecia_androgenetica: 35 },
    priority: 1,
  },
  {
    path: "/causas/estresse-queda-cabelo",
    title: "Estresse e Queda de Cabelo: Eflúvio Telógeno",
    description: "Como o estresse afeta o ciclo capilar e quando o cabelo volta",
    category: "causa",
    badgeLabel: "Causas",
    badgeColor: "badge-terra",
    triggers: { efluvio_telogeno: 30, componente_estresse: 35 },
    priority: 2,
  },
  {
    path: "/causas/nutricao-capilar",
    title: "Nutrição e Queda de Cabelo",
    description: "Ferro, zinco, vitamina D e outros nutrientes essenciais para os fios",
    category: "causa",
    badgeLabel: "Causas",
    badgeColor: "badge-terra",
    triggers: { deficiencia_nutricional: 25 },
    priority: 2,
  },
  {
    path: "/causas/queda-hormonal",
    title: "Queda Hormonal: Tireoide, Menopausa e Mais",
    description: "Como desequilíbrios hormonais causam queda de cabelo",
    category: "causa",
    badgeLabel: "Causas",
    badgeColor: "badge-terra",
    triggers: { queda_hormonal: 25 },
    priority: 2,
  },

  // ── Medicamentos ──
  {
    path: "/medicamentos/minoxidil",
    title: "Minoxidil: Guia Completo",
    description: "Tratamento tópico de primeira linha — como usar, resultados e cuidados",
    category: "medicamento",
    badgeLabel: "Medicamento",
    badgeColor: "badge-green",
    triggers: { alopecia_androgenetica: 25 },
    priority: 1,
  },
  {
    path: "/medicamentos/finasterida",
    title: "Finasterida: Guia para Tratamento da Calvície",
    description: "Bloqueia o DHT responsável pela calvície masculina — eficácia de 90%",
    category: "medicamento",
    badgeLabel: "Medicamento",
    badgeColor: "badge-green",
    triggers: { alopecia_androgenetica: 45 },
    genderFilter: "masculino",
    priority: 1,
  },
  {
    path: "/medicamentos/espironolactona",
    title: "Espironolactona para Alopecia Feminina",
    description: "Anti-andrógeno eficaz para queda de cabelo feminina",
    category: "medicamento",
    badgeLabel: "Medicamento",
    badgeColor: "badge-green",
    triggers: { alopecia_androgenetica: 35 },
    genderFilter: "feminino",
    priority: 1,
  },
  {
    path: "/medicamentos/dutasterida",
    title: "Dutasterida: Alternativa à Finasterida",
    description: "Inibidor dual da 5-alfa-redutase — para quem precisa de algo mais forte",
    category: "medicamento",
    badgeLabel: "Medicamento",
    badgeColor: "badge-green",
    triggers: { alopecia_androgenetica: 55 },
    genderFilter: "masculino",
    showIfTried: ["finasterida"],
    priority: 2,
  },
  {
    path: "/medicamentos/minoxidil-oral",
    title: "Minoxidil Oral: Nova Fronteira Capilar",
    description: "Alternativa ao tópico — em baixas doses, resultados promissores",
    category: "medicamento",
    badgeLabel: "Medicamento",
    badgeColor: "badge-green",
    triggers: { alopecia_androgenetica: 40 },
    showIfTried: ["minoxidil"],
    priority: 3,
  },

  // ── Tratamentos ──
  {
    path: "/tratamentos/microagulhamento",
    title: "Microagulhamento Capilar",
    description: "Potencializa o minoxidil e estimula a regeneração folicular",
    category: "tratamento",
    badgeLabel: "Tratamento",
    badgeColor: "badge-sage",
    triggers: { alopecia_androgenetica: 30 },
    minSeverityScore: 20,
    priority: 2,
  },
  {
    path: "/tratamentos/prp-capilar",
    title: "PRP Capilar (Plasma Rico em Plaquetas)",
    description: "Fatores de crescimento do próprio sangue aplicados no couro cabeludo",
    category: "tratamento",
    badgeLabel: "Tratamento",
    badgeColor: "badge-sage",
    triggers: { alopecia_androgenetica: 40 },
    minSeverityScore: 30,
    priority: 3,
  },
  {
    path: "/tratamentos/laser-terapia",
    title: "Laser de Baixa Potência (LLLT)",
    description: "Fotobiomodulação para estimular o crescimento capilar",
    category: "tratamento",
    badgeLabel: "Tratamento",
    badgeColor: "badge-sage",
    triggers: { alopecia_androgenetica: 25 },
    priority: 3,
  },
  {
    path: "/tratamentos/transplante-capilar",
    title: "Transplante Capilar: Guia Completo FUE e FUT",
    description: "Solução cirúrgica definitiva para áreas sem cabelo",
    category: "tratamento",
    badgeLabel: "Tratamento",
    badgeColor: "badge-sage",
    triggers: { alopecia_androgenetica: 55 },
    minSeverityScore: 45,
    showIfObjetivo: ["restaurar", "recuperar"],
    priority: 2,
  },

  // ── Blog ──
  {
    path: "/blog/escala-norwood",
    title: "Escala Norwood: Identifique seu Grau",
    description: "Guia visual completo dos 7 estágios da calvície masculina",
    category: "blog",
    badgeLabel: "Guia",
    badgeColor: "badge-green",
    triggers: { alopecia_androgenetica: 20 },
    genderFilter: "masculino",
    priority: 3,
  },
  {
    path: "/blog/rotina-capilar-masculina",
    title: "Rotina Capilar Masculina",
    description: "Guia prático de cuidados diários para prevenir a queda",
    category: "blog",
    badgeLabel: "Guia",
    badgeColor: "badge-green",
    genderFilter: "masculino",
    priority: 4,
  },
  {
    path: "/blog/mitos-queda-cabelo",
    title: "10 Mitos sobre Queda de Cabelo",
    description: "Desmentimos as crenças mais comuns com base na ciência",
    category: "blog",
    badgeLabel: "Guia",
    badgeColor: "badge-green",
    priority: 4,
  },
];

// ─── Recommendation Engine ───────────────────────────────
export function getRecommendations(
  diagnoses: DiagnosisLikelihood,
  gender: Gender,
  answers: AssessmentAnswers,
  severityScore: number
): ArticleRecommendation[] {
  const objetivo = Array.isArray(answers.objetivo) ? answers.objetivo[0] : answers.objetivo || "";
  const triedRaw = answers.tratamentos_anteriores;
  const tried = Array.isArray(triedRaw) ? triedRaw : triedRaw ? [triedRaw] : [];

  const matched = ARTICLE_RULES.filter((rule) => {
    // Gender filter
    if (rule.genderFilter && rule.genderFilter !== gender) return false;

    // Severity threshold
    if (rule.minSeverityScore && severityScore < rule.minSeverityScore) return false;

    // Objetivo filter
    if (rule.showIfObjetivo && !rule.showIfObjetivo.includes(objetivo)) return false;

    // Show-if-tried filter
    if (rule.showIfTried && !rule.showIfTried.some((t) => tried.includes(t))) return false;

    // Exclude-if-tried filter
    if (rule.excludeIfTried && rule.excludeIfTried.some((t) => tried.includes(t))) return false;

    // Triggers: at least one diagnosis must exceed its threshold
    if (rule.triggers) {
      const triggerKeys = Object.keys(rule.triggers) as (keyof DiagnosisLikelihood)[];
      if (triggerKeys.length > 0) {
        const anyTriggerMet = triggerKeys.some(
          (key) => diagnoses[key] >= (rule.triggers![key] ?? 0)
        );
        if (!anyTriggerMet) return false;
      }
    }

    return true;
  });

  // Sort by priority and deduplicate
  matched.sort((a, b) => a.priority - b.priority);

  // Build relevance notes
  return matched.map((rule): ArticleRecommendation => {
    let relevanceNote = "";
    if (rule.triggers) {
      const topDiagnosis = Object.entries(rule.triggers).sort(
        ([, a], [, b]) => (b ?? 0) - (a ?? 0)
      )[0];
      if (topDiagnosis) {
        const key = topDiagnosis[0] as keyof DiagnosisLikelihood;
        const diagLabels: Record<keyof DiagnosisLikelihood, string> = {
          alopecia_androgenetica: "alopecia androgenética",
          efluvio_telogeno: "eflúvio telógeno",
          deficiencia_nutricional: "deficiência nutricional",
          queda_hormonal: "queda hormonal",
          componente_estresse: "estresse",
        };
        relevanceNote = `Relevante para seu perfil — indicadores de ${diagLabels[key]}`;
      }
    }

    return {
      path: rule.path,
      title: rule.title,
      description: rule.description,
      category: rule.category,
      badgeColor: rule.badgeColor,
      badgeLabel: rule.badgeLabel,
      relevanceNote,
    };
  });
}

// ─── Action Plan Generator ───────────────────────────────
export function generateActionPlan(
  severity: SeverityInfo,
  diagnoses: DiagnosisLikelihood,
  gender: Gender,
  answers: AssessmentAnswers,
  severityScore: number
): ActionStep[] {
  const steps: ActionStep[] = [];
  const objetivo = Array.isArray(answers.objetivo) ? answers.objetivo[0] : answers.objetivo || "";
  const triedRaw = answers.tratamentos_anteriores;
  const tried = Array.isArray(triedRaw) ? triedRaw : triedRaw ? [triedRaw] : [];
  let stepNum = 1;

  // Step 1: Professional consultation (for moderate+)
  if (severityScore > 30) {
    steps.push({
      number: stepNum++,
      title: "Consulte um Dermatologista",
      description:
        "Agende uma consulta com dermatologista especialista em tricologia para confirmar o diagnóstico e discutir um plano de tratamento personalizado. Leve esta avaliação para a consulta.",
    });
  }

  // Step 2: First-line treatment
  if (diagnoses.alopecia_androgenetica > 40) {
    if (gender === "masculino") {
      if (!tried.includes("finasterida") && !tried.includes("minoxidil")) {
        steps.push({
          number: stepNum++,
          title: "Inicie com Minoxidil + Finasterida",
          description:
            "A combinação de minoxidil tópico 5% e finasterida 1mg/dia é o tratamento padrão-ouro para alopecia androgenética masculina. Resultados visíveis em 3 a 6 meses.",
        });
      } else if (tried.includes("minoxidil") && !tried.includes("finasterida")) {
        steps.push({
          number: stepNum++,
          title: "Adicione Finasterida ao Tratamento",
          description:
            "Como você já usa minoxidil, adicionar finasterida pode potencializar os resultados ao bloquear o DHT na raiz do problema.",
        });
      } else if (tried.includes("finasterida")) {
        steps.push({
          number: stepNum++,
          title: "Avalie Dutasterida ou Minoxidil Oral",
          description:
            "Se a finasterida não trouxe os resultados esperados, converse com seu dermatologista sobre dutasterida (inibição dual) ou minoxidil oral em baixas doses.",
        });
      }
    } else {
      if (!tried.includes("minoxidil")) {
        steps.push({
          number: stepNum++,
          title: "Inicie com Minoxidil Tópico",
          description:
            "O minoxidil 2% ou 5% é o tratamento de primeira linha para queda de cabelo feminina. Aplique no couro cabeludo seco, 1-2x ao dia.",
        });
      } else {
        steps.push({
          number: stepNum++,
          title: "Avalie Espironolactona com seu Médico",
          description:
            "A espironolactona é um anti-andrógeno eficaz para queda feminina. Requer prescrição e acompanhamento médico regular.",
        });
      }
    }
  }

  // Step 3: Lifestyle modifications
  if (diagnoses.componente_estresse > 35 || diagnoses.deficiencia_nutricional > 25) {
    const mods: string[] = [];
    if (diagnoses.componente_estresse > 35) {
      mods.push("gerenciamento de estresse (meditação, exercício, terapia)");
    }
    if (diagnoses.deficiencia_nutricional > 25) {
      mods.push("correção nutricional (exames de ferritina, vitamina D, zinco)");
    }
    steps.push({
      number: stepNum++,
      title: "Ajuste seu Estilo de Vida",
      description: `Fatores modificáveis podem estar contribuindo para a queda. Foque em: ${mods.join(" e ")}. Esses ajustes podem fazer diferença significativa em 2-3 meses.`,
    });
  }

  // Step 4: Monitoring
  steps.push({
    number: stepNum++,
    title: "Monitore os Resultados",
    description:
      "Tire fotos do mesmo ângulo mensalmente para acompanhar a evolução. A maioria dos tratamentos leva 3-6 meses para mostrar resultados visíveis. Não desanime com a \"queda inicial\" — é um sinal de que os folículos estão entrando em ciclo novo.",
  });

  // Step 5: Escalation (if goal is restoration + severe)
  if ((objetivo === "restaurar" || objetivo === "recuperar") && severityScore > 45) {
    steps.push({
      number: stepNum++,
      title: "Avalie Transplante Capilar",
      description:
        "Com o nível de perda identificado, o transplante capilar pode ser uma opção para restaurar áreas sem cabelo. Técnicas modernas como FUE oferecem resultados naturais. Consulte um cirurgião capilar credenciado pela ISHRS.",
    });
  }

  return steps;
}

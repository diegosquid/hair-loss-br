"use client";

import Link from "next/link";
import { AssessmentResult, DiagnosisLikelihood } from "@/lib/avaliacao/types";
import SeverityGauge from "./SeverityGauge";
import ActionPlan from "./ActionPlan";

interface ResultsPageProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const DIAGNOSIS_LABELS: Record<keyof DiagnosisLikelihood, { label: string; icon: string }> = {
  alopecia_androgenetica: { label: "Alopecia Androgenética", icon: "🧬" },
  efluvio_telogeno: { label: "Eflúvio Telógeno", icon: "⚡" },
  deficiencia_nutricional: { label: "Deficiência Nutricional", icon: "🥗" },
  queda_hormonal: { label: "Queda Hormonal", icon: "⚖️" },
  componente_estresse: { label: "Componente Estresse", icon: "🧠" },
};

function DiagnosisBar({
  diagKey,
  value,
}: {
  diagKey: keyof DiagnosisLikelihood;
  value: number;
}) {
  const { label, icon } = DIAGNOSIS_LABELS[diagKey];
  const getBarColor = (v: number) => {
    if (v < 25) return "bg-forest-400";
    if (v < 50) return "bg-sage-500";
    if (v < 75) return "bg-terra-400";
    return "bg-terra-600";
  };

  const getTextColor = (v: number) => {
    if (v < 25) return "text-forest-700";
    if (v < 50) return "text-sage-700";
    if (v < 75) return "text-terra-600";
    return "text-terra-700";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium text-warm-700">{label}</span>
        </div>
        <span className={`text-sm font-bold ${getTextColor(value)}`}>
          {value}%
        </span>
      </div>
      <div className="h-2 bg-warm-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(value)}`}
          style={{ width: `${Math.max(value, 3)}%` }}
        />
      </div>
    </div>
  );
}

function RecommendationCard({
  rec,
}: {
  rec: AssessmentResult["recommendations"][0];
}) {
  return (
    <Link
      href={rec.path}
      className="group block p-4 rounded-xl border border-warm-200/60 bg-white/70 hover:border-forest-200 hover:shadow-sm hover:bg-white transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={rec.badgeColor}>
              {rec.badgeLabel}
            </span>
          </div>
          <h4 className="text-sm font-bold text-warm-900 group-hover:text-forest-700 transition-colors mb-1 line-clamp-2">
            {rec.title}
          </h4>
          <p className="text-xs text-warm-500 line-clamp-2">{rec.description}</p>
          {rec.relevanceNote && (
            <p className="text-xs text-forest-600 mt-1.5 font-medium">
              {rec.relevanceNote}
            </p>
          )}
        </div>
        <svg
          className="w-5 h-5 text-warm-300 group-hover:text-forest-500 transition-colors flex-shrink-0 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default function ResultsPage({ result, onRestart }: ResultsPageProps) {
  const {
    score,
    severity,
    urgency,
    diagnoses,
    recommendations,
    actionPlan,
  } = result;

  // Group recommendations by category
  const causas = recommendations.filter((r) => r.category === "causa");
  const tratamentos = recommendations.filter(
    (r) => r.category === "medicamento" || r.category === "tratamento"
  );
  const blog = recommendations.filter((r) => r.category === "blog");

  // Sort diagnoses by value descending
  const sortedDiagnoses = (
    Object.entries(diagnoses) as [keyof DiagnosisLikelihood, number][]
  ).sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <span className="section-label justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Avaliação Completa
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-950 mb-2">
          Seus Resultados
        </h2>
        <p className="text-warm-500 max-w-xl mx-auto">
          Análise personalizada com base nas suas respostas. Use esses dados como
          referência na sua próxima consulta dermatológica.
        </p>
      </div>

      {/* Severity Gauge */}
      <div className="card !p-8 flex flex-col items-center">
        <SeverityGauge score={score} severity={severity} />
        <p className="mt-4 text-center text-sm text-warm-600 max-w-lg leading-relaxed">
          {severity.description}
        </p>
      </div>

      {/* Urgency banner */}
      <div
        className={`rounded-xl border p-5 ${urgency.bgColor} ${urgency.borderColor} ${
          urgency.pulse ? "animate-pulse-subtle" : ""
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {urgency.level === "urgente" ? (
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div>
            <h3 className={`text-base font-bold ${urgency.color} mb-0.5`}>
              {urgency.label}
            </h3>
            <p className="text-sm text-warm-600">{urgency.description}</p>
          </div>
        </div>
      </div>

      {/* Diagnosis Likelihoods */}
      <div className="card !p-6 md:!p-8">
        <h3 className="text-xl font-display font-bold text-warm-950 mb-1">
          Indicadores por Condição
        </h3>
        <p className="text-sm text-warm-500 mb-6">
          Probabilidade estimada com base no seu perfil (não substitui diagnóstico médico)
        </p>
        <div className="space-y-4">
          {sortedDiagnoses.map(([key, value]) => (
            <DiagnosisBar key={key} diagKey={key} value={value} />
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="card !p-6 md:!p-8">
        <ActionPlan steps={actionPlan} />
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold text-warm-950 mb-1">
              Leituras Recomendadas
            </h3>
            <p className="text-warm-500 text-sm">
              Artigos selecionados especificamente para o seu caso
            </p>
          </div>

          {causas.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-forest-600 uppercase tracking-wider mb-3">
                Entenda sua Condição
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {causas.map((rec) => (
                  <RecommendationCard key={rec.path} rec={rec} />
                ))}
              </div>
            </div>
          )}

          {tratamentos.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-forest-600 uppercase tracking-wider mb-3">
                Tratamentos Recomendados
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {tratamentos.map((rec) => (
                  <RecommendationCard key={rec.path} rec={rec} />
                ))}
              </div>
            </div>
          )}

          {blog.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-forest-600 uppercase tracking-wider mb-3">
                Leitura Complementar
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {blog.map((rec) => (
                  <RecommendationCard key={rec.path} rec={rec} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Medical Disclaimer */}
      <div className="rounded-xl border border-warm-200 bg-cream-50 p-5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-warm-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v.01M12 12a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <div>
            <h4 className="text-sm font-bold text-warm-800 mb-1">
              Aviso Importante
            </h4>
            <p className="text-xs text-warm-500 leading-relaxed">
              Esta avaliação é uma ferramenta educacional e não substitui o diagnóstico
              de um profissional de saúde. Os resultados são baseados em dados estatísticos
              e podem não refletir sua situação específica. Sempre consulte um dermatologista
              ou tricologista antes de iniciar qualquer tratamento.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <button
          onClick={onRestart}
          className="btn-secondary gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refazer Avaliação
        </button>
        <Link
          href="/tratamentos"
          className="btn-primary gap-2 no-underline"
        >
          Explorar Tratamentos
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

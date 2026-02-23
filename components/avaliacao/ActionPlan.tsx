"use client";

import { ActionStep } from "@/lib/avaliacao/types";

interface ActionPlanProps {
  steps: ActionStep[];
}

const STEP_ICONS: Record<number, string> = {
  1: "🩺",
  2: "💊",
  3: "🌿",
  4: "📸",
  5: "✨",
};

export default function ActionPlan({ steps }: ActionPlanProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-warm-950 mb-1">
          Seu Plano de Ação
        </h3>
        <p className="text-warm-500 text-sm">
          Passos recomendados com base no seu perfil
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[22px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-forest-300 via-forest-200 to-transparent" />

        <div className="space-y-5">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex gap-4">
              {/* Timeline node */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-white border-2 border-forest-300 flex items-center justify-center shadow-sm">
                  <span className="text-lg">
                    {step.icon || STEP_ICONS[step.number] || `${step.number}`}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className={`flex-1 pb-2 ${
                  i === steps.length - 1 ? "" : "border-b border-warm-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-forest-600 bg-forest-50 px-2 py-0.5 rounded-full">
                    Passo {step.number}
                  </span>
                </div>
                <h4 className="text-base md:text-lg font-display font-bold text-warm-950 mb-1.5">
                  {step.title}
                </h4>
                <p className="text-sm text-warm-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

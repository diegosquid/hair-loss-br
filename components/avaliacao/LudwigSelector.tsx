"use client";

import { QuestionOption } from "@/lib/avaliacao/types";

interface LudwigSelectorProps {
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
}

// Top-down head silhouettes showing female pattern hair loss (Ludwig scale)
function LudwigSVG({ stage, selected }: { stage: string; selected: boolean }) {
  const hairColor = selected ? "#3d7a54" : "#8B7355";
  const scalpColor = selected ? "#e8f0eb" : "#f5f0eb";
  const strokeColor = selected ? "#3d7a54" : "#b5b1a6";
  const thinColor = selected ? "rgba(61,122,84,0.35)" : "rgba(139,115,85,0.35)";

  return (
    <svg viewBox="0 0 80 100" className="w-full h-full" fill="none">
      {/* Head outline */}
      <ellipse cx="40" cy="50" rx="30" ry="40" fill={scalpColor} stroke={strokeColor} strokeWidth="1.5" />

      {/* Full hair base (long hair, falls below head) */}
      <path
        d="M10 50 C10 20, 70 20, 70 50 C70 34, 64 16, 40 12 C16 16, 10 34, 10 50Z"
        fill={hairColor}
        opacity="0.85"
      />
      {/* Side hair */}
      <path d="M10 50 C8 55, 8 65, 12 80 L14 80 C12 65, 12 55, 12 50Z" fill={hairColor} opacity="0.7" />
      <path d="M70 50 C72 55, 72 65, 68 80 L66 80 C68 65, 68 55, 68 50Z" fill={hairColor} opacity="0.7" />

      {stage === "ludwig_1" && (
        <>
          {/* Slight thinning along the part line */}
          <ellipse cx="40" cy="36" rx="6" ry="10" fill={thinColor} />
          <line x1="40" y1="22" x2="40" y2="48" stroke={scalpColor} strokeWidth="1.5" opacity="0.6" />
        </>
      )}

      {stage === "ludwig_2" && (
        <>
          {/* Wider thinning area */}
          <ellipse cx="40" cy="38" rx="12" ry="14" fill={thinColor} />
          <ellipse cx="40" cy="36" rx="8" ry="10" fill={scalpColor} opacity="0.5" />
          <line x1="40" y1="20" x2="40" y2="52" stroke={scalpColor} strokeWidth="2" opacity="0.7" />
        </>
      )}

      {stage === "ludwig_3" && (
        <>
          {/* Extensive thinning on top */}
          <ellipse cx="40" cy="40" rx="18" ry="18" fill={thinColor} />
          <ellipse cx="40" cy="38" rx="14" ry="14" fill={scalpColor} opacity="0.6" />
          <line x1="40" y1="18" x2="40" y2="56" stroke={scalpColor} strokeWidth="2.5" opacity="0.8" />
        </>
      )}

      {/* Ears */}
      <ellipse cx="9" cy="54" rx="3" ry="6" fill={scalpColor} stroke={strokeColor} strokeWidth="1" />
      <ellipse cx="71" cy="54" rx="3" ry="6" fill={scalpColor} stroke={strokeColor} strokeWidth="1" />
    </svg>
  );
}

const LUDWIG_DESCRIPTIONS: Record<string, string> = {
  ludwig_1: "Afinamento leve na linha central do cabelo",
  ludwig_2: "Área de afinamento mais visível, risca alargada",
  ludwig_3: "Rarefação extensa no topo da cabeça",
};

export default function LudwigSelector({ options, value, onChange }: LudwigSelectorProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-warm-950 mb-1.5">
          Identifique seu padrão na Escala Ludwig
        </h3>
        <p className="text-warm-500 text-sm md:text-base">
          Clique na imagem que mais se parece com o seu caso atual
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`group relative flex flex-col items-center p-5 rounded-xl border-[1.5px] transition-all duration-200 ease-out ${
                selected
                  ? "border-forest-400 bg-forest-50/80 shadow-md shadow-forest-100/50 scale-[1.02]"
                  : "border-warm-200/60 bg-white/70 hover:border-forest-200 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="w-20 h-24 md:w-24 md:h-28 mb-3">
                <LudwigSVG stage={option.id} selected={selected} />
              </div>
              <span
                className={`text-sm font-semibold mb-1 transition-colors ${
                  selected ? "text-forest-700" : "text-warm-700 group-hover:text-warm-900"
                }`}
              >
                {option.label}
              </span>
              <span className="text-xs text-warm-500 text-center leading-snug">
                {LUDWIG_DESCRIPTIONS[option.id]}
              </span>
              {selected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-forest-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

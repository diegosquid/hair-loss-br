"use client";

import { QuestionOption } from "@/lib/avaliacao/types";

interface NorwoodSelectorProps {
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
}

// Top-down head silhouettes showing progressive male pattern baldness
function NorwoodSVG({ stage, selected }: { stage: string; selected: boolean }) {
  const hairColor = selected ? "#3e7c55" : "#897a6b";
  const scalpColor = selected ? "#ecf2ee" : "#f7f5f2";
  const scalpShadow = selected ? "#d8e6de" : "#e8e3dc";
  const strokeColor = selected ? "#3e7c55" : "#c2b9af";

  return (
    <svg viewBox="0 0 80 100" className="w-full h-full drop-shadow-sm transition-all duration-300" fill="none">
      <defs>
        {/* Clip path defining the exact shape of the scalp to ensure hair perfectly conforms to the edges */}
        <clipPath id="head-clip">
          <path d="M 40 12 C 55 12 66 26 68 45 C 70 65 65 88 40 88 C 15 88 10 65 12 45 C 14 26 25 12 40 12 Z" />
        </clipPath>
      </defs>

      {/* Ears placed behind the head */}
      <path d="M 16 46 C 4 48 4 60 16 64" fill={scalpShadow} stroke={strokeColor} strokeWidth="1.2" />
      <path d="M 64 46 C 76 48 76 60 64 64" fill={scalpShadow} stroke={strokeColor} strokeWidth="1.2" />

      {/* Head Outline (Scalp Base) - pear-shaped top-down */}
      <path 
        d="M 40 12 C 55 12 66 26 68 45 C 70 65 65 88 40 88 C 15 88 10 65 12 45 C 14 26 25 12 40 12 Z" 
        fill={scalpColor} 
        stroke={strokeColor} 
        strokeWidth="1.2" 
      />

      {/* Nose protrusion indicating the front */}
      <path d="M 37 12 C 37 6 43 6 43 12" fill={scalpColor} stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />

      {/* Hair coverage group clipped to the head outline */}
      <g clipPath="url(#head-clip)">
        {/* We make the generic hair paths slightly wider/longer so the clipPath cuts them perfectly at the edge */}
        {stage === "norwood_1" && (
          <path 
            // Norwood I: Full hairline, no noticeable recession
            d="M 10 24 Q 40 14 70 24 L 75 95 L 5 95 Z" 
            fill={hairColor} opacity="0.95"
          />
        )}
        {stage === "norwood_2" && (
          <path 
            // Norwood II: Slight temple recession
            d="M 12 30 Q 30 25 32 18 Q 40 14 48 18 Q 50 25 68 30 L 75 95 L 5 95 Z" 
            fill={hairColor} opacity="0.95"
          />
        )}
        {stage === "norwood_3" && (
          <path 
            // Norwood III: Deeper temple recession (M shape)
            d="M 14 38 Q 34 32 34 20 Q 40 16 46 20 Q 46 32 66 38 L 75 95 L 5 95 Z" 
            fill={hairColor} opacity="0.95"
          />
        )}
        {stage === "norwood_3v" && (
          <>
            <path 
              // Norwood III Vertex: Deeper temple recession + crown thinning
              d="M 14 38 Q 34 32 34 20 Q 40 16 46 20 Q 46 32 66 38 L 75 95 L 5 95 Z" 
              fill={hairColor} opacity="0.95"
            />
            <ellipse cx="40" cy="70" rx="9" ry="11" fill={scalpColor} />
          </>
        )}
        {stage === "norwood_4" && (
          <>
            <path 
              // Norwood IV: Further recession + distinct larger crown spot
              d="M 16 42 Q 34 38 34 23 Q 40 18 46 23 Q 46 38 64 42 L 75 95 L 5 95 Z" 
              fill={hairColor} opacity="0.95"
            />
            <ellipse cx="40" cy="68" rx="13" ry="16" fill={scalpColor} />
          </>
        )}
        {stage === "norwood_5" && (
          <>
            <path 
              // Norwood V: Crown and anterior bald spots separated by a narrow band of hair
              d="M 16 48 Q 32 44 34 28 Q 40 22 46 28 Q 48 44 64 48 L 75 95 L 5 95 Z" 
              fill={hairColor} opacity="0.95"
            />
            <ellipse cx="40" cy="66" rx="17" ry="21" fill={scalpColor} />
          </>
        )}
        {stage === "norwood_6" && (
          <path 
            // Norwood VI: The band separating anterior and crown is gone. Just a large bald area
            d="M 5 56 C 24 70 32 76 40 76 C 48 76 56 70 75 56 L 75 95 L 5 95 Z" 
            fill={hairColor} opacity="0.95"
          />
        )}
        {stage === "norwood_7" && (
          <path 
            // Norwood VII: Only a narrow horseshoe band of hair remains at sides/back
            d="M 5 66 C 22 74 32 79 40 79 C 48 79 58 74 75 66 L 75 95 L 5 95 Z" 
            fill={hairColor} opacity="0.95"
          />
        )}
      </g>

      {/* Subtle shine highlight to suggest scalp shape */}
      <path 
        d="M 40 12 C 55 12 66 26 68 45 C 70 65 65 88 40 88 C 15 88 10 65 12 45 C 14 26 25 12 40 12 Z" 
        fill="transparent" 
        stroke="rgba(255,255,255,0.6)" 
        strokeWidth="1.5" 
        strokeDasharray="18 40 0 100" 
        strokeLinecap="round" 
        style={{ pointerEvents: 'none' }}
      />
    </svg>
  );
}

export default function NorwoodSelector({ options, value, onChange }: NorwoodSelectorProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-warm-950 mb-1.5">
          Identifique seu padrão na Escala Norwood
        </h3>
        <p className="text-warm-500 text-sm md:text-base">
          Clique na imagem que mais se parece com o seu caso atual
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`group relative flex flex-col items-center p-3 rounded-xl border-[1.5px] transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-forest-500 ${
                selected
                  ? "border-forest-500 bg-forest-50/50 shadow-md shadow-forest-100/40 scale-[1.02] transform"
                  : "border-warm-200/80 bg-white hover:border-forest-300 hover:bg-forest-50/20 hover:shadow-sm hover:-translate-y-0.5"
              }`}
            >
              <div className="w-16 h-20 md:w-20 md:h-24 mb-3 transition-transform duration-300 group-hover:scale-105">
                <NorwoodSVG stage={option.id} selected={selected} />
              </div>
              <span
                className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${
                  selected ? "text-forest-700" : "text-warm-600 group-hover:text-warm-900"
                }`}
              >
                {option.label}
              </span>
              
              {/* Checkmark animation layer */}
              <div 
                className={`absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-forest-500 text-white transition-all duration-300 ${
                  selected ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

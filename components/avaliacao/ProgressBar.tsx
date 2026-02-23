"use client";

import { Step } from "@/lib/avaliacao/types";

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Mobile: compact */}
      <div className="flex items-center justify-between md:hidden mb-2">
        <span className="text-sm font-medium text-warm-600">
          Etapa {currentStep + 1} de {steps.length}
        </span>
        <span className="text-sm font-semibold text-forest-700">
          {steps[currentStep]?.title}
        </span>
      </div>

      {/* Progress track */}
      <div className="relative">
        {/* Background track */}
        <div className="h-1.5 md:h-2 bg-warm-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-forest-600 to-forest-400 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        {/* Desktop: step labels */}
        <div className="hidden md:flex justify-between mt-3">
          {steps.map((step, i) => (
            <button
              key={step.id}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 ${
                i === currentStep
                  ? "text-forest-700"
                  : i < currentStep
                  ? "text-forest-500"
                  : "text-warm-400"
              }`}
              disabled
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                  i === currentStep
                    ? "bg-forest-600 text-white scale-110"
                    : i < currentStep
                    ? "bg-forest-100 text-forest-600"
                    : "bg-warm-100 text-warm-400"
                }`}
              >
                {i < currentStep ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="hidden lg:inline">{step.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Question, QuestionOption } from "@/lib/avaliacao/types";

interface QuestionCardProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export default function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const isMulti = question.type === "multi";
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const handleSelect = (optionId: string, option: QuestionOption) => {
    if (isMulti) {
      // Multi-select logic
      if (option.exclusive) {
        // Exclusive option: deselect everything else
        onChange([optionId]);
      } else {
        // Non-exclusive: toggle, but remove any exclusive option
        const withoutExclusive = selectedValues.filter((v) => {
          const opt = question.options.find((o) => o.id === v);
          return !opt?.exclusive;
        });

        if (withoutExclusive.includes(optionId)) {
          const filtered = withoutExclusive.filter((v) => v !== optionId);
          onChange(filtered.length > 0 ? filtered : []);
        } else {
          onChange([...withoutExclusive, optionId]);
        }
      }
    } else {
      // Single-select
      onChange(optionId);
    }
  };

  const isSelected = (optionId: string) => selectedValues.includes(optionId);

  return (
    <div className="space-y-5">
      {/* Question header */}
      <div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-warm-950 mb-1.5">
          {question.title}
        </h3>
        {question.description && (
          <p className="text-warm-500 text-sm md:text-base">
            {question.description}
          </p>
        )}
        {isMulti && (
          <p className="text-forest-600 text-xs font-medium mt-1.5">
            Selecione todas as opções que se aplicam
          </p>
        )}
      </div>

      {/* Options grid */}
      <div className={`grid gap-3 ${
        question.options.length <= 4
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}>
        {question.options.map((option) => {
          const selected = isSelected(option.id);
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id, option)}
              className={`group relative text-left p-4 rounded-xl border-[1.5px] transition-all duration-200 ease-out ${
                selected
                  ? "border-forest-400 bg-forest-50/80 shadow-md shadow-forest-100/50"
                  : "border-warm-200/60 bg-white/70 hover:border-forest-200 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox/Radio indicator */}
                <div
                  className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-${isMulti ? "md" : "full"} border-[1.5px] flex items-center justify-center transition-all duration-200 ${
                    selected
                      ? "border-forest-500 bg-forest-500"
                      : "border-warm-300 bg-white group-hover:border-forest-300"
                  }`}
                >
                  {selected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <span
                  className={`text-sm md:text-[15px] font-medium leading-snug transition-colors ${
                    selected ? "text-forest-800" : "text-warm-700 group-hover:text-warm-900"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { STEPS } from "@/lib/avaliacao/questions";
import {
  calculateSeverityScore,
  getSeverity,
  calculateDiagnoses,
  getUrgency,
} from "@/lib/avaliacao/scoring";
import { getRecommendations, generateActionPlan } from "@/lib/avaliacao/recommendations";
import {
  AssessmentAnswers,
  AssessmentResult,
  Gender,
  Question,
} from "@/lib/avaliacao/types";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import NorwoodSelector from "./NorwoodSelector";
import LudwigSelector from "./LudwigSelector";
import ResultsPage from "./ResultsPage";

const STORAGE_KEY = "capilarmente_avaliacao";

function getStoredData(): { step: number; answers: AssessmentAnswers } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function storeData(step: number, answers: AssessmentAnswers) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
  } catch {}
}

function clearStoredData() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export default function AvaliacaoWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Restore from sessionStorage on mount
  useEffect(() => {
    const stored = getStoredData();
    if (stored) {
      setCurrentStep(stored.step);
      setAnswers(stored.answers);
    }
    setInitialized(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (initialized && !result) {
      storeData(currentStep, answers);
    }
  }, [currentStep, answers, initialized, result]);

  const gender = (answers.genero as Gender) || "masculino";

  // Get questions for current step, filtered by gender
  const currentStepData = STEPS[currentStep];
  const visibleQuestions = currentStepData
    ? currentStepData.questions.filter(
        (q) => !q.genderFilter || q.genderFilter === gender
      )
    : [];

  // Check if current step is complete
  const isStepComplete = visibleQuestions.every((q) => {
    const val = answers[q.id];
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  });

  const handleAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const animateTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 250);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      animateTransition(() => setCurrentStep((s) => s + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Calculate results
      const score = calculateSeverityScore(answers, gender);
      const severity = getSeverity(score);
      const diagnoses = calculateDiagnoses(answers, gender);
      const urgency = getUrgency(score, answers);
      const recommendations = getRecommendations(diagnoses, gender, answers, score);
      const objetivo = Array.isArray(answers.objetivo)
        ? answers.objetivo[0]
        : answers.objetivo || "";
      const actionPlan = generateActionPlan(severity, diagnoses, gender, answers, score);

      setResult({
        score,
        severity,
        urgency,
        diagnoses,
        recommendations,
        actionPlan,
        gender,
        objetivo,
      });
      clearStoredData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      animateTransition(() => setCurrentStep((s) => s - 1));
    }
  };

  const handleRestart = () => {
    clearStoredData();
    setResult(null);
    setCurrentStep(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading state while hydrating
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-3 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Show results
  if (result) {
    return <ResultsPage result={result} onRestart={handleRestart} />;
  }

  // Render question based on type
  const renderQuestion = (question: Question) => {
    const val = answers[question.id];

    switch (question.type) {
      case "norwood":
        return (
          <NorwoodSelector
            options={question.options}
            value={(val as string) || ""}
            onChange={(v) => handleAnswer(question.id, v)}
          />
        );
      case "ludwig":
        return (
          <LudwigSelector
            options={question.options}
            value={(val as string) || ""}
            onChange={(v) => handleAnswer(question.id, v)}
          />
        );
      default:
        return (
          <QuestionCard
            question={question}
            value={val || (question.type === "multi" ? [] : "")}
            onChange={(v) => handleAnswer(question.id, v)}
          />
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress */}
      <ProgressBar steps={STEPS} currentStep={currentStep} />

      {/* Step header */}
      <div className="text-center">
        <span className="text-3xl mb-2 block">{currentStepData.icon}</span>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-warm-950 mb-1">
          {currentStepData.title}
        </h2>
        <p className="text-warm-500 text-sm md:text-base">
          {currentStepData.subtitle}
        </p>
      </div>

      {/* Questions */}
      <div
        className={`space-y-8 transition-all duration-250 ease-out ${
          isTransitioning
            ? "opacity-0 translate-x-4"
            : "opacity-100 translate-x-0"
        }`}
      >
        {visibleQuestions.map((q) => (
          <div key={q.id} className="card !p-6 md:!p-8">
            {renderQuestion(q)}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            currentStep === 0
              ? "text-warm-300 cursor-not-allowed"
              : "text-warm-600 hover:text-warm-800 hover:bg-warm-100"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>

        <div className="text-xs text-warm-400 hidden sm:block">
          {currentStep + 1} / {STEPS.length}
        </div>

        <button
          onClick={handleNext}
          disabled={!isStepComplete}
          className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
            isStepComplete
              ? "bg-forest-600 text-white hover:bg-forest-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              : "bg-warm-100 text-warm-400 cursor-not-allowed"
          }`}
        >
          {currentStep === STEPS.length - 1 ? (
            <>
              Ver Resultados
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </>
          ) : (
            <>
              Próximo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

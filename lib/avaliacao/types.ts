export interface QuestionOption { id: string; label: string; exclusive?: boolean }
export interface Question { id: string; title: string; description?: string; type: "single" | "multi"; options: QuestionOption[] }
export type AssessmentAnswers = Record<string, string | string[]>;

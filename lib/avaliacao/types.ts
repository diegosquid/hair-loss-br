export type Gender = "masculino" | "feminino";

export interface QuestionOption {
  id: string;
  label: string;
  score?: number;
  flags?: string[];
  /** If true, selecting this deselects all others (for multi-select "Nenhum" options) */
  exclusive?: boolean;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: "single" | "multi" | "norwood" | "ludwig";
  options: QuestionOption[];
  weight: number;
  /** Only show for this gender */
  genderFilter?: Gender;
}

export interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  questions: Question[];
}

export interface AssessmentAnswers {
  [questionId: string]: string | string[];
}

export interface DiagnosisLikelihood {
  alopecia_androgenetica: number;
  efluvio_telogeno: number;
  deficiencia_nutricional: number;
  queda_hormonal: number;
  componente_estresse: number;
}

export type SeverityLevel = "minima" | "leve" | "moderada" | "significativa" | "severa";
export type UrgencyLevel = "acompanhamento" | "consulte_breve" | "consulte_logo" | "urgente";

export interface SeverityInfo {
  level: SeverityLevel;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface UrgencyInfo {
  level: UrgencyLevel;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  pulse?: boolean;
}

export interface ArticleRecommendation {
  path: string;
  title: string;
  description: string;
  category: "causa" | "medicamento" | "tratamento" | "blog";
  badgeColor: string;
  badgeLabel: string;
  relevanceNote: string;
}

export interface ActionStep {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

export interface AssessmentResult {
  score: number;
  severity: SeverityInfo;
  urgency: UrgencyInfo;
  diagnoses: DiagnosisLikelihood;
  recommendations: ArticleRecommendation[];
  actionPlan: ActionStep[];
  gender: Gender;
  objetivo: string;
}

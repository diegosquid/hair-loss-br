export interface CostInputs { monthly: number; consultation: number; visits: number; procedure: number }
export function calculateCosts(input: CostInputs) {
 const values = Object.values(input);
 if (values.some(value => !Number.isFinite(value) || value < 0) || !Number.isInteger(input.visits)) throw new Error("Use valores não negativos e uma quantidade inteira de consultas.");
 const recurringAnnual = Math.round((input.monthly * 12 + input.consultation * input.visits) * 100) / 100;
 const firstYear = Math.round((recurringAnnual + input.procedure) * 100) / 100;
 return { recurringAnnual, firstYear, monthlyEquivalent: firstYear / 12 };
}

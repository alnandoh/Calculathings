export type CompoundFrequency =
  | "annually"
  | "quarterly"
  | "monthly"
  | "weekly"
  | "daily";
export type ContributionTiming = "beginning" | "end";
export type ContributionFrequency = "monthly" | "annually";

export interface InvestmentCalculatorInputs {
  startingAmount: number;
  years: number;
  rate: number;
  compoundFrequency: CompoundFrequency;
  additionalContribution: number;
  contributionTiming: ContributionTiming;
  contributionFrequency: ContributionFrequency;
}

export interface CalculationResult {
  endBalance: number;
  startingAmount: number;
  totalContributions: number;
  totalInterest: number;
  schedule: ScheduleEntry[];
}

export interface ScheduleEntry {
  period: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
}

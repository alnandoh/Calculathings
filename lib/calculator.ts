import type {
  InvestmentCalculatorInputs,
  CalculationResult,
  CompoundFrequency,
} from "@/types/calculator";

const getCompoundFrequencyNumber = (frequency: CompoundFrequency): number => {
  const frequencies = {
    annually: 1,
    quarterly: 4,
    monthly: 12,
    weekly: 52,
    daily: 365,
  };
  return frequencies[frequency];
};

export function calculateInvestment(
  inputs: InvestmentCalculatorInputs
): CalculationResult {
  const {
    startingAmount,
    years,
    rate,
    compoundFrequency,
    additionalContribution,
    contributionTiming,
    contributionFrequency,
  } = inputs;

  const periodsPerYear = 12; // We'll calculate monthly regardless of display preference
  const totalPeriods = years * periodsPerYear;
  const compoundsPerYear = getCompoundFrequencyNumber(compoundFrequency);
  const effectiveRate = rate / 100;

  const contributionAmount =
    contributionFrequency === "annually"
      ? additionalContribution / 12
      : additionalContribution;

  let currentBalance = startingAmount;
  let totalContributions = 0;
  const schedule = [];

  for (let period = 0; period < totalPeriods; period++) {
    const startBalance = currentBalance;

    // Add contribution at beginning if selected
    if (contributionTiming === "beginning") {
      currentBalance += contributionAmount;
      totalContributions += contributionAmount;
    }

    // Calculate interest for this period
    const monthlyRate = effectiveRate / compoundsPerYear;
    const monthlyCompounds = compoundsPerYear / 12;
    const interest =
      currentBalance * (Math.pow(1 + monthlyRate, monthlyCompounds) - 1);
    currentBalance += interest;

    // Add contribution at end if selected
    if (contributionTiming === "end") {
      currentBalance += contributionAmount;
      totalContributions += contributionAmount;
    }

    schedule.push({
      period,
      startBalance,
      contribution: contributionAmount,
      interest,
      endBalance: currentBalance,
    });
  }

  return {
    endBalance: currentBalance,
    startingAmount,
    totalContributions,
    totalInterest: currentBalance - startingAmount - totalContributions,
    schedule,
  };
}

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) return principal / numberOfPayments;

  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return payment;
}

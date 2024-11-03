import { CalculatorLayout } from "@/components/layouts/calculator-layout";
import { InvestmentForm } from "@/components/calculators/investment-form";

export default function InvestmentCalculator() {
  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="Calculate your investment growth with compound interest"
    >
      <InvestmentForm />
    </CalculatorLayout>
  );
}

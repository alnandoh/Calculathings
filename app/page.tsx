import { CalculatorCard } from "@/components/calculators/calculator-card";
import { Calculator, PiggyBank, LineChart, Wallet } from "lucide-react";

const calculators = [
  {
    title: "Investment Calculator",
    description: "Calculate compound interest, ROI, and investment growth",
    icon: PiggyBank,
    href: "/calculators/investment",
  },
  {
    title: "Loan Calculator",
    description: "Calculate EMI, total interest, and loan amortization",
    icon: Wallet,
    href: "/calculators/loan",
  },
  {
    title: "Retirement Calculator",
    description: "Plan your retirement savings and estimate future needs",
    icon: LineChart,
    href: "/calculators/retirement",
  },
  {
    title: "Other Calculators",
    description: "More financial tools and calculators",
    icon: Calculator,
    href: "/calculators",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Financial Calculators
          </h1>
          <p className="text-muted-foreground">
            Make smarter financial decisions with our easy-to-use calculators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calculator) => (
            <CalculatorCard key={calculator.title} {...calculator} />
          ))}
        </div>
      </div>
    </main>
  );
}

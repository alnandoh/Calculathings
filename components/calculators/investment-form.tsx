"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateInvestment } from "@/lib/calculator";
import { InvestmentResults } from "./investment-results";
import { InvestmentSchedule } from "./investment-schedule";
import type {
  InvestmentCalculatorInputs,
  CalculationResult,
} from "@/types/calculator";

const compoundOptions = [
  { value: "annually", label: "Annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
];

export function InvestmentForm() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [inputs, setInputs] = useState<InvestmentCalculatorInputs>({
    startingAmount: 10000,
    years: 10,
    rate: 7,
    compoundFrequency: "annually",
    additionalContribution: 100,
    contributionTiming: "end",
    contributionFrequency: "monthly",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = calculateInvestment(inputs);
    setResult(results);
  };

  const handleInputChange = (
    field: keyof InvestmentCalculatorInputs,
    value: string | number
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startingAmount">Starting Amount (IDR)</Label>
            <Input
              id="startingAmount"
              type="number"
              value={inputs.startingAmount}
              onChange={(e) =>
                handleInputChange("startingAmount", Number(e.target.value))
              }
              placeholder="Enter starting amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Investment Period (Years)</Label>
            <Input
              id="years"
              type="number"
              value={inputs.years}
              onChange={(e) =>
                handleInputChange("years", Number(e.target.value))
              }
              placeholder="Enter number of years"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={inputs.rate}
              onChange={(e) =>
                handleInputChange("rate", Number(e.target.value))
              }
              placeholder="Enter interest rate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compound">Compound Frequency</Label>
            <Select
              value={inputs.compoundFrequency}
              onValueChange={(value) =>
                handleInputChange("compoundFrequency", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {compoundOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalContribution">
              Additional Contribution (IDR)
            </Label>
            <Input
              id="additionalContribution"
              type="number"
              value={inputs.additionalContribution}
              onChange={(e) =>
                handleInputChange(
                  "additionalContribution",
                  Number(e.target.value)
                )
              }
              placeholder="Enter contribution amount"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Contribution Timing</Label>
            <RadioGroup
              value={inputs.contributionTiming}
              onValueChange={(value) =>
                handleInputChange("contributionTiming", value)
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginning" id="beginning" />
                <Label htmlFor="beginning">Beginning of Period</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="end" id="end" />
                <Label htmlFor="end">End of Period</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Contribution Frequency</Label>
            <RadioGroup
              value={inputs.contributionFrequency}
              onValueChange={(value) =>
                handleInputChange("contributionFrequency", value)
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annually" id="annually" />
                <Label htmlFor="annually">Annually</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Calculate
        </Button>
      </form>

      {result && (
        <div className="space-y-6">
          <InvestmentResults result={result} />
          <InvestmentSchedule result={result} />
        </div>
      )}
    </div>
  );
}

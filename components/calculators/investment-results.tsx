"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import type { CalculationResult } from "@/types/calculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface InvestmentResultsProps {
  result: CalculationResult;
}

export function InvestmentResults({ result }: InvestmentResultsProps) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const total =
    result.startingAmount + result.totalContributions + result.totalInterest;

  const pieData = [
    {
      name: "Starting Amount",
      value: result.startingAmount,
      percentage: ((result.startingAmount / total) * 100).toFixed(1),
    },
    {
      name: "Total Contributions",
      value: result.totalContributions,
      percentage: ((result.totalContributions / total) * 100).toFixed(1),
    },
    {
      name: "Total Interest",
      value: result.totalInterest,
      percentage: ((result.totalInterest / total) * 100).toFixed(1),
    },
  ];

  const COLORS = ["#2563eb", "#16a34a", "#dc2626"];

  const CustomizedLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-2 text-sm">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div
              style={{ backgroundColor: entry.color }}
              className="w-3 h-3 rounded-full"
            />
            <span>
              {entry.value} ({pieData[index].percentage}%)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Investment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">End Balance</p>
                <p className="text-2xl font-bold">
                  {formatter.format(result.endBalance)}
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Starting Amount
                  </p>
                  <p className="font-medium">
                    {formatter.format(result.startingAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Contributions
                  </p>
                  <p className="font-medium">
                    {formatter.format(result.totalContributions)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Interest
                  </p>
                  <p className="font-medium">
                    {formatter.format(result.totalInterest)}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend content={<CustomizedLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

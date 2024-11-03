"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CalculationResult } from "@/types/calculator";

interface InvestmentScheduleProps {
  result: CalculationResult;
}

export function InvestmentSchedule({ result }: InvestmentScheduleProps) {
  const [viewMode, setViewMode] = useState<"annually" | "monthly">("annually");
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const filteredSchedule =
    viewMode === "annually"
      ? result.schedule.filter((entry) => entry.period % 12 === 0)
      : result.schedule;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Accumulation Schedule</CardTitle>
        <Select
          value={viewMode}
          onValueChange={(value: "annually" | "monthly") => setViewMode(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="annually">Annually</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {viewMode === "annually" ? "Year" : "Month"}
              </TableHead>
              <TableHead>Starting Balance</TableHead>
              <TableHead>Contribution</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Ending Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedule.map((entry) => (
              <TableRow key={entry.period}>
                <TableCell>
                  {viewMode === "annually"
                    ? Math.floor(entry.period / 12)
                    : entry.period + 1}
                </TableCell>
                <TableCell>{formatter.format(entry.startBalance)}</TableCell>
                <TableCell>{formatter.format(entry.contribution)}</TableCell>
                <TableCell>{formatter.format(entry.interest)}</TableCell>
                <TableCell>{formatter.format(entry.endBalance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

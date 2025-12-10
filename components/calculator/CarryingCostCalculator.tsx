'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { calculateCarryingCost, CarryingCostResults, formatCurrency } from '@/lib/calculations';
import { Home } from 'lucide-react';

interface CarryingCostCalculatorProps {
  currentHomeValue: number;
}

export default function CarryingCostCalculator({ currentHomeValue }: CarryingCostCalculatorProps) {
  const [monthlyMortgage, setMonthlyMortgage] = useState(2500);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.0);
  const [monthlyUtilities, setMonthlyUtilities] = useState(250);
  const [carryingPeriodMonths, setCarryingPeriodMonths] = useState(2);

  const results: CarryingCostResults = calculateCarryingCost({
    monthlyMortgage,
    propertyTaxRate,
    monthlyUtilities,
    carryingPeriodMonths,
    currentHomeValue,
  });

  return (
    <Card className="border-blue-200 dark:border-blue-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Carrying Cost Calculator
        </CardTitle>
        <CardDescription>
          Estimate costs if you buy before selling (typical carrying period: 2 months)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyMortgage">Monthly Mortgage Payment</Label>
            <Input
              id="monthlyMortgage"
              type="number"
              value={monthlyMortgage}
              onChange={(e) => setMonthlyMortgage(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyTaxRate">Property Tax Rate (%)</Label>
            <Input
              id="propertyTaxRate"
              type="number"
              step="0.1"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyUtilities">Monthly Utilities</Label>
            <Input
              id="monthlyUtilities"
              type="number"
              value={monthlyUtilities}
              onChange={(e) => setMonthlyUtilities(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carryingPeriod">Carrying Period (Months)</Label>
            <Input
              id="carryingPeriod"
              type="number"
              value={carryingPeriodMonths}
              onChange={(e) => setCarryingPeriodMonths(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Monthly Mortgage</span>
            <span className="font-medium">{formatCurrency(results.monthlyMortgage)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Monthly Property Tax</span>
            <span className="font-medium">{formatCurrency(results.monthlyPropertyTax)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Monthly Utilities</span>
            <span className="font-medium">{formatCurrency(results.monthlyUtilities)}</span>
          </div>

          <div className="border-t pt-3 flex justify-between items-center">
            <span className="font-semibold">Total Monthly Cost</span>
            <span className="font-bold">{formatCurrency(results.totalMonthly)}</span>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total Carrying Cost</span>
              <span className="font-bold text-2xl text-blue-700 dark:text-blue-400">
                {formatCurrency(results.totalCarryingCost)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              For {carryingPeriodMonths} month{carryingPeriodMonths !== 1 ? 's' : ''} of ownership overlap
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

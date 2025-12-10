'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FutureValueProjections, formatCurrency } from '@/lib/calculations';
import { TrendingUp } from 'lucide-react';

interface FutureValueProjectionsProps {
  projections: FutureValueProjections;
  currentEquity: number;
}

export default function FutureValueProjectionsCard({ projections, currentEquity }: FutureValueProjectionsProps) {
  const calculateGrowth = (futureValue: number) => {
    return futureValue - currentEquity;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Future Value Projections
        </CardTitle>
        <CardDescription>
          Based on your remaining equity of {formatCurrency(currentEquity)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="font-semibold text-sm text-muted-foreground">High-Yield Savings Account (4%)</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">1 Year</div>
              <div className="font-bold text-lg">{formatCurrency(projections.hysa.oneYear)}</div>
              <div className="text-xs text-green-600">+{formatCurrency(calculateGrowth(projections.hysa.oneYear))}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">5 Years</div>
              <div className="font-bold text-lg">{formatCurrency(projections.hysa.fiveYear)}</div>
              <div className="text-xs text-green-600">+{formatCurrency(calculateGrowth(projections.hysa.fiveYear))}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-semibold text-sm text-muted-foreground">Market - Conservative (9%)</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">1 Year</div>
              <div className="font-bold text-lg">{formatCurrency(projections.marketConservative.oneYear)}</div>
              <div className="text-xs text-green-600">+{formatCurrency(calculateGrowth(projections.marketConservative.oneYear))}</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">5 Years</div>
              <div className="font-bold text-lg">{formatCurrency(projections.marketConservative.fiveYear)}</div>
              <div className="text-xs text-green-600">+{formatCurrency(calculateGrowth(projections.marketConservative.fiveYear))}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-semibold text-sm text-muted-foreground">Market - Optimistic (11%)</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">1 Year</div>
              <div className="font-bold text-lg">{formatCurrency(projections.marketOptimistic.oneYear)}</div>
              <div className="text-xs text-green-600">+{formatCurrency(calculateGrowth(projections.marketOptimistic.oneYear))}</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">5 Years</div>
              <div className="font-bold text-lg">{formatCurrency(projections.marketOptimistic.fiveYear)}</div>
              <div className="text-xs text-green-600">+{formatCurrency(calculateGrowth(projections.marketOptimistic.fiveYear))}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

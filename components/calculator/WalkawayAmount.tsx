'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EquityResults, formatCurrency, formatPercent } from '@/lib/calculations';
import { CheckCircle2 } from 'lucide-react';

interface WalkawayAmountProps {
  results: EquityResults;
}

export default function WalkawayAmount({ results }: WalkawayAmountProps) {
  const isPositive = results.remainingEquity > 0;

  return (
    <Card className={isPositive ? 'border-green-200 dark:border-green-900' : 'border-red-200 dark:border-red-900'}>
      <CardHeader>
        <CardTitle>Post-Downsize Equity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-6 rounded-lg ${isPositive ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
          <div className="text-sm text-muted-foreground mb-2">Remaining Equity</div>
          <div className={`text-4xl font-bold ${isPositive ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {formatCurrency(results.remainingEquity)}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {formatPercent(results.equityPercentage, 1)} of purchase price
          </div>
        </div>

        {results.canPayInFull && (
          <Alert className="border-green-600 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-300">
              <strong>Able to Pay in Full!</strong> Your remaining equity exceeds the purchase price.
            </AlertDescription>
          </Alert>
        )}

        {!isPositive && (
          <Alert className="border-red-600 bg-red-50 dark:bg-red-950">
            <AlertDescription className="text-red-800 dark:text-red-300">
              <strong>Shortfall Alert:</strong> You may need additional funds to complete this purchase.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PurchaseResults, formatCurrency } from '@/lib/calculations';

interface PurchaseSummaryProps {
  results: PurchaseResults;
  isToronto: boolean;
}

export default function PurchaseSummary({ results, isToronto }: PurchaseSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Purchase Price</span>
          <span className="font-medium">{formatCurrency(results.purchasePrice)}</span>
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Provincial LTT</span>
            <span className="text-red-600">{formatCurrency(results.provincialLTT)}</span>
          </div>

          {isToronto && results.municipalLTT > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Municipal LTT (Toronto)</span>
              <span className="text-red-600">{formatCurrency(results.municipalLTT)}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Land Transfer Tax</span>
            <span className="font-medium text-red-600">{formatCurrency(results.totalLTT)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Buyer Legal Fees</span>
            <span className="text-red-600">{formatCurrency(results.buyerLegalFees)}</span>
          </div>
        </div>

        <div className="border-t pt-3 flex justify-between items-center bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
          <span className="font-semibold">Total Purchase Cost</span>
          <span className="font-bold text-xl text-blue-700 dark:text-blue-400">
            {formatCurrency(results.totalPurchaseCost)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

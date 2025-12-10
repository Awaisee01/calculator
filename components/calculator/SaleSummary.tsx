'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SaleResults, formatCurrency } from '@/lib/calculations';

interface SaleSummaryProps {
  results: SaleResults;
}

export default function SaleSummary({ results }: SaleSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Base Home Value</span>
          <span className="font-medium">{formatCurrency(results.baseSalePrice)}</span>
        </div>

        {results.upgradeBoost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Upgrade Boost (+2%)</span>
            <span className="font-medium text-green-600">+{formatCurrency(results.upgradeBoost)}</span>
          </div>
        )}

        {results.premiumBoost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Premium Performance</span>
            <span className="font-medium text-green-600">+{formatCurrency(results.premiumBoost)}</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between items-center">
          <span className="font-medium">Final Sale Price</span>
          <span className="font-bold text-lg">{formatCurrency(results.finalSalePrice)}</span>
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Commission (6%)</span>
            <span className="text-red-600">-{formatCurrency(results.commission)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Seller Legal Fees</span>
            <span className="text-red-600">-{formatCurrency(results.sellerLegalFees)}</span>
          </div>

          {results.mortgagePayout > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mortgage Payout</span>
              <span className="text-red-600">-{formatCurrency(results.mortgagePayout)}</span>
            </div>
          )}
        </div>

        <div className="border-t pt-3 flex justify-between items-center bg-green-50 dark:bg-green-950 p-3 rounded-md">
          <span className="font-semibold">Net Sale Proceeds</span>
          <span className="font-bold text-xl text-green-700 dark:text-green-400">
            {formatCurrency(results.netSaleProceeds)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

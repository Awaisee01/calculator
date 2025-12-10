'use client';

import { useState } from 'react';
import InputSection from '@/components/calculator/InputSection';
import SaleSummary from '@/components/calculator/SaleSummary';
import PurchaseSummary from '@/components/calculator/PurchaseSummary';
import WalkawayAmount from '@/components/calculator/WalkawayAmount';
import FutureValueProjectionsCard from '@/components/calculator/FutureValueProjections';
import RecommendationCard from '@/components/calculator/RecommendationCard';
import CarryingCostCalculator from '@/components/calculator/CarryingCostCalculator';
import {
  calculateSale,
  calculatePurchase,
  calculateEquity,
  calculateFutureValue,
  calculateRecommendation,
} from '@/lib/calculations';
import { Calculator } from 'lucide-react';

export default function CalculatorPage() {
  const [currentHomeValue, setCurrentHomeValue] = useState(800000);
  const [hasMortgage, setHasMortgage] = useState(true);
  const [mortgageBalance, setMortgageBalance] = useState(200000);
  const [purchasePrice, setPurchasePrice] = useState(600000);
  const [city, setCity] = useState<'ontario' | 'toronto'>('ontario');
  const [upgradesEnabled, setUpgradesEnabled] = useState(false);
  const [premiumPerformance, setPremiumPerformance] = useState(5);

  const saleResults = calculateSale({
    currentHomeValue,
    hasMortgage,
    mortgageBalance,
    upgradesEnabled,
    premiumPerformance,
  });

  const purchaseResults = calculatePurchase({
    purchasePrice,
    city,
  });

  const equityResults = calculateEquity(
    saleResults.netSaleProceeds,
    purchaseResults.totalPurchaseCost,
    purchasePrice
  );

  const futureValueProjections = calculateFutureValue(equityResults.remainingEquity);

  const recommendation = calculateRecommendation(equityResults.equityPercentage);

  const showCarryingCost = recommendation.strategy === 'buy-first';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold tracking-tight">Downsizing Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your net proceeds, equity position, and determine the best strategy for your move.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <InputSection
              currentHomeValue={currentHomeValue}
              setCurrentHomeValue={setCurrentHomeValue}
              hasMortgage={hasMortgage}
              setHasMortgage={setHasMortgage}
              mortgageBalance={mortgageBalance}
              setMortgageBalance={setMortgageBalance}
              purchasePrice={purchasePrice}
              setPurchasePrice={setPurchasePrice}
              city={city}
              setCity={setCity}
              upgradesEnabled={upgradesEnabled}
              setUpgradesEnabled={setUpgradesEnabled}
              premiumPerformance={premiumPerformance}
              setPremiumPerformance={setPremiumPerformance}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SaleSummary results={saleResults} />
              <PurchaseSummary results={purchaseResults} isToronto={city === 'toronto'} />
            </div>

            <WalkawayAmount results={equityResults} />

            {equityResults.remainingEquity > 0 && (
              <FutureValueProjectionsCard
                projections={futureValueProjections}
                currentEquity={equityResults.remainingEquity}
              />
            )}

            <RecommendationCard recommendation={recommendation} />

            {showCarryingCost && (
              <CarryingCostCalculator currentHomeValue={currentHomeValue} />
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            This calculator provides estimates for planning purposes only. Actual costs and proceeds may vary.
            Consult with a real estate professional for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
}

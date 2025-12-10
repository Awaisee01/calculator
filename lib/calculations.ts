export interface SaleInputs {
  currentHomeValue: number;
  hasMortgage: boolean;
  mortgageBalance: number;
  upgradesEnabled: boolean;
  premiumPerformance: number;
}

export interface PurchaseInputs {
  purchasePrice: number;
  city: 'ontario' | 'toronto';
}

export interface SaleResults {
  baseSalePrice: number;
  upgradeBoost: number;
  premiumBoost: number;
  finalSalePrice: number;
  commission: number;
  sellerLegalFees: number;
  mortgagePayout: number;
  netSaleProceeds: number;
}

export interface PurchaseResults {
  purchasePrice: number;
  provincialLTT: number;
  municipalLTT: number;
  totalLTT: number;
  buyerLegalFees: number;
  totalPurchaseCost: number;
}

export function calculateSale(inputs: SaleInputs): SaleResults {
  let finalSalePrice = inputs.currentHomeValue;

  const upgradeBoost = inputs.upgradesEnabled ? inputs.currentHomeValue * 0.02 : 0;
  finalSalePrice += upgradeBoost;

  const premiumBoost = inputs.currentHomeValue * (inputs.premiumPerformance / 100);
  finalSalePrice += premiumBoost;

  const commission = finalSalePrice * 0.06;
  const sellerLegalFees = 2500;
  const mortgagePayout = inputs.hasMortgage ? inputs.mortgageBalance : 0;

  const netSaleProceeds = finalSalePrice - commission - sellerLegalFees - mortgagePayout;

  return {
    baseSalePrice: inputs.currentHomeValue,
    upgradeBoost,
    premiumBoost,
    finalSalePrice,
    commission,
    sellerLegalFees,
    mortgagePayout,
    netSaleProceeds,
  };
}

export function calculateOntarioLTT(purchasePrice: number): number {
  let ltt = 0;

  if (purchasePrice <= 55000) {
    ltt = purchasePrice * 0.005;
  } else if (purchasePrice <= 250000) {
    ltt = 55000 * 0.005 + (purchasePrice - 55000) * 0.01;
  } else if (purchasePrice <= 400000) {
    ltt = 55000 * 0.005 + (250000 - 55000) * 0.01 + (purchasePrice - 250000) * 0.015;
  } else if (purchasePrice <= 2000000) {
    ltt = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (purchasePrice - 400000) * 0.02;
  } else {
    ltt = 55000 * 0.005 + (250000 - 55000) * 0.01 + (400000 - 250000) * 0.015 + (2000000 - 400000) * 0.02 + (purchasePrice - 2000000) * 0.025;
  }

  return ltt;
}

export function calculatePurchase(inputs: PurchaseInputs): PurchaseResults {
  const provincialLTT = calculateOntarioLTT(inputs.purchasePrice);
  const municipalLTT = inputs.city === 'toronto' ? provincialLTT : 0;
  const totalLTT = provincialLTT + municipalLTT;
  const buyerLegalFees = 2500;
  const totalPurchaseCost = inputs.purchasePrice + totalLTT + buyerLegalFees;

  return {
    purchasePrice: inputs.purchasePrice,
    provincialLTT,
    municipalLTT,
    totalLTT,
    buyerLegalFees,
    totalPurchaseCost,
  };
}

export interface EquityResults {
  remainingEquity: number;
  canPayInFull: boolean;
  equityPercentage: number;
}

export function calculateEquity(
  netSaleProceeds: number,
  totalPurchaseCost: number,
  purchasePrice: number
): EquityResults {
  const remainingEquity = netSaleProceeds - totalPurchaseCost;
  const canPayInFull = remainingEquity > purchasePrice;
  const equityPercentage = (remainingEquity / purchasePrice) * 100;

  return {
    remainingEquity,
    canPayInFull,
    equityPercentage,
  };
}

export interface FutureValue {
  oneYear: number;
  fiveYear: number;
}

export interface FutureValueProjections {
  hysa: FutureValue;
  marketConservative: FutureValue;
  marketOptimistic: FutureValue;
}

export function calculateFutureValue(
  remainingEquity: number
): FutureValueProjections {
  return {
    hysa: {
      oneYear: remainingEquity * Math.pow(1.04, 1),
      fiveYear: remainingEquity * Math.pow(1.04, 5),
    },
    marketConservative: {
      oneYear: remainingEquity * Math.pow(1.09, 1),
      fiveYear: remainingEquity * Math.pow(1.09, 5),
    },
    marketOptimistic: {
      oneYear: remainingEquity * Math.pow(1.11, 1),
      fiveYear: remainingEquity * Math.pow(1.11, 5),
    },
  };
}

export type Recommendation = 'buy-first' | 'sell-first' | 'either';

export interface RecommendationResult {
  strategy: Recommendation;
  reason: string;
}

export function calculateRecommendation(
  equityPercentage: number
): RecommendationResult {
  if (equityPercentage >= 20) {
    return {
      strategy: 'buy-first',
      reason: 'You have sufficient equity (≥20%) to consider buying first. This gives you flexibility and avoids rushed decisions.',
    };
  } else if (equityPercentage < 10) {
    return {
      strategy: 'sell-first',
      reason: 'With limited equity (<10%), selling first is the safer approach to ensure you have funds available for your purchase.',
    };
  } else {
    return {
      strategy: 'either',
      reason: 'You have moderate equity (10-20%). Either strategy could work depending on market conditions and your timeline.',
    };
  }
}

export interface CarryingCostInputs {
  monthlyMortgage: number;
  propertyTaxRate: number;
  monthlyUtilities: number;
  carryingPeriodMonths: number;
  currentHomeValue: number;
}

export interface CarryingCostResults {
  monthlyMortgage: number;
  monthlyPropertyTax: number;
  monthlyUtilities: number;
  totalMonthly: number;
  totalCarryingCost: number;
}

export function calculateCarryingCost(
  inputs: CarryingCostInputs
): CarryingCostResults {
  const annualPropertyTax = inputs.currentHomeValue * (inputs.propertyTaxRate / 100);
  const monthlyPropertyTax = annualPropertyTax / 12;
  const totalMonthly = inputs.monthlyMortgage + monthlyPropertyTax + inputs.monthlyUtilities;
  const totalCarryingCost = totalMonthly * inputs.carryingPeriodMonths;

  return {
    monthlyMortgage: inputs.monthlyMortgage,
    monthlyPropertyTax,
    monthlyUtilities: inputs.monthlyUtilities,
    totalMonthly,
    totalCarryingCost,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

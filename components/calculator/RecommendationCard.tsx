'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RecommendationResult } from '@/lib/calculations';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: RecommendationResult;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getIcon = () => {
    switch (recommendation.strategy) {
      case 'buy-first':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'sell-first':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getVariant = () => {
    switch (recommendation.strategy) {
      case 'buy-first':
        return 'default';
      case 'sell-first':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getTitle = () => {
    switch (recommendation.strategy) {
      case 'buy-first':
        return 'Buy First Strategy Recommended';
      case 'sell-first':
        return 'Sell First Strategy Recommended';
      default:
        return 'Either Strategy is Viable';
    }
  };

  const getBgColor = () => {
    switch (recommendation.strategy) {
      case 'buy-first':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900';
      case 'sell-first':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900';
      default:
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className={getBgColor()}>
          {getIcon()}
          <AlertTitle className="text-lg font-semibold mb-2">{getTitle()}</AlertTitle>
          <AlertDescription className="text-base">
            {recommendation.reason}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

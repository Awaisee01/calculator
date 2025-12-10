'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/calculations';

interface InputSectionProps {
  currentHomeValue: number;
  setCurrentHomeValue: (value: number) => void;
  hasMortgage: boolean;
  setHasMortgage: (value: boolean) => void;
  mortgageBalance: number;
  setMortgageBalance: (value: number) => void;
  purchasePrice: number;
  setPurchasePrice: (value: number) => void;
  city: 'ontario' | 'toronto';
  setCity: (value: 'ontario' | 'toronto') => void;
  upgradesEnabled: boolean;
  setUpgradesEnabled: (value: boolean) => void;
  premiumPerformance: number;
  setPremiumPerformance: (value: number) => void;
}

export default function InputSection({
  currentHomeValue,
  setCurrentHomeValue,
  hasMortgage,
  setHasMortgage,
  mortgageBalance,
  setMortgageBalance,
  purchasePrice,
  setPurchasePrice,
  city,
  setCity,
  upgradesEnabled,
  setUpgradesEnabled,
  premiumPerformance,
  setPremiumPerformance,
}: InputSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculator Inputs</CardTitle>
        <CardDescription>Enter your home and purchase details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentHomeValue">Current Home Value</Label>
          <Input
            id="currentHomeValue"
            type="number"
            placeholder="$0"
            value={currentHomeValue || ''}
            onChange={(e) => setCurrentHomeValue(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="hasMortgage">Existing Mortgage Balance?</Label>
            <Switch
              id="hasMortgage"
              checked={hasMortgage}
              onCheckedChange={setHasMortgage}
            />
          </div>
          {hasMortgage && (
            <div className="pl-4">
              <Input
                type="number"
                placeholder="$0"
                value={mortgageBalance || ''}
                onChange={(e) => setMortgageBalance(parseFloat(e.target.value) || 0)}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchasePrice">Desired Budget for Next Home</Label>
          <Input
            id="purchasePrice"
            type="number"
            placeholder="$0"
            value={purchasePrice || ''}
            onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select value={city} onValueChange={(value) => setCity(value as 'ontario' | 'toronto')}>
            <SelectTrigger id="city">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ontario">Ontario (Outside Toronto)</SelectItem>
              <SelectItem value="toronto">Toronto (Municipal LTT Applies)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="upgrades">Pre-Sale Upgrades</Label>
              <p className="text-sm text-muted-foreground">+2% boost to sale price • Cost: $0</p>
            </div>
            <Switch
              id="upgrades"
              checked={upgradesEnabled}
              onCheckedChange={setUpgradesEnabled}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Premium Performance</Label>
            <span className="text-sm font-medium">+{formatPercent(premiumPerformance)}</span>
          </div>
          <Slider
            value={[premiumPerformance]}
            onValueChange={(values) => setPremiumPerformance(values[0])}
            min={4}
            max={6}
            step={0.1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Our premium marketing and staging strategies typically achieve 4-6% above market value.
            This boost is added to your sale price.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

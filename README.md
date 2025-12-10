# Downsizing Calculator

A fully functional calculator built with Next.js 13+ (App Router), React, and Tailwind CSS to help homeowners evaluate the financial implications of downsizing.

## Featu

### Input Fields
- **Current Home Value**: Enter your home's market value
- **Existing Mortgage Balance**: Toggle to include mortgage payout
- **Desired Budget for Next Home**: Target purchase price
- **City Selection**: Choose between Ontario (outside Toronto) or Toronto for accurate LTT calculations
- **Pre-Sale Upgrades**: Toggle for +2% boost to sale price (cost: $0)
- **Premium Performance Slider**: Adjust from 4% to 6% above market value

### Calculations

#### Sale Summary
- Base sale price with optional upgrade boost
- Premium performance adjustment
- 6% commission on final sale price
- $2,500 seller legal fees
- Mortgage payout deduction
- Net sale proceeds

#### Purchase Summary
- Purchase price
- Ontario Land Transfer Tax (progressive brackets)
- Toronto Municipal LTT (if applicable)
- $2,500 buyer legal fees
- Total purchase cost

#### Post-Downsize Equity
- Remaining equity after transaction
- Ability to pay in full indicator
- Equity percentage of purchase price

#### Future Value Projections
Three investment scenarios for your remaining equity:
- High-Yield Savings Account (4%): 1-year and 5-year projections
- Market Conservative (9%): 1-year and 5-year projections
- Market Optimistic (11%): 1-year and 5-year projections

#### Recommendation Engine
Smart recommendations based on your equity position:
- **Buy First**: If remaining equity ≥ 20% of purchase price
- **Sell First**: If remaining equity < 10%
- **Either Strategy**: For moderate equity positions (10-20%)

#### Carrying Cost Calculator
Displayed when "Buy First" is recommended:
- Monthly mortgage payment input
- Property tax calculation
- Monthly utilities
- Configurable carrying period
- Total carrying cost estimate

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Extract the project files
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

The application will automatically redirect to `/calculator`.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── calculator/
│   │   └── page.tsx          # Main calculator page
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   └── page.tsx               # Home (redirects to calculator)
├── components/
│   ├── calculator/
│   │   ├── InputSection.tsx
│   │   ├── SaleSummary.tsx
│   │   ├── PurchaseSummary.tsx
│   │   ├── WalkawayAmount.tsx
│   │   ├── FutureValueProjections.tsx
│   │   ├── RecommendationCard.tsx
│   │   └── CarryingCostCalculator.tsx
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── calculations.ts        # All calculation logic
│   └── utils.ts              # Utility functions
└── package.json
```

## Calculation Details

### Ontario Land Transfer Tax (LTT)
Progressive brackets:
- $0 - $55,000: 0.5%
- $55,000 - $250,000: 1%
- $250,000 - $400,000: 1.5%
- $400,000 - $2,000,000: 2%
- $2,000,000+: 2.5%

### Toronto Municipal LTT
Toronto applies both Provincial and Municipal LTT (doubles the tax).

### Commission Structure
Standard 6% real estate commission on final sale price.

### Legal Fees
- Seller: $2,500
- Buyer: $2,500

## Technology Stack

- **Framework**: Next.js 13+ (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Customization

All calculation logic is contained in `/lib/calculations.ts`. You can easily modify:
- Commission rates
- Legal fees
- Investment return rates
- LTT brackets
- Recommendation thresholds

## Notes

- All calculations run client-side using React state
- No backend or database required
- Responsive design works on mobile, tablet, and desktop
- Dark mode support included

## License

This project is provided as-is for evaluation and planning purposes. Actual costs and proceeds may vary. Consult with a real estate professional for personalized advice.

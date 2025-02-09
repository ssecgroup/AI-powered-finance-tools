export interface Asset {
  symbol: string;
  name: string;
  price: number;
  quantity: number;
  value: number;
  change24h: number;
  allocation: number;
  costBasis: number;
  profitLoss: number;
}

export interface Portfolio {
  totalValue: number;
  dailyChange: number;
  assets: Asset[];
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  riskMetrics: {
    sharpeRatio: number;
    volatility: number;
    maxDrawdown: number;
  };
}

export interface DCAStrategy {
  asset: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  nextExecution: string;
  totalInvested: number;
  averagePrice: number;
}

export interface MarketInsight {
  title: string;
  description: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
}
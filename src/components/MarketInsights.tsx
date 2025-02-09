import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const insights = [
  {
    title: 'BTC Technical Analysis',
    description: 'Moving averages suggest strong upward momentum',
    sentiment: 'bullish',
    impact: 'high',
    timestamp: '2h ago'
  },
  {
    title: 'ETH Network Activity',
    description: 'Increased DeFi usage driving gas fees higher',
    sentiment: 'neutral',
    impact: 'medium',
    timestamp: '4h ago'
  }
];

export default function MarketInsights() {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{insight.title}</h3>
                {getSentimentIcon(insight.sentiment)}
              </div>
              <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{insight.timestamp}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.impact} impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
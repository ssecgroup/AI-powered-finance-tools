import React from 'react';
import { LineChart, Wallet, TrendingUp, Calendar, BarChart2, AlertTriangle, Target } from 'lucide-react';
import PortfolioOverview from './PortfolioOverview';
import AssetList from './AssetList';
import DCAManager from './DCAManager';
import RiskMetrics from './RiskMetrics';
import MarketInsights from './MarketInsights';
import TradePanel from './TradePanel';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LineChart className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">FinanceAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Trade
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-2 text-lg font-medium">Total Value</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">$124,567.89</p>
            <p className="text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.4%
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart2 className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-2 text-lg font-medium">P&L YTD</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">+$12,458.32</p>
            <p className="text-gray-600">+11.2% return</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-2 text-lg font-medium">Risk Score</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">6.8/10</p>
            <p className="text-yellow-600">Moderate</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-2 text-lg font-medium">Next Trade</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">2d 14h</p>
            <p className="text-gray-600">BTC $100</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <PortfolioOverview />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RiskMetrics />
              <MarketInsights />
            </div>
            <AssetList />
          </div>
          <div className="space-y-6">
            <TradePanel />
            <DCAManager />
          </div>
        </div>
      </main>
    </div>
  );
}
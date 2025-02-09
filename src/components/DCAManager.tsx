import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Settings2, X } from 'lucide-react';

const mockStrategies = [
  { asset: 'BTC', amount: 100, frequency: 'weekly', isActive: true, nextExecution: '2024-03-20', totalInvested: 2400, averagePrice: 41250.75 },
  { asset: 'ETH', amount: 50, frequency: 'monthly', isActive: true, nextExecution: '2024-04-01', totalInvested: 1200, averagePrice: 2150.30 },
];

export default function DCAManager() {
  const [showNewStrategy, setShowNewStrategy] = useState(false);
  const [newStrategy, setNewStrategy] = useState({
    asset: 'BTC',
    amount: '',
    frequency: 'weekly'
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">DCA Strategies</h2>
          <button
            onClick={() => setShowNewStrategy(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Strategy
          </button>
        </div>
        
        <div className="space-y-4">
          {mockStrategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium">{strategy.asset}</h3>
                  <div className="text-sm text-gray-500">
                    ${strategy.amount} {strategy.frequency}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    strategy.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {strategy.isActive ? 'Active' : 'Paused'}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Settings2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Next Buy</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(strategy.nextExecution).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Total Invested</div>
                  <div className="font-medium">${strategy.totalInvested.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-500">Avg. Price</div>
                  <div className="font-medium">${strategy.averagePrice.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showNewStrategy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">New DCA Strategy</h3>
                <button
                  onClick={() => setShowNewStrategy(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asset
                  </label>
                  <select
                    value={newStrategy.asset}
                    onChange={(e) => setNewStrategy({ ...newStrategy, asset: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="AAPL">Apple Inc. (AAPL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (USD)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={newStrategy.amount}
                      onChange={(e) => setNewStrategy({ ...newStrategy, amount: e.target.value })}
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newStrategy.frequency}
                    onChange={(e) => setNewStrategy({ ...newStrategy, frequency: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      // Handle strategy creation
                      setShowNewStrategy(false);
                    }}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Create Strategy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
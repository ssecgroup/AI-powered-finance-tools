import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const mockAssets = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.80, quantity: 0.5, value: 21625.40, change24h: 2.4 },
  { symbol: 'ETH', name: 'Ethereum', price: 2280.15, quantity: 4.2, value: 9576.63, change24h: -1.2 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.30, quantity: 25, value: 4557.50, change24h: 0.8 },
];

export default function AssetList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Assets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-3">Asset</th>
                <th className="text-right pb-3">Price</th>
                <th className="text-right pb-3">Holdings</th>
                <th className="text-right pb-3">Value</th>
                <th className="text-right pb-3">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {mockAssets.map((asset) => (
                <tr key={asset.symbol} className="border-b last:border-0">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium">{asset.symbol}</div>
                        <div className="text-sm text-gray-500">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4">${asset.price.toLocaleString()}</td>
                  <td className="text-right py-4">{asset.quantity}</td>
                  <td className="text-right py-4">${asset.value.toLocaleString()}</td>
                  <td className="text-right py-4">
                    <span className={`flex items-center justify-end ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.change24h >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {asset.change24h}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
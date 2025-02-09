import React, { useState } from 'react';
import { DollarSign, ArrowUpDown, AlertCircle } from 'lucide-react';

export default function TradePanel() {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [asset, setAsset] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const mockPrices = {
    BTC: 43250.80,
    ETH: 2280.15,
    AAPL: 182.30
  };

  const currentPrice = mockPrices[asset as keyof typeof mockPrices];
  const estimatedQuantity = amount ? parseFloat(amount) / currentPrice : 0;

  const handleSubmit = () => {
    if (!amount || (orderType === 'limit' && !limitPrice)) return;
    setShowConfirm(true);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Trade</h2>
        <div className="space-y-4">
          <div className="flex rounded-md overflow-hidden">
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                tradeType === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTradeType('buy')}
            >
              Buy
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                tradeType === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTradeType('sell')}
            >
              Sell
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asset
            </label>
            <select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="AAPL">Apple Inc. (AAPL)</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setOrderType('market')}
              className={`flex-1 px-3 py-1 text-sm rounded-md ${
                orderType === 'market'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Market
            </button>
            <button
              onClick={() => setOrderType('limit')}
              className={`flex-1 px-3 py-1 text-sm rounded-md ${
                orderType === 'limit'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Limit
            </button>
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          {orderType === 'limit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limit Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}

          {amount && (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-600">
                Estimated {asset}: {estimatedQuantity.toFixed(8)}
              </div>
              <div className="text-sm text-gray-600">
                Current Price: ${currentPrice.toLocaleString()}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md ${
              tradeType === 'buy'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
            </div>
          </button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold">Confirm Order</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p>
                  {tradeType === 'buy' ? 'Buy' : 'Sell'} {estimatedQuantity.toFixed(8)} {asset}
                </p>
                <p>Total: ${parseFloat(amount).toLocaleString()}</p>
                {orderType === 'limit' && (
                  <p>Limit Price: ${parseFloat(limitPrice).toLocaleString()}</p>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle order submission
                    setShowConfirm(false);
                    setAmount('');
                    setLimitPrice('');
                  }}
                  className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-md ${
                    tradeType === 'buy'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { fetchStockPrice, fetchCryptoPrice } from '';
//export default PortfolioOverview;
const mockData = {
  daily: [100, 102, 104, 103, 106, 108, 110],
  weekly: [95, 98, 102, 105, 108, 110, 112],
  monthly: [90, 95, 100, 105, 108, 112, 115],
  yearly: [85, 90, 98, 105, 110, 115, 120],
};

const timeRanges = ['1D', '1W', '1M', '1Y'] as const;
type TimeRange = (typeof timeRanges)[number];

export default function PortfolioOverview() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1W');
  const currentValue = mockData.weekly[mockData.weekly.length - 1];
  const previousValue = mockData.weekly[mockData.weekly.length - 2];
  const percentageChange =
    ((currentValue - previousValue) / previousValue) * 100;

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Portfolio Overview</h2>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">
                ${currentValue.toLocaleString()}
              </span>
              <span
                className={`ml-2 flex items-center text-sm ${
                  percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {percentageChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(percentageChange).toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg p-4">
          <div className="w-full h-64 bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 rounded-lg flex items-center justify-center relative">
            {/* Mock chart visualization */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
              {mockData[
                selectedRange === '1D'
                  ? 'daily'
                  : selectedRange === '1W'
                  ? 'weekly'
                  : selectedRange === '1M'
                  ? 'monthly'
                  : 'yearly'
              ].map((value, index) => (
                <div
                  key={index}
                  className="w-1 bg-indigo-600 rounded-t"
                  style={{
                    height: `${(value / 120) * 100}%`,
                    opacity: 0.7 + index / 10,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Gain/Loss</div>
            <div className="text-lg font-semibold text-green-600">
              +$15,234.56
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Daily Volume</div>
            <div className="text-lg font-semibold">$2,845.32</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Portfolio Beta</div>
            <div className="text-lg font-semibold">1.12</div>
          </div>
        </div>
      </div>
    </div>
  );

  const PortfolioOverview = () => {
    const [stockPrice, setStockPrice] = useState(null);
    const [cryptoPrice, setCryptoPrice] = useState(null);

    useEffect(() => {
      const loadData = async () => {
        const stockData = await fetchStockPrice('AAPL');
        const cryptoData = await fetchCryptoPrice('bitcoin');

        if (stockData['Time Series (5min)']) {
          const latestKey = Object.keys(stockData['Time Series (5min)'])[0];
          setStockPrice(stockData['Time Series (5min)'][latestKey]['1. open']);
        }

        setCryptoPrice(cryptoData);
      };

      loadData();
      const interval = setInterval(loadData, 10000); // Refresh every 10 sec

      return () => clearInterval(interval);
    }, []);

    return (
      <div>
        <h2>Portfolio Overview</h2>
        <p>Stock (AAPL): ${stockPrice ? stockPrice : 'Loading...'}</p>
        <p>Crypto (BTC): ${cryptoPrice ? cryptoPrice : 'Loading...'}</p>
      </div>
    );
  };
}

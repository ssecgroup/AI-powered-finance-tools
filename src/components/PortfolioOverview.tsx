import React, { useEffect, useState } from 'react';
import { fetchStockPrice, fetchCryptoPrice } from './components/apiService';

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

export default PortfolioOverview;

export const fetchStockPrice = async (symbol) => {
  const API_KEY = 'HDXSJN40XOZFW3WA'; // Your Alpha Vantage Key
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; // Returns raw JSON
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

export const fetchCryptoPrice = async (cryptoId) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data[cryptoId].usd; // Returns just the price
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

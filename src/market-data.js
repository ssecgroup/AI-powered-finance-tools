// pages/api/market-data.js
export default async function handler(req, res) {
    try {
        // Alpha Vantage API Key
        const ALPHA_VANTAGE_API_KEY = "HDXSJN40XOZFW3WA";

        // Stock Data from Alpha Vantage
        const stockSymbol = "AAPL"; // Example stock (Apple)
        const stockURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const stockResponse = await fetch(stockURL);
        const stockData = await stockResponse.json();

        // Crypto Data from CoinGecko
        const cryptoSymbol = "bitcoin"; // Example crypto
        const cryptoURL = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd`;
        const cryptoResponse = await fetch(cryptoURL);
        const cryptoData = await cryptoResponse.json();

        // Send combined response
        res.status(200).json({
            stock: stockData["Global Quote"],
            crypto: cryptoData,
        });

    } catch (error) {
        res.status(500).json({ error: "Error fetching market data" });
    }
}

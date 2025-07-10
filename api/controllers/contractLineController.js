// controllers/getEthKline.js
const axios = require('axios');

const getContractLine = async (req, res) => {
 try {
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol: 'SOLUSDT',    // ✅ SOL instead of ETH
        interval: '1m',       // ✅ Valid interval
        limit: 100
      }
    });

    const formattedData = response.data.map(item => ({
      time: item[0],
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
      volume: parseFloat(item[5])
    }));

    res.status(200).json({
      success: true,
      code: 200,
      message: 'SOL/USDT K-line data fetched',
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching SOL/USDT K-line data:', error.message);
    res.status(500).json({
      success: false,
      code: 500,
      message: 'Failed to fetch data from Binance'
    });
  }
};

module.exports = { getContractLine };

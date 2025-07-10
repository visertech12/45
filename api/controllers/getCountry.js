// controllers/getCountry.js
const axios = require('axios');

exports.getCountry = async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress ||
      '110.37.2.156'; // fallback IP for testing

    const { data } = await axios.get(`https://ipinfo.io/${ip}/json`);

    res.json({
      success: true,
      message: "request success",
      code: 200,
      data: {
        ip: data.ip || '',
        hostname: data.hostname || '',
        city: data.city || '',
        region: data.region || '',
        country: data.country || '',
        loc: data.loc || '',
        org: data.org || '',
        postal: data.postal || '',
        timezone: data.timezone || '',
        readme: "https://ipinfo.io/missingauth"
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get IP info",
      code: 500,
      error: error.message
    });
  }
};

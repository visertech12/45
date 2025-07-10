const express = require('express');
const router = express.Router();

// Controllers
const { getCountry } = require('../controllers/getCountry');
const { login } = require('../controllers/account');
const { getSiteSettings } = require('../controllers/getSiteSettings');
const { getServerTime } = require('../controllers/getServerTime');
const { getUserInfo } = require('../controllers/userInfo');
const { getTradeCurrencyList } = require('../controllers/getTradeCurrencyList');
const { getBannerData } = require('../controllers/getBannerData');
const { getAccountBalance } = require('../controllers/accountBalance');
const { getCurrencyInfo } = require('../controllers/currencyController');
const { getContractLine } = require('../controllers/contractLineController'); // ✅ Add this line

// Middleware
const verifyToken = require('../middleware/auth');

// Routes
router.post('/currency/currencyinfo', getCurrencyInfo);
router.post('/currency/contractLine', getContractLine); // ✅ Add route
router.post('/account/balance', getAccountBalance);
router.get('/position/detail', getBannerData);
router.get('/currency/getTradeCurrencyList', getTradeCurrencyList);
router.post('/account/userinfo', verifyToken, getUserInfo);
router.get('/common/getServerTime', getServerTime);
router.post('/common/config', getSiteSettings);
router.get('/common/getCountry', getCountry);
router.post('/common/account/login', login);
router.post('/account/login', login);

module.exports = router;

// routes/index.js
const express = require('express');
const router = express.Router();
const commonRoutes = require('./common');

router.use('/', commonRoutes);

module.exports = router;
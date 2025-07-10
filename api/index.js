require('dotenv').config();
const express = require('express');
const path = require('path');

const apiRoutes = require('./routes'); // Import main router that handles all /api routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

// Use all API routes with /api prefix
app.use('/api', apiRoutes);

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
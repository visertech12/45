const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function verifyToken(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: 'Token verification failed. It may be expired or in the blacklist'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user to request
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: 'Token verification failed. It may be expired or in the blacklist'
        });
    }
};
const moment = require('moment-timezone');

exports.getServerTime = (req, res) => {
    const guessedZone = moment.tz.guess(); // Guess the server's current timezone

    res.json({
        success: true,
        message: 'request success',
        code: 200,
        data: {
            zone: guessedZone
        }
    });
};
const jwt = require('jsonwebtoken');
const { secret } = require('./config.js');

class jwtLib {
    generateAccessToken(payload) {
        return jwt.sign(payload, secret, { expiresIn: '24h' });
    }
}

module.exports = new jwtLib();

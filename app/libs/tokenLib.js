const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || 'TOKEN_SECRET';

module.exports = {
    tokenGenerate(payload) {
        return jwt.sign(payload, secret, { expiresIn: '24h' });
    },
    tokenVerify(token) {
        return jwt.verify(token, secret);
    },
};

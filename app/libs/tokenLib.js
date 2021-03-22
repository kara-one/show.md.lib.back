const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || 'TOKEN_SECRET';
const { errorWrap } = require(global.pathLib.fromRoot('/app/libs/errorLib'));

module.exports = {
    tokenGenerate(payload) {
        return jwt.sign(payload, secret, { expiresIn: '24h' });
    },
    tokenVerify(token) {
        return jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return errorWrap('token', token, 'Token error');
            }

            return decoded;
        });
    },
};

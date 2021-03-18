const jwt = require('jsonwebtoken');

const { secret } = require(global.pathLib.fromRoot('/app/libs/jwt/config'));

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'User is not auth2' });
        }

        req.user = jwt.verify(token, secret);

        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'User is not auth' });
    }
};

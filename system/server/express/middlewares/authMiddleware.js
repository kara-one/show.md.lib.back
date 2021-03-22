const { tokenVerify } = require(global.pathLib.fromRoot('/app/libs/tokenLib'));

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(400).json({ message: 'User is not auth' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const checkToken = tokenVerify(token);
        if (checkToken.errors) {
            return res
                .status(400)
                .json({ message: 'User is not auth', errors: checkToken.errors });
        }
        
        req.user = checkToken;

        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'User is not auth' });
    }
};

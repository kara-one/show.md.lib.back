const { check } = require('express-validator');

module.exports = {
    async usernameRules(req, res, next) {
        await check('username', 'Username can not empty').notEmpty().run(req);
        await check('username', 'Username must have more than 4 characters')
            .isLength({
                min: 4,
            })
            .run(req);

        next();
    },
    async passwordRules(req, res, next) {
        await check('password', 'Password can not empty').notEmpty().run(req);
        await check('password', 'Password min 4 max 10 chars')
            .isLength({
                min: 4,
                max: 10,
            })
            .run(req);

        next();
    },
};

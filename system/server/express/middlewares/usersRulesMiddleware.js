const { body } = require('express-validator');

module.exports = {
    async usernameAddRules(req, res, next) {
        await body('username', 'Username can not empty').notEmpty().run(req);
        await body('username', 'Username must have more than 4 characters')
            .isLength({
                min: 4,
            })
            .run(req);

        next();
    },
    async passwordAddRules(req, res, next) {
        await body('password', 'Password can not empty').notEmpty().run(req);
        await body('password', 'Password min 4 max 10 chars')
            .isLength({
                min: 4,
                max: 10,
            })
            .run(req);

        next();
    },
    async usernameEditRules(req, res, next) {
        await body('username', 'Username can not empty')
            .if(body('username').exists())
            .notEmpty()
            .run(req);
        await body('username', 'Username must have more than 4 characters')
            .if(body('username').exists())
            .isLength({
                min: 4,
            })
            .run(req);

        next();
    },
    async passwordEditRules(req, res, next) {
        await body('password', 'Password can not empty')
            .if(body('password').exists())
            .notEmpty()
            .run(req);
        await body('password', 'Password min 4 max 10 chars')
            .if(body('password').exists())
            .isLength({
                min: 4,
                max: 10,
            })
            .run(req);

        next();
    },
};

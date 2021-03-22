const { check } = require('express-validator');

module.exports = {
    async rolenameRules(req, res, next) {
        await check('rolename', 'Rolename can not empty').notEmpty().run(req);
        await check('rolename', 'Rolename must have more than 4 characters')
            .isLength({
                min: 4,
            })
            .run(req);

        next();
    },
};

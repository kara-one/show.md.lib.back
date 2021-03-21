const { validationResult } = require('express-validator');

module.exports = {
    rulesValidation(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(req.body);
            return res.status(422).json(errors);
        }

        next();
    },
};

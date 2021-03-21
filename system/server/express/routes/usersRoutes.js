const Router = require('express');
const router = new Router();

const UsersController = require(global.pathLib.fromRoot(
    '/app/controllers/UsersController',
));

const {
    rulesValidation,
} = require('../middlewares/validationResultMiddleware');
const {
    usernameRules,
    passwordRules,
} = require('../middlewares/usersRulesMiddleware');

router
    .get('/users', UsersController.getUsers)
    .get('/users/:id', UsersController.getUsersOne)
    .put(
        '/users/:id',
        usernameRules,
        passwordRules,
        rulesValidation,
        UsersController.putUsers,
    )
    .post(
        '/users',
        usernameRules,
        passwordRules,
        rulesValidation,
        UsersController.postUsers,
    )
    .post(
        '/users/login',
        usernameRules,
        passwordRules,
        rulesValidation,
        UsersController.loginUsers,
    )
    .delete('/users/:id', UsersController.deleteUsers);

module.exports = router;

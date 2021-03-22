const Router = require('express');
const router = new Router();

const UsersController = require(global.pathLib.fromRoot(
    '/app/controllers/UsersController',
));

const {
    rulesValidation,
} = require('../middlewares/validationResultMiddleware');
const {
    usernameAddRules,
    passwordAddRules,
    usernameEditRules,
    passwordEditRules,
} = require('../middlewares/usersRulesMiddleware');

router
    .get('/users', UsersController.getUsers)
    .get('/users/:id', UsersController.getUsersOne)
    .put(
        '/users/:id',
        usernameEditRules,
        passwordEditRules,
        rulesValidation,
        UsersController.putUsers,
    )
    .post(
        '/users',
        usernameAddRules,
        passwordAddRules,
        rulesValidation,
        UsersController.postUsers,
    )
    .post(
        '/users/login',
        usernameAddRules,
        passwordAddRules,
        rulesValidation,
        UsersController.loginUsers,
    )
    .delete('/users/:id', UsersController.deleteUsers);

module.exports = router;

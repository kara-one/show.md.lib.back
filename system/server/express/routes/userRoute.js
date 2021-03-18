const Router = require('express');
const router = new Router();

const UsersController = require(global.pathLib.fromRoot(
    '/app/controllers/UsersController',
));

router
    .get('/users', UsersController.getUsers)
    .post('/users', UsersController.postUsers)
    .get('/users/:id', UsersController.getUsersOne)
    .put('/users/:id', UsersController.putUsers)
    .delete('/users/:id', UsersController.deleteUsers);

module.exports = router;

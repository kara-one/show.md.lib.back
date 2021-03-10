const Router = require('express');
const router = new Router();

const usersController = require(global.pathLib.fromRoot(
    'controllers/usersController',
));

router.get('/users', usersController.getUsers);
router.post('/users', usersController.postUsers);
router.get('/users/:id', usersController.getUsersOne);
router.put('/users/:id', usersController.putUsers);
router.delete('/users/:id', usersController.deleteUsers);

module.exports = router; 

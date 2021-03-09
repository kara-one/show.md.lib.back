const Router = require('express');
const router = new Router();

// const controller = require('./authController');
// const { check } = require('express-validator');
// const authMiddleware = require('./middlewares/authMiddleware');

// router.post(
//     '/register',
//     [
//         check('username', 'Username can not empty').notEmpty(),
//         check('password', 'Password can not empty').notEmpty(),
//         check('password', 'Password min 4 max 10 chars').isLength({
//             min: 4,
//             max: 10,
//         }),
//     ],
//     controller.register,
// );
// router.post('/login', controller.login);
// router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;

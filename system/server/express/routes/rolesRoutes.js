const Router = require('express');
const router = new Router();

const RolesController = require(global.pathLib.fromRoot(
    '/app/controllers/RolesController',
));

const authMiddleware = require('../middlewares/authMiddleware');
const {
    rulesValidation,
} = require('../middlewares/validationResultMiddleware');
const {
    rolenameRules,
} = require('../middlewares/rolesRulesMiddleware');

router
    .get('/roles', authMiddleware, RolesController.getRoles)
    .get('/roles/:id', RolesController.getRolesOne)
    .put('/roles/:id', rolenameRules, rulesValidation, RolesController.putRoles)
    .post('/roles', rolenameRules, rulesValidation, RolesController.postRoles)
    .delete('/roles/:id', RolesController.deleteRoles);

module.exports = router;

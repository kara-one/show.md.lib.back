const Router = require('express');
const route = new Router();

const userRouter = require('./usersRoutes');
const rolesRoutes = require('./rolesRoutes');

/** Templates */
route.set('views', global.pathLib.fromRoot('app/views'));
route.set('view engine', 'pug');

/** Main page */
route.get('/', (req, res) => {
    res.render('index', { title: 'REST API' });
});

/** Add here all routes */
route.use('/api', userRouter, rolesRoutes);

/** 404 */
route.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

route.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = route;

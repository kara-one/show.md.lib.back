const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const UsersModel = require(global.pathLib.fromRoot('/app/models/UsersModel'));
// const Roles = require('./modules/Roles');
const jwtLib = require(global.pathLib.fromRoot('/app/lib/jwtLib'));

class AuthController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (errors) {
                res.status(400).json({ errors });
            }

            const { username, password } = req.body;
            const hashPwd = bcrypt.hashSync(password, 7);

            const candidate = await UsersModel.findOne({ username });
            if (candidate) {
                res.status(400).json({ message: 'Username must be unique' });
            }

            const user = UsersModel({
                username,
                password: hashPwd,
                roles: ['USER'],
            });
            user.save();

            return res.json({ message: 'Register user' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Register error' });
        }
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await UsersModel.findOne({ username });
            if (!user) {
                res.status(400).json({ message: 'Username not found' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ message: 'Password is wrong' });
            }

            const token = jwtLib.generateAccessToken({
                id: user.id,
                username: user.username,
            });

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }
}

module.exports = new AuthController();

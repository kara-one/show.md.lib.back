const Users = require('./modules/Users');
const Roles = require('./modules/Roles');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles,
    };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (errors) {
                res.status(400).json({ errors });
            }

            const { username, password } = req.body;
            const hashPwd = bcrypt.hashSync(password, 7);

            const candidate = await Users.findOne({ username });
            if (candidate) {
                res.status(400).json({ message: 'Username must be unique' });
            }

            const user = new Users({
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

            const user = await Users.findOne({ username });
            if (!user) {
                res.status(400).json({ message: 'Username not found' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ message: 'Password is wrong' });
            }

            const token = generateAccessToken(user._id, user.roles);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }
    async getUsers(req, res, next) {
        try {
            // const userRole = new Roles();
            // const adminRole = new Roles({ values: 'ADMIN' });
            // await userRole.save();
            // await adminRole.save();

            const users = await Users.find()

            res.send(users);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const moduleUsers = require(global.pathLib.fromRoot('/db/mongodb/moduleUsers'));
// const Roles = require('./modules/Roles');

class usersController {
    async getUsers(req, res, next) {
        try {
            const data = await moduleUsers.getAll();

            res.send(data);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'usersController/getUsers error',
                e,
            });
        }
    }

    async getUsersOne(req, res, next) {
        try {
            const params = req.params;
            const data = await moduleUsers.getOne(params);

            res.send(data);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'usersController/getUsersOne error',
                e,
            });
        }
    }

    async postUsers(req, res, next) {
        try {
            const body = req.body;
            const data = await moduleUsers.add(body);

            await res.status(200).send(data);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'usersController/postUsers error',
                e,
            });
        }
    }

    async putUsers(req, res, next) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await moduleUsers.edit(id, body);

            res.send({ message: 'Upsate successful', data });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'usersController/putUsers error',
                e,
            });
        }
    }

    async deleteUsers(req, res, next) {
        try {
            const id = req.params.id;
            const data = await moduleUsers.remove(id);

            res.send({ message: 'Delete successful', data });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'usersController/deleteUsers error',
                e,
            });
        }
    }
}

module.exports = new usersController();

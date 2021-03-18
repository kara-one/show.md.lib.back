const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const UsersModel = require(global.pathLib.fromRoot('/app/models/UsersModel'));
// const Roles = require('./modules/Roles');

class UsersController {
    async getUsers(req, res, next) {
        try {
            const data = await UsersModel.getAll();

            res.send(data);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'UsersController/getUsers error',
                e,
            });
        }
    }

    async getUsersOne(req, res, next) {
        try {
            const params = req.params;
            const data = await UsersModel.getOne(params);

            res.send(data);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'UsersController/getUsersOne error',
                e,
            });
        }
    }

    async postUsers(req, res, next) {
        try {
            const body = req.body;
            const data = await UsersModel.add(body);

            await res.status(200).send(data);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'UsersController/postUsers error',
                e,
            });
        }
    }

    async putUsers(req, res, next) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await UsersModel.edit(id, body);

            res.send({ message: 'Upsate successful', data });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'UsersController/putUsers error',
                e,
            });
        }
    }

    async deleteUsers(req, res, next) {
        try {
            const id = req.params.id;
            const data = await UsersModel.remove(id);

            res.send({ message: 'Delete successful', data });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'UsersController/deleteUsers error',
                e,
            });
        }
    }
}

module.exports = new UsersController();

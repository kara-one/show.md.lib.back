const UsersModel = require(global.pathLib.fromRoot('/app/models/UsersModel'));
const { errorWrap } = require(global.pathLib.fromRoot('/app/libs/errorLib'));
const { tokenGenerate } = require(global.pathLib.fromRoot(
    '/app/libs/tokenLib',
));

class UsersController {
    async getUsers(req, res, next) {
        try {
            const data = await UsersModel.getAll();

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.json({ message: 'Get list successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('getUsers', e, 'Unknown error'));
        }
    }

    async getUsersOne(req, res, next) {
        try {
            const data = await UsersModel.getOne(req.params);

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.json({ message: 'Get one successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('getUsersOne', e, 'Unknown error'));
        }
    }

    async postUsers(req, res, next) {
        try {
            const data = await UsersModel.add(req.body);

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.status(200).json({ message: 'Insert successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('postUsers', e, 'Unknown error'));
        }
    }

    async loginUsers(req, res, next) {
        try {
            const data = await UsersModel.getOne(req.body);

            if (data.errors) {
                return res.status(422).json(data);
            }

            const token = tokenGenerate({
                id: data.id,
                username: data.username,
                roles: data.roles,
            });

            return res.json({ token, data });
        } catch (e) {
            return res.status(400).json(errorWrap('login', e, 'Unknown error'));
        }
    }

    async putUsers(req, res, next) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await UsersModel.edit(id, body);

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.json({ message: 'Update successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('putUsers', e, 'Unknown error'));
        }
    }

    async deleteUsers(req, res, next) {
        try {
            const id = req.params.id;
            const data = await UsersModel.remove(id);

            return res.json({ message: 'Delete successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('deleteUsers', e, 'Unknown error'));
        }
    }
}

module.exports = new UsersController();

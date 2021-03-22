const RolesModel = require(global.pathLib.fromRoot('/app/models/RolesModel'));
const { errorWrap } = require(global.pathLib.fromRoot('/app/libs/errorLib'));

class RolesController {
    async getRoles(req, res, next) {
        try {
            const data = await RolesModel.getAll();

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.json({ message: 'Get list successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('getRoles', e, 'Unknown error'));
        }
    }

    async getRolesOne(req, res, next) {
        try {
            const data = await RolesModel.getOne(req.params);

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.json({ message: 'Get one successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('getRolesOne', e, 'Unknown error'));
        }
    }

    async postRoles(req, res, next) {
        try {
            const data = await RolesModel.add(req.body);

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.status(200).json({ message: 'Insert successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('postRoles', e, 'Unknown error'));
        }
    }

    async putRoles(req, res, next) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await RolesModel.edit(id, body);

            if (data.errors) {
                return res.status(422).json(data);
            }

            return res.json({ message: 'Update successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('putRoles', e, 'Unknown error'));
        }
    }

    async deleteRoles(req, res, next) {
        try {
            const id = req.params.id;
            const data = await RolesModel.remove(id);

            return res.json({ message: 'Delete successful', data });
        } catch (e) {
            return res
                .status(400)
                .json(errorWrap('deleteRoles', e, 'Unknown error'));
        }
    }
}

module.exports = new RolesController();

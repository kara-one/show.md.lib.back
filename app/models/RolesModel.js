const Roles = require(global.pathLib.fromRoot(
    '/system/db/mongodb/modules/Roles',
));
const { errorWrap } = require(global.pathLib.fromRoot('/app/libs/errorLib'));

class RolesModel {
    constructor() {}

    async getAll() {
        return await Roles.find();
    }

    async getOne(params) {
        let filter = {};

        // Check data
        if (params.id) filter._id = params.id;
        if (params.rolename) filter.rolename = params.rolename;

        if (Object.keys(filter) === 0) {
            return errorWrap('params', params, 'Filter params not determined');
        }

        const data = await Roles.findOne(filter);
        if (!data) {
            const keys = Object.keys(filter);
            return errorWrap(keys[0], filter[keys[0]], 'Role not found');
        }

        return data;
    }

    async add(params) {
        // Validate
        const candidate = await this.getOne({ rolename: params.rolename });
        if (!candidate.errors) {
            return errorWrap('rolename', params.rolename, 'Rolename must be unique');
        }

        // Check data
        const data = {};
        if (params.rolename) data.rolename = params.rolename;

        return await new Roles(data).save();
    }

    async edit(id, params) {
        if (!id) return errorWrap('id', id, 'Id invalid');

        // Validate
        const candidate = await this.getOne({ rolename: params.rolename });
        if (candidate) {
            return errorWrap('rolename', params.rolename, 'Rolename must be unique');
        }

        const data = params;

        return await Roles.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async remove(id) {
        if (!id) return errorWrap('id', id, 'Id invalid');

        return await Roles.findByIdAndDelete(id);
    }
}

module.exports = new RolesModel();

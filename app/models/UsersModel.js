const Users = require(global.pathLib.fromRoot(
    '/system/db/mongodb/modules/Users',
));
const { errorWrap } = require(global.pathLib.fromRoot('/app/libs/errorLib'));
const { cryptPwd, comparePwd } = require(global.pathLib.fromRoot(
    '/app/libs/cryptLib',
));

class UsersModel {
    constructor() {
        this.defaultRole = 'USER';
    }

    async getAll() {
        return await Users.find();
    }

    async getOne(params) {
        let filter = {};

        // Check data
        if (params.id) filter._id = params.id;
        if (params.username) filter.username = params.username;

        if (Object.keys(filter) === 0) {
            return errorWrap('params', params, 'Filter params not determined');
        }

        const data = await Users.findOne(filter);
        if (!data) {
            const keys = Object.keys(filter);
            return errorWrap(keys[0], filter[keys[0]], 'User not found');
        }

        if (params.password && !comparePwd(params.password, data.password)) {
            return errorWrap('password', params.password, 'Password is wrong');
        }

        return data;
    }

    async add(params) {
        // Validate
        const candidate = await this.getOne({ username: params.username });
        if (!candidate.errors) {
            return errorWrap(
                'username',
                params.username,
                'Username must be unique',
            );
        }

        // Check data
        const data = {
            roles: [this.defaultRole],
        };
        if (params.username) data.username = params.username;
        if (params.password) data.password = cryptPwd(params.password);

        return await new Users(data).save();
    }

    async edit(id, params) {
        if (!id) return errorWrap('id', id, 'Id invalid');

        // Validate
        if (params.username) {
            const candidate = await this.getOne({ username: params.username });
            if (candidate) {
                return errorWrap(
                    'username',
                    params.username,
                    'Username must be unique',
                );
            }
        }

        const data = params;
        // data.roles = [this.defaultRole];
        if (params.password) data.password = cryptPwd(params.password);

        return await Users.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async remove(id) {
        if (!id) return errorWrap('id', id, 'Id invalid');

        return await Users.findByIdAndDelete(id);
    }
}

module.exports = new UsersModel();

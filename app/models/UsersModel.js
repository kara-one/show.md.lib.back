const bcrypt = require('bcryptjs');

const Users = require(global.pathLib.fromRoot('/system/db/mongodb/modules/Users'));

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
        if (params.id) filter = { _id: params.id };
        else if (params.username) filter = { username: params.username };
        else throw new Error('UsersModel.getOne params invalid');

        return await Users.findOne(filter);
    }
    async add(params) {
        const data = {
            roles: [this.defaultRole],
        };

        // Check data
        if (params.username) data.username = params.username;
        if (params.password)
            data.password = bcrypt.hashSync(params.password, 7);

        const user = new Users(data);

        // Validate
        const errorValidate = await user.validate();
        if (errorValidate) throw new Error('UsersModel.add', errorValidate);

        return await user.save();
    }
    async edit(id, params) {
        if (!id) throw new Error('UsersModel.edit');

        const data = params;
        // data.roles = [this.defaultRole];
        if (params.password)
            data.password = bcrypt.hashSync(params.password, 7);

        // // Validate
        // const errorValidate = await newUser.validate();
        // if (errorValidate) throw new Error('UsersModel.edit', errorValidate);

        return await Users.findOneAndUpdate({ _id: id }, data, {new: true});
    }
    async remove(id) {
        return await Users.findByIdAndDelete(id);
    }
}

module.exports = new UsersModel();

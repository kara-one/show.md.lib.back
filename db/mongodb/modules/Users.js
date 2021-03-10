const { Schema, model } = require('mongoose');

const Users = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Roles' }],
});

module.exports = model('Users', Users);

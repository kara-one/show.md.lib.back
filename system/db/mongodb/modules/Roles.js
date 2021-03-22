const { Schema, model } = require('mongoose');

const Roles = new Schema({
    rolename: {
        type: String,
        uppercase: true,
        unique: true,
        required: true,
        default: 'USER',
    },
});

module.exports = model('Roles', Roles);

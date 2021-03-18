const { Schema, model } = require('mongoose');

const Roles = new Schema({
    values: { type: String, unique: true, required: true, default: 'USER' },
});

module.exports = model('Roles', Roles);

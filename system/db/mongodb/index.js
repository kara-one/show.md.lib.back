const mongoose = require('mongoose');
const dbOptions = require('./dbOptions');

class MongoDb {
    constructor() {}

    async connect() {
        try {
            const uri = dbOptions.url;

            const options = dbOptions.options;

            await mongoose.connect(uri, options, () =>
                console.log(
                    '\x1b[32m',
                    'Connection to the MongoDb has been established successfully.',
                    '\x1b[0m',
                ),
            );
        } catch (e) {
            throw new Error('Unable to connect to the MongoDb:', e);
        }
    }
}

module.exports = new MongoDb();

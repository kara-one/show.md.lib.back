const mongoose = require('mongoose');
const dbOptions = require('./dbOptions');

class MongoDb {
    constructor() {}

    async connect() {
        try {
            const db_url = dbOptions.url
                .replace('<user>', dbOptions.user)
                .replace('<password>', dbOptions.password)
                .replace('<name>', dbOptions.name);

            await mongoose.connect(db_url, { useFindAndModify: false }, () =>
                console.log(
                    'Connection to the MongoDb has been established successfully.',
                ),
            );
        } catch (e) {
            throw new Error('Unable to connect to the MongoDb:', e);
        }
    }
}

module.exports = new MongoDb();

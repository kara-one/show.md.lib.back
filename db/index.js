const mongoDb = require('./mongodb');

class Db {
    async connect() {
        await mongoDb.connect();
    }
}

module.exports = new Db();

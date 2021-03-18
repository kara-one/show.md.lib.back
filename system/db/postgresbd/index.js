const { Sequelize } = require('sequelize');
const dbOptions = require('./dbOptions');

class PostgresDb {
    constructor() {}

    async connect() {
        try {
            const sequelize = new Sequelize(dbOptions);
            await sequelize.authenticate();
            
            console.log(
                'Connection to the PostgresDb has been established successfully.',
            );
        } catch (e) {
            throw new Error('Unable to connect to the PostgresDb:', e);
        }
    }
}

module.exports = new PostgresDb();

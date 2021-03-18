global.pathLib = require('./system/libs/pathLib');

const server = require('./system/server');
const db = require('./system/db');

async function init() {
    await server.start();
    await db.connect();
}

init().catch((e) => {
    console.log(e);
});

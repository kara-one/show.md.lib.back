global.pathLib = require('./libs/pathLib');

const server = require('./server');
const db = require('./db');

async function init() {
    await server.start();
    await db.connect();
}

init().catch((e) => {
    console.log(e);
});

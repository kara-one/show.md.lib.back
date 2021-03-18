const serverExpress = require('./express');

/** If you need SSL */
// const fs = require('fs');
// const privateKey = fs.readFileSync('certificates/key.pem', 'utf8');
// const certificate = fs.readFileSync('certificates/cert.pem', 'utf8');


class Server {
    constructor() {
        serverExpress.PORT = this._normalizePort(process.env.PORT || 3000);

        serverExpress.PORT_SSL = null;

        /** If you need SSL */
        // serverExpress.PORT_SSL = this._normalizePort(
        //     process.env.PORT_SSL || 8443,
        // );
        // serverExpress.SSL_KEY = privateKey;
        // serverExpress.SSL_CERT = certificate;
    }

    start() {
        serverExpress.start();
    }

    _normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }
}

module.exports = new Server();

const express = require('express');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser');

const rootRouter = require('./routes');

class serverExpress {
    constructor() {
        this.PORT = null;
        this.PORT_SSL = null;
        this.SSL_KEY = null;
        this.SSL_CERT = null;

        this.app = express();

        /** Templates */
        this.app.set('views', global.pathLib.fromRoot('views'));
        this.app.set('view engine', 'jade');
        this.app.use(express.static(global.pathLib.fromRoot('public')));

        /** Middlewares */
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        /** Router */
        this.app.use('/', rootRouter);
    }

    start() {
        if (!this.PORT) {
            throw new Error('Server Express: define PORT');
        }

        const httpServer = http.createServer(this.app);
        httpServer.listen(this.PORT, (e) => {
            if (e) {
                throw new Error('Something bad happened', e);
            }

            console.log('Server Express listening on port', this.PORT);
        });

        /** If you need SSL */
        if (this.PORT_SSL) {
            const credentials = { key: this.SSL_KEY, cert: this.SSL_CERT };
            const httpsServer = https.createServer(credentials, this.app);

            httpsServer.listen(this.PORT_SSL, (e) => {
                if (e) {
                    throw new Error('Something bad happened', e);
                }

                console.log('Server Express listening on port', this.PORT_SSL);
            });
        }
    }
}

module.exports = new serverExpress();

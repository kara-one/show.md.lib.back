const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const rootRouter = require('./routes');

class serverExpress {
    constructor() {
        this.PORT = null;
        this.PORT_SSL = null;
        this.SSL_KEY = null;
        this.SSL_CERT = null;

        this.app = express();

        /** Middlewares */
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        /** Static */
        this.app.use(express.static(global.pathLib.fromRoot('/public')));

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

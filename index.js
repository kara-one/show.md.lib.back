const server = require('./server');

async function init() {
    await server.start();

}

init()
    .catch((e) => {
        console.log(e);        
    })

/* const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./userRoute');

const PORT = process.env.PORT || 5000;
const DB = {
    name: 'del_fullaut',
    user: 'user',
    password: 'user123',
    url:
        'mongodb+srv://<user>:<password>@cluster0.laphr.mongodb.net/<name>?retryWrites=true&w=majority',
};
const DB_URL = DB.url
    .replace('<user>', DB.user)
    .replace('<password>', DB.password)
    .replace('<name>', DB.name);

const app = express();

app.use(express.json());
app.use('/auth', userRoute);

const start = () => {
    try {
        mongoose.connect(DB_URL, () => console.log('DB connected'));
        app.listen(PORT, () => console.log('Start server on port ', PORT));
    } catch (e) {
        console.log(e);
    }
};

start();
 */

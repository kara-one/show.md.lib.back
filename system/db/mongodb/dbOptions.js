module.exports = {
    // name: 'del_fullaut',
    // user: 'user',
    // password: 'user123',
    // url: 'mongodb+srv://<user>:<password>@cluster0.laphr.mongodb.net/<name>?retryWrites=true&w=majority',
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
};
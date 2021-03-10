module.exports = {
    name: 'del_fullaut',
    user: 'user',
    password: 'user123',
    url:
        'mongodb+srv://<user>:<password>@cluster0.laphr.mongodb.net/<name>?retryWrites=true&w=majority',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
};
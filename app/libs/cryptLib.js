const bcrypt = require('bcryptjs');

module.exports = {
    cryptPwd(password) {
        return bcrypt.hashSync(password, 7);
    },
    comparePwd(password, hashPwd) {
        return bcrypt.compareSync(password, hashPwd);
    },
};

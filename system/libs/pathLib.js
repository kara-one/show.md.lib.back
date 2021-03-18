const path = require('path');

class pathLib {
    fromRoot(to) {
        return path.join(path.dirname(require.main.filename), to);
    }
}

module.exports = new pathLib();

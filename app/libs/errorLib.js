module.exports = {
    errorWrap(param, value, msg) {
        return {
            errors: [
                {
                    msg,
                    param,
                    value,
                },
            ],
        };
    },
};

const viewSafeConfig = require('../../config/viewSafe');
const config = require('../../config/main');

module.exports = (app) => {
    Object.entries(viewSafeConfig).forEach(([key, value]) => {
        app.locals[key] = value;
    });
    app.locals.defaultPassword = config.defaultPassword;
    return app;
};

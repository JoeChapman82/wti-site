const readProperties = require('../readProperties');
module.exports = (app) => {
    app.get('/version', readProperties);
    return app;
};

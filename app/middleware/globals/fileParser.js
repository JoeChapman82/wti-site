const shouldParseFile = require('../../helpers/shouldParseFile');
const parseFile = require('../fileUpload/parseFile');

module.exports = (app) => {
    app.use((req, res, next) => shouldParseFile(req.url) ? parseFile(req, res, next) : next());
    return app;
};

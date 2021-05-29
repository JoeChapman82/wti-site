const express = require('express');
const shouldParseBody = require('../../helpers/shouldParseBody');
const parseJSON = express.json();
const parseUrlEncoded = express.urlencoded( {extended : false} );

module.exports = (app) => {
    app.use((req, res, next) => shouldParseBody(req.url) ? parseJSON(req, res, next) : next());
    app.use((req, res, next) => shouldParseBody(req.url) ? parseUrlEncoded(req, res, next) : next());
    return app;
};

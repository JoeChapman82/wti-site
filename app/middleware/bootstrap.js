const requireDir = require('require-dir');
const globals = requireDir('./globals');
const unprotectedRoutes = require('../routes/unprotectedRoutes');
const routes = require('../routes/routes');
const authorisation = require('./authorisation/main');
const roleAuthorisation = require('./authorisation/roleAuthorisation');

module.exports = app => {
	globals.helmet(app);
	if (process.env.HTTPS !== 'false') {
		app.use(globals.httpsRedirect);
	}
	globals.static(app);
	globals.trustProxy(app);
	globals.serveFavicon(app);
	globals.nunjucks(app);
	globals.fileParser(app);
	globals.cookieParser(app);
	globals.bodyParser(app);
	globals.csrf(app);
	globals.setAppLocals(app);
	app.use(globals.defineActiveView);
	globals.setCurrentYear(app);
	globals.addVersionEndpoint(app);
	unprotectedRoutes(app);
	globals.handleDuplicateInputs(app);
	app.use(authorisation);
	app.all('/admin/*', roleAuthorisation.admin);
	globals.getLastBackupTime(app);
	routes(app);
	app.use(globals.errorHandler);
	return app;
};

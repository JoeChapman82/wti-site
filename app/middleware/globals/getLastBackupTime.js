const backupDb = require('../../helpers/backupDb');

module.exports = app => {
	app.use((req, res, next) => {
		res.locals.lastBackupTime = backupDb();
		return next();
	});
};

module.exports = app => {
	app.use((req, res, next) => {
		Object.entries(req.body).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				req.body[key] = value[0];
			}
		});
		return next();
	});
	return app;
};

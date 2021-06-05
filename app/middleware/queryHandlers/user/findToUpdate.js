const update = require('../../../model/user/update');
const redirects = require('../../../controllers/redirects');
const renders = require('../../../controllers/renders');

module.exports = (req, res, next) => {
	update
		.byId(res.locals.userToken.sub, {
			password: res.locals.hash,
			username: req.body.username,
			email: req.body.email,
			hasDefaultPassword: false,
		})
		.then(response => {
			res.locals.user = response;
			return next();
		})
		.catch(error => {
			return redirects.goneWrong(req, res);
		});
};

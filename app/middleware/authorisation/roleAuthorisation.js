const findHome = require('../findHome');
const redirects = require('../../controllers/redirects');

module.exports = {
	admin: (req, res, next) => {
		if (
			res.locals.userToken.hasDefaultPassword &&
			req.url !== '/admin/update-my-details'
		) {
			return redirects.adminUpdateMyDetails(req, res);
		}
		return res.locals.userToken.permissions === 'Admin'
			? next()
			: findHome(req, res, next);
	},
};

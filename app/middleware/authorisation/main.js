const jwt = require('jsonwebtoken');
const redirects = require('../../controllers/redirects');
const assignToken = require('../assignToken.js');
const config = require('../../config/main');

module.exports = (req, res, next) => {
	let token;
	if (
		req._parsedUrl.pathname === '/new-user' ||
		req._parsedUrl.pathname === '/reset-password'
	) {
		token = req.query.token;
		res.locals.tokenRaw = token;
	} else {
		token = req.signedCookies[config.session.cookieName];
	}
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				if (req.signedCookies[config.session.cookieName]) {
					res.clearCookie(config.session.cookieName);
					return redirects.index(req, res);
				} else {
					redirects.index(req, res);
				}
			} else {
				res.locals.userToken = decodedToken;
				next();
			}
		});
	} else {
		console.log('no valid token found');
		return redirects.index(req, res);
	}
};

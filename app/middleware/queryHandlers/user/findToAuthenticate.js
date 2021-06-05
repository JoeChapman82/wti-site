const find = require('../../../model/user/read');
const redirects = require('../../../controllers/redirects');
const renders = require('../../../controllers/renders');
const errorMessages = require('../../validation/messages/errorMessages');

module.exports = (req, res, next) => {
	find
		.toAuthenticate(req.body.email)
		.then(response => {
			if (response !== null) {
				res.locals.user = response;
				return next();
			} else {
				res.locals.errors = {
					email: [errorMessages.unknownEmail],
					password: [errorMessages.unknownPassword],
				};
				return renders.index(req, res);
			}
		})
		.catch(error => {
			return redirects.goneWrong(req, res);
		});
};

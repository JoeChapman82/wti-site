const bcrypt = require('bcrypt');
const redirects = require('../controllers/redirects');
const renders = require('../controllers/renders');
const errorMessages = require('./validation/messages/errorMessages');
const saltRounds = 12;

module.exports = {
	hashPassword: async (req, res, next) => {
		let password =
			typeof req.body.newPassword === 'undefined'
				? req.body.password
				: req.body.newPassword;
		try {
			const hash = await bcrypt.hash(password, saltRounds);
			res.locals.hash = hash;
			return next();
		} catch (error) {
			console.log(error);
			return redirects.goneWrong(req, res);
		}
	},
	comparePassword: async (req, res, next) => {
		try {
			const isMatching = await bcrypt.compare(
				req.body.password,
				res.locals.user.password
			);
			if (isMatching) {
				return next();
			} else {
				res.locals.errors = {
					email: [errorMessages.unknownEmail],
					password: [errorMessages.unknownPassword],
				};
				return renders.index(req, res);
			}
		} catch (error) {
			console.log(error);
			return redirects.goneWrong(req, res);
		}
	},
	comparePasswordToUpdate: async (req, res, next) => {
		try {
			const isMatching = await bcrypt.compare(
				req.body.password,
				res.locals.user.password
			);
			if (isMatching) {
				return next();
			} else {
				res.locals.errors = {
					password: [errorMessages.incorrectPassword],
				};
				return renders.adminUpdateMyDetails(req, res);
			}
		} catch (error) {
			console.log(error);
			return redirects.goneWrong(req, res);
		}
	},
};

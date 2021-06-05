const find = require('../../../model/user/read');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
	find
		.all()
		.then(response => {
			res.locals.lastupdated = new Date();
			res.locals.users = response;
			next();
		})
		.catch(error => {
			console.log(error);
			return redirects.goneWrong(req, res);
		});
};

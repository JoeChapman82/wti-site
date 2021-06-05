const find = require('../../../model/record/read');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
	find
		.byQuery({ createdBy: req.params.id })
		.then(response => {
			res.locals.lastupdated = new Date();
			res.locals.records = response;
			return next();
		})
		.catch(error => {
			console.log(error);
			return redirects.goneWrong(req, res);
		});
};

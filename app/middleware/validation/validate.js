const requireDir = require('require-dir');
const schemas = requireDir('./schemas', { recurse: true });
const validators = requireDir('./validators');
const schemaMap = require('./maps/schemaMap');
const errorMessages = require('./messages/errorMessages');
const successMessages = require('./messages/successMessages');
const redirects = require('../../controllers/redirects');
const renders = require('../../controllers/renders');
const unvalidatedFields = ['_csrf', 'submit'];

module.exports = (req, res, next) => {
	if (req.body.activeTab) {
		res.locals.activeTab = req.body.activeTab;
	}
	let matchedPath = Object.keys(schemaMap)
		.reverse()
		.find(key => new RegExp(key).test(req.originalUrl.split('?')[0]));
	const validationSchema = schemas[schemaMap[matchedPath][req.method]];
	if (!validators.exists(validationSchema)) {
		console.log('no validation schema defined');
		return redirects.goneWrong(req, res);
	}
	const validatorKeys = Object.keys(validationSchema.validators);

	validatorKeys.forEach(key => {
		validationSchema.validators[key].forEach(validation => {
			let validationMethod = validators[validation.validator];
			let conditionMet = true;
			if (validation.isConditional) {
				validation.conditions.forEach(condition => {
					if (condition.value) {
						if (req.body[condition.field] !== condition.value) {
							conditionMet = false;
						}
					} else if (condition.validator) {
						if (
							!validators[condition.validator](
								req.body[key],
								...(validation.options || []),
								req.body[validation.comparitor]
							)
						) {
							conditionMet = false;
						}
					}
				});
			}
			if (
				conditionMet &&
				!validationMethod(
					req.body[key],
					...(validation.options || []),
					req.body[validation.comparitor]
				)
			) {
				res.locals.errors = res.locals.errors || {};
				res.locals.errors[key] = res.locals.errors[key] || [];
				res.locals.errors[key].push(validation.message);
			}
		});
	});

	console.log(res.locals.errors);
	if (typeof res.locals.errors === 'undefined') {
		return next();
	} else {
		return renders[validationSchema.renderViewMethod](req, res);
	}
};

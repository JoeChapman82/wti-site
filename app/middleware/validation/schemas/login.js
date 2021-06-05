const errorMessages = require('../messages/errorMessages');

module.exports = {
	renderViewMethod: 'index',
	validators: {
		email: [
			{
				validator: 'isEmail',
				message: errorMessages.isEmail,
			},
		],
		password: [
			{
				validator: 'exists',
				message: `${errorMessages.exists} your password`,
			},
			{
				validator: 'notEmpty',
				message: `${errorMessages.notEmpty} your password`,
			},
			{
				validator: 'isString',
				message: errorMessages.isString,
			},
		],
	},
};

module.exports = (value, options) => {
	return typeof value === 'string' && value.length >= options.min;
};

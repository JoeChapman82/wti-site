module.exports = value => {
	return (
		typeof value === 'object' &&
		!Array.isArray(value) &&
		value !== null &&
		Object.keys(value).length > 0
	);
};

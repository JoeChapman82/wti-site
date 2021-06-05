module.exports = value => {
	if (value === null || value === undefined) {
		return;
	}
	const date = new Date(value);
	const months = {
		0: 'Jan',
		1: 'Feb',
		2: 'Mar',
		3: 'Apr',
		4: 'May',
		5: 'Jun',
		6: 'Jul',
		7: 'Aug',
		8: 'Sep',
		9: 'Oct',
		10: 'Nov',
		11: 'Dec',
	};
	let formedDate = `${date.getDate()}-${
		months[date.getMonth()]
	}-${date.getFullYear()}`;
	return formedDate;
};

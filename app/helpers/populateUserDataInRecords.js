module.exports = (data, users) => {
	let records = JSON.parse(JSON.stringify(data));
	records.forEach((record, index) => {
		let createdBy = users.find(x => x._id == record.createdBy);
		let lastUpdatedBy = users.find(x => x._id == record.lastUpdatedBy);
		records[index].createdBy = createdBy ? createdBy.username : 'System';
		records[index].lastUpdatedBy = lastUpdatedBy ? lastUpdatedBy.username : '';
	});
	return records;
};

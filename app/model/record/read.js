const Record = require('./record');

module.exports = {
	all: (start, limit) => Record.find({}).limit(limit).skip(start),
	dump: () => Record.find({}),
	byId: id => Record.findById(id),
	byQuery: (query, start, limit) => Record.find(query).limit(limit).skip(start),
	count: query => Record.countDocuments(query),
	distinct: param => Record.distinct(param),
};

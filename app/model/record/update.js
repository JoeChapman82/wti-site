const Record = require('./record');

module.exports = {
	one: (find, update) => Record.findOneAndUpdate(find, update),
	byId: (id, update, callback) =>
		Record.findByIdAndUpdate(id, update, { new: true }, callback),
};

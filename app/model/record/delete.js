const Record = require('./record');

module.exports = {
    byId: (id) => Record.findByIdAndRemove(id)
};

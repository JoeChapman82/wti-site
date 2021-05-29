const Record = require('./record');

module.exports = (record) => {
    const newRecord = new Record(record);
    return newRecord.save();
};

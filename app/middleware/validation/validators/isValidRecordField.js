const record = require('../../../model/record/record');
const nonEditableFields =   ['_id', '__v', 'id']

const editableFields = Object.keys(record.schema.tree);

module.exports = (value) => {
    return editableFields.includes(value) && !nonEditableFields.includes(value);
};
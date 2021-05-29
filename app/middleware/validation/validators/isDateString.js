module.exports = (value) => {
    if(!value) {
        return true;
    }
    return typeof value === 'string' && value.split('-').length === 3;
};
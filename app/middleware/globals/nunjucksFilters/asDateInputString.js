module.exports = (date) => {
    if(!date || !date.getFullYear) {
        return date;
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
};

module.exports = {
    csv: (req, file, callback) => {
        console.log(file.mimetype);
        if(file.mimetype !== 'text/csv') {
            callback(null, false);
        } else {
            callback(null, true);
        }
    }
};

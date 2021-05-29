const multer = require('multer');
const storage = require('./storage');
const fileFilters = require('./fileFilters');

const upload = multer({
    storage: storage,
    fileFilter: fileFilters.csv,
    limits: {fileSize: 10000000}
}).single('uploadFile');

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if(err) {
            if(err.code === 'LIMIT_FILE_SIZE') {
                res.locals.errors = {uploadFile: {msg: 'Reduce the file size'}};
                return next();
            } else {
                return res.status(500).send('Internal Server Error');
            }
        } else {
            if(typeof req.file === 'undefined') {
                res.locals.errors = {uploadFile: {msg: 'choose a csv file to upload'}};
                return next();
            } else {
                res.locals.successes = {uploadFile: {msg: 'File received.'}};
                return next();
            }
        }
    });


};

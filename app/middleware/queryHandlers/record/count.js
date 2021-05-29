const find = require('../../../model/record/read');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    res.locals.lastUpdatedAt = new Date();
    find.count()
        .then(response => {
            res.locals.recordCount = response;
            next();
        })
        .catch(error => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

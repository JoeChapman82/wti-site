const find = require('../../../model/record/read');
const redirects = require('../../../controllers/redirects');
const { recordRetrievalLimit } = require('../../../config/main');
const populateUserDataInRecords = require('../../../helpers/populateUserDataInRecords');

module.exports = (req, res, next) => {
    const start = req.query.start ? parseInt(req.query.start) : 1;
    const end = res.locals.recordCount - start < recordRetrievalLimit ?
        res.locals.recordCount :
        (start - 1) + recordRetrievalLimit;
    res.locals.lastUpdatedAt = new Date();
    find.all(start, recordRetrievalLimit)
        .then(response => {
            let records = populateUserDataInRecords(response, res.locals.users);
            res.locals.lastupdated = new Date();
            res.locals.records = records;
            res.locals.startPoint = start;
            res.locals.endPoint = end;
            res.locals.showBack = start !== 1;
            res.locals.recordRetrievalLimit = recordRetrievalLimit;
            res.locals.showForward = (start - 1) + recordRetrievalLimit < res.locals.recordCount;
            next();
        })
        .catch(error => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

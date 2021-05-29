const find = require('../../../model/record/read');
const redirects = require('../../../controllers/redirects');
const { recordRetrievalLimit } = require('../../../config/main');
const populateUserDataInRecords = require('../../../helpers/populateUserDataInRecords');

module.exports = async (req, res, next) => {
    console.log(req.body);
    let recordCountSaved;
    let recordCount;
    res.locals.lastUpdatedAt = new Date();
    try {
        recordCountSaved = await find.count({finalDisposition: "Released"});
        recordCount = await find.count();
        res.locals.recordCountSaved = recordCountSaved;
        res.locals.recordCount = recordCount;
        res.locals.percentageSaved = ((recordCountSaved / recordCount) * 100).toFixed(2);
    } catch(error) {
        console.log(error);
        return redirects.goneWrong(req, res);
    }
    const start = req.body.start ? parseInt(req.body.start) : 1;
    const end = recordCountSaved - start < recordRetrievalLimit ?
        recordCountSaved :
        (start - 1) + recordRetrievalLimit;
    find.byQuery({finalDisposition: "Released"}, start, recordRetrievalLimit)
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

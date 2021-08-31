const find = require('../../../model/record/read');
const redirects = require('../../../controllers/redirects');
const { recordRetrievalLimit } = require('../../../config/main');
const populateUserDataInRecords = require('../../../helpers/populateUserDataInRecords');

module.exports = async (req, res, next) => {
    console.log('hello');
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0);
    let recordCountMonthly;
    res.locals.lastUpdatedAt = new Date();
    try {
        recordCountMonthly = await find.count({ dateOfAdmission: { $gte: startOfMonth, $lte: now } });
    } catch (error) {
        console.log(error);
        return redirects.goneWrong(req, res);
    }
    const start = req.body.start ? parseInt(req.body.start) : recordCountMonthly === 0 ? 0 : 1;
    const end = recordCountMonthly - start < recordRetrievalLimit ? recordCountMonthly : start - 1 + recordRetrievalLimit;
    find.byQuery({ dateOfAdmission: { $gte: startOfMonth, $lte: now } }, start - 1, recordRetrievalLimit)
        .then(response => {
            console.log(response);
            let records = populateUserDataInRecords(response, res.locals.users);
            res.locals.lastupdated = new Date();
            res.locals.records = records;
            res.locals.startPoint = start;
            res.locals.endPoint = end;
            res.locals.showBack = start > 1;
            res.locals.recordRetrievalLimit = recordRetrievalLimit;
            res.locals.showForward =
				start - 1 + recordRetrievalLimit < res.locals.recordCount;
            next();
        })
        .catch(error => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

const find = require('../../../model/record/read');
const redirects = require('../../../controllers/redirects');
const { recordRetrievalLimit } = require('../../../config/main');
const acceptedQueryFields = require('../../../config/lists/acceptedQueryFields');
const populateUserDataInRecords = require('../../../helpers/populateUserDataInRecords');
const nonStringFields = ['dateAdded', 'addedBy', 'lastUpdatedBy'];
const nonQueryFields = ['_csrf', '_id', 'submit'];

module.exports = async (req, res, next) => {
    let toQuery = {};
    let queryParams = {};
    Object.entries(req.body).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value = value[0];
        }
        if (
            typeof value === 'string' &&
			value.length > 0 &&
			acceptedQueryFields.includes(key)
        ) {
            if (!nonStringFields.includes(key) && !nonStringFields.includes(key)) {
                toQuery[key] = { $regex: value, $options: 'i' };
                queryParams[key] = value;
            } else if (key === 'dateAdded') {
                toQuery[key] = {
                    $gte: new Date(`${value} 00:00:00`),
                    $lte: new Date(`${value} 23:59:59`)
                };
            } else if (key === 'addedBy' || key === 'lastUpdatedBy') {
                let user = res.locals.users.find(x => x.username == value);
                toQuery[key] = user ? user._id : 'Unknown';
            }
        }
    });

    const recordCount = await find.count(toQuery);
    let start = req.body.start ? parseInt(req.body.start) : 0;
    if (
        req.originalUrl === '/admin/existing-cases' &&
		Object.keys(toQuery).length > 0 &&
		!req.body.hasAtLeastOneSubmit
    ) {
        start = 0;
    }
    const end = recordCount - start < recordRetrievalLimit ? recordCount : start - 1 + recordRetrievalLimit;
    res.locals.lastUpdatedAt = new Date();
    res.locals.lastUpdatedAt = new Date();

    find
        .byQuery(toQuery, start, recordRetrievalLimit)
        .then(response => {
            if (response.length > 0) {
                if (start === 0) {
                    start = 1;
                }
                let records = populateUserDataInRecords(response, res.locals.users);
                res.locals.recordCount = recordCount;
                res.locals.records = records;
                res.locals.startPoint = start;
                res.locals.endPoint = end;
                res.locals.showBack = start !== 1;
                res.locals.recordRetrievalLimit = recordRetrievalLimit;
                res.locals.queryParams = queryParams;
                res.locals.showForward = start - 1 + recordRetrievalLimit < recordCount;
                res.locals.hasAtLeastOneSubmit = true;
                return next();
            } else {
                res.locals.startPoint = 0;
                res.locals.recordCount = 0;
                res.locals.noRecordsFound = true;
                return next();
            }
        })
        .catch(error => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

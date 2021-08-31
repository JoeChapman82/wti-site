const findRecords = require('../../../model/record/read');

module.exports = async (req, res, next) => {
    const identityNames = await findRecords.distinct('identityName');
    let totalCalls = [];
    let releasedCalls = [];
    let pendingCalls = [];
    let results = [];
    identityNames.forEach(identityName => {
        totalCalls.push(findRecords.count({ identityName }));
        releasedCalls.push(
            findRecords.count({ identityName, finalDisposition: 'Released' })
        );
        pendingCalls.push(
            findRecords.count({
                identityName,
                finalDisposition: 'Pending under care'
            })
        );
    });
    let totalResponses = await Promise.all(totalCalls);
    let releasedResponses = await Promise.all(releasedCalls);
    let pendingResponses = await Promise.all(pendingCalls);
    totalResponses.forEach((response, index) => {
        results.push({ identityName: identityNames[index], total: response });
    });
    releasedResponses.forEach((response, index) => {
        results[index].released = response;
    });
    pendingResponses.forEach((response, index) => {
        results[index].pending = response;
    });
    res.locals.results = results.sort((a, b) => (a.total > b.total ? -1 : 1));
    return next();
};

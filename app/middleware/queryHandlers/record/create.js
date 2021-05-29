const create = require('../../../model/record/create');
const redirects = require('../../../controllers/redirects');
const uuidV4 = require('uuid/v4');

module.exports = (req, res, next) => {
    let record = {
        caseNumber: uuidV4(),
        placeOfRescue: req.body.placeOfRescue,
        groupName: req.body.groupName,
        identityName: req.body.identityName,
        class: req.body.class,
        zoneName: req.body.zoneName,
        lastUpdatedBy: res.locals.userToken.sub,
        createdBy: res.locals.userToken.sub,
        lastUpdatedAt: new Date(),
        dateAdded: new Date()
    };
    create(record)
        .then((response) => {
            res.locals.record = response;
            return next();
        })
        .catch((error) => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

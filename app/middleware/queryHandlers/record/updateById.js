const update = require('../../../model/record/update');
const redirects = require('../../../controllers/redirects');


module.exports = (req, res, next) => {
    let id = req.params.id || req.body._id;
    const toUpdate = {
        lastUpdatedAt: new Date(),
        lastUpdatedBy: res.locals.userToken.sub
    };
    Object.entries(req.body).forEach(([key, value]) => {
        if(key === 'facilityInSitu' || key === 'facilityExSitu') {
            if(req.body.rescueMode === 'In situ') {
                toUpdate.facility = req.body.facilityInSitu;
            } else {
                toUpdate.facility = req.body.facilityExSitu;
            }
        } else if(key !== '_csrf' && key !== 'dateAdded' && key !== 'caseNumber' && key !== '_id' && key !== 'submit' && typeof value === 'string' && value.length > 0) {
            toUpdate[key] = value;
        }
    });
    update.byId(id, {$set: toUpdate}, (err, result) => {
        if(err) {
            console.log(error);
            return redirects.goneWrong(req, res);
        }
        console.log(result);
        res.locals.record = result;
        res.locals.success = true;
        return next();
    });
};

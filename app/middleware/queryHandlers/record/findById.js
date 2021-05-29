const find = require('../../../model/record/read');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    let toQuery = req.params.id || req.body.id;
    find.byId(toQuery)
        .then(response => {
            res.locals.record = response;
            console.log(response);
            next();
        })
        .catch(error => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

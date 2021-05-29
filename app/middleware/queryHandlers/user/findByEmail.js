const find = require('../../../model/user/read');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    find.byEmail(req.body.email)
        .then(response => {
            res.locals.user = response;
            next();
        })
        .catch(error => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

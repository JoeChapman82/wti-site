const create = require('../../../model/user/create');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    if(res.locals.user !== null) {
        res.locals.errors = {email: ['don\'t create duplicate accounts']};
        return next();
    }
    create(req.body.email, req.body.username, res.locals.hash, req.body.role)
        .then((response) => {
            res.locals.createdUser = response;
            res.locals.success = true;
            return next();
        })
        .catch((error) => {
            console.log(error);
            return redirects.goneWrong(req, res);
        });
};

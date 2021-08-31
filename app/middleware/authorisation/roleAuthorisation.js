const findHome = require('../findHome');
const redirects = require('../../controllers/redirects');
const permissions = require('../../config/permissions/main');

module.exports = {
    admin: (req, res, next) => {
        if (
            res.locals.userToken.hasDefaultPassword &&
			req.url !== '/admin/update-my-details'
        ) {
            return redirects.adminUpdateMyDetails(req, res);
        }
        if(res.locals.userToken.permissions === 'Viewer' && (permissions.admin.includes(req.originalUrl) || permissions.editor.includes(req.originalUrl))) {
            return redirects.adminDashboard(req, res);
        } else if(res.locals.userToken.permissions === 'Editor' && permissions.admin.includes(req.originalUrl)) {
            return redirects.adminDashboard(req, res);
        } else if(res.locals.userToken.permissions !== 'Viewer' && req.method.toUpperCase === 'POST' && req.originalUrl.includes('/admin/existing-case')) {
            return redirects.adminDashboard(req, res);
        }
        return next();
    }
};

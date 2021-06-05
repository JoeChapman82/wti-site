const fileUploadRoutes = require('../config/lists/fileUploadRoutes');

module.exports = route => {
	return fileUploadRoutes.includes(route.split('?')[0]);
};

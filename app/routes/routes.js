const getController = require('../controllers/getController');
const postController = require('../controllers/postController');

module.exports = app => {
    app.get('/admin/dashboard', getController.adminDashboard);
    app.get('/admin/existing-cases', getController.adminExistingCases);
    app.post('/admin/existing-cases', postController.adminExistingCases);
    app.get('/admin/existing-cases-saved', getController.adminExistingCasesSaved);
    app.post('/admin/existing-cases-saved',postController.adminExistingCasesSaved);
    app.get('/admin/existing-cases-monthly', getController.adminExistingCasesMonthly);
    app.post('/admin/existing-cases-monthly',postController.adminExistingCasesMonthly);
    app.get('/admin/existing-cases/:id', getController.adminExistingCasesById);
    app.get('/admin/existing-users', getController.adminExistingUsers);
    app.get('/admin/new-case', getController.adminNewCase);
    app.post('/admin/new-case', postController.adminNewCase);
    app.get('/admin/search', getController.adminSearch);
    app.post('/admin/search', postController.adminSearch);
    app.get('/admin/key-taxa', getController.adminKeyTaxa);
    app.get('/admin/bulk-upload', getController.adminBulkUpload);
    app.post('/admin/bulk-upload', postController.adminBulkUpload);
    app.get('/admin/create-user', getController.adminCreateUser);
    app.post('/admin/create-user', postController.adminCreateUser);
    app.get('/admin/update-my-details', getController.adminUpdateMyDetails);
    app.post('/admin/update-my-details', postController.adminUpdateMyDetails);
    app.get('/admin/existing-case/:id', getController.adminExistingCase);
    app.post('/admin/existing-case/:id', postController.adminExistingCase);
    app.post('/admin/get-unique-values', postController.adminGetUniqueValues);
    app.post('/admin/get-animal-data-value', postController.adminGetAnimalDataValue);
    app.get('/admin/update-animal-data', getController.adminUpdateAnimalData);
    app.post('/admin/update-animal-data', postController.adminUpdateAnimalData);
    app.get('/admin/administration', getController.adminAdministration);
    app.get('/admin/generate-reports', getController.adminGenerateReports);
    app.post('/admin/generate-reports', postController.adminGenerateReports);
    app.all('*', [
        (req, res, next) => {
            console.log(req.url);
            // console.log(req.route);
            console.log(req.method);
            next();
        },
        getController.catchAll
    ]);
    return app;
};

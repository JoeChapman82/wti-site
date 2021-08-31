module.exports = {
    index: (req, res) => res.render('index'),
    adminDashboard: (req, res) => res.render('admin/dashboard'),
    adminExistingCases: (req, res) => res.render('admin/existing-cases'),
    adminExistingCasesSaved: (req, res) => res.render('admin/existing-cases-saved'),
    adminExistingCasesMonthly: (req, res) => res.render('admin/existing-cases-monthly'),
    adminExistingUsers: (req, res) => res.render('admin/existing-users'),
    adminExistingCase: (req, res) => res.render('admin/existing-case'),
    adminNewCase: (req, res) => res.render('admin/new-case'),
    adminSearch: (req, res) => res.render('admin/search'),
    adminKeyTaxa: (req, res) => res.render('admin/key-taxa'),
    adminBulkUpload: (req, res) => res.render('admin/bulk-upload'),
    adminCreateUser: (req, res) => res.render('admin/create-user'),
    adminUpdateMyDetails: (req, res) => res.render('admin/update-my-details'),
    adminAdministration: (req, res) => res.render('admin/administration'),
    adminGenerateReports: (req, res) => res.render('admin/generate-reports'),
    adminUpdateAnimalData: (req, res) => res.render('admin/update-animal-data'),
    errorsNotFound: (req, res) => res.render('errors/404'),
    errorsGoneWrong: (req, res) => res.render('errors/gone-wrong')
};

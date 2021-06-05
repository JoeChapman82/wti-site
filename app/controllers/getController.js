const renders = require('./renders');
const redirects = require('./redirects');
const queryRecord = require('../middleware/queryHandlers/record');
const queryUser = require('../middleware/queryHandlers/user');
const adminDashboardQueries = require('../middleware/queryHandlers/adminDashboardQueries');

module.exports = {
	index: [renders.index],
	adminDashboard: [adminDashboardQueries, renders.adminDashboard],
	adminExistingCases: [
		queryUser.findAll,
		queryRecord.count,
		queryRecord.findAll,
		renders.adminExistingCases,
	],
	adminExistingCasesSaved: [
		queryUser.findAll,
		queryRecord.findAllSaved,
		renders.adminExistingCasesSaved,
	],
	adminExistingCasesById: [
		queryRecord.findByCreator,
		renders.adminExistingCases,
	],
	adminExistingCase: [queryRecord.findById, renders.adminExistingCase],
	adminExistingUsers: [queryUser.findAll, renders.adminExistingUsers],
	adminNewCase: [renders.adminNewCase],
	adminSearch: [renders.adminSearch],
	adminKeyTaxa: [queryRecord.findTaxaData, renders.adminKeyTaxa],
	adminBulkUpload: [renders.adminBulkUpload],
	adminCreateUser: [renders.adminCreateUser],
	adminUpdateMyDetails: [renders.adminUpdateMyDetails],
	adminAdministration: [renders.adminAdministration],
	adminGenerateReports: [renders.adminGenerateReports],
	notFound: [renders.errorsNotFound],
	goneWrong: [renders.errorsGoneWrong],
	catchAll: [redirects.notFound],
};

const renders = require('./renders');
const redirects = require('./redirects');
const validate = require('../middleware/validation/validate');
const queryUser = require('../middleware/queryHandlers/user');
const queryRecord = require('../middleware/queryHandlers/record');
const queryAnimalData = require('../middleware/queryHandlers/animalData');
const passwordManager = require('../middleware/passwordManager');
const assignToken = require('../middleware/assignToken');
const findHome = require('../middleware/findHome');
const handleUpload = require('../middleware/handleUpload');
const bulkUpsert = require('../middleware/bulkUpsert');
const reauthenticate = require('../middleware/authorisation/reauthenticate');
const generateReportFile = require('../middleware/generateReportFile');
const updateAnimalData = require('../middleware/updateAnimalData');

module.exports = {
    index: [
        validate,
        queryUser.findToAuthenticate,
        passwordManager.comparePassword,
        assignToken.sessionToken,
        findHome
    ],
    adminNewCase: [validate, queryRecord.create, redirects.adminExistingCase],
    adminExistingCases: [
        queryRecord.count,
        queryUser.findAll,
        queryRecord.findByQuery,
        renders.adminExistingCases
    ],
    adminExistingCasesSaved: [
        queryUser.findAll,
        queryRecord.findAllSaved,
        renders.adminExistingCasesSaved
    ],
    adminExistingCasesMonthly: [
        queryUser.findAll,
        queryRecord.findAllMonthly,
        renders.adminExistingCasesMonthly
    ],
    adminSearch: [
        queryUser.findAll,
        queryRecord.findByQuery,
        renders.adminSearch
    ],
    adminCreateUser: [
        validate,
        queryUser.findByEmail,
        passwordManager.hashPassword,
        queryUser.create,
        renders.adminCreateUser
    ],
    adminUpdateMyDetails: [
        validate,
        queryUser.findById,
        passwordManager.comparePasswordToUpdate,
        passwordManager.hashPassword,
        queryUser.findToUpdate,
        assignToken.sessionToken,
        reauthenticate,
        findHome
    ],
    adminBulkUpload: [handleUpload, bulkUpsert, renders.adminBulkUpload],
    adminExistingCase: [
        queryRecord.findById,
        validate,
        queryRecord.updateById,
        renders.adminExistingCase
    ],
    adminGetUniqueValues: [queryAnimalData.getUniqueValues],
    adminGetAnimalDataValue: [queryAnimalData.findValue],
    adminGenerateReports: [
        validate,
        queryRecord.findReportData,
        generateReportFile,
        renders.adminGenerateReports
    ],
    adminUpdateAnimalData: [handleUpload, updateAnimalData, renders.adminUpdateAnimalData]
};

const errorMessages = require('../messages/errorMessages');

module.exports = {
    renderViewMethod: 'adminGenerateReports',
    validators: {
        reportType: [
            {
                validator: 'exists',
                message: `${errorMessages.exists} a report to generate`
            },
            {
                validator: 'isIn',
                message: errorMessages.isIn,
                options: [['time', 'species', 'iucn', 'outcome', 'displacement']],
                isConditional: true,
                conditions: [{
                    field: 'reportType',
                    validator: 'exists'
                }]
            }
        ]
    }
};

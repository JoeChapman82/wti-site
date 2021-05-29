const errorMessages = require('../messages/errorMessages');

module.exports = {
    renderViewMethod: 'adminExistingCase',
    validators: {
        placeOfRescue: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        groupName: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        identityName: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        class: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        zoneName: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        remarks: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 1024 characters',
                options: [{max: 1024}]
            }
        ],
        facility: [
            {
                validator: 'isIn',
                message: errorMessages.isIn,
                options: [['caMobile', 'cbrc', 'cwrc', 'nbCenter', 'nbMobile']],
                isConditional: true,
                conditions: [{
                    field: 'facility',
                    validator: 'exists'
                }]
            }
        ],
        dateOfAdmission: [
            {
                validator: 'isDateString',
                message: errorMessages.isValidDate,
                options: []
            }
        ],
        housing: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        proposedResolution: [
            {
                validator: 'isIn',
                message: errorMessages.isIn,
                options: [['release', 'admit', 'transfer', 'euthanize', 'other']],
                isConditional: true,
                conditions: [{
                    field: 'proposedResolution',
                    validator: 'exists'
                }]
            }
        ],
        ageYears: [
            {
                validator: 'isInt',
                message: errorMessages.isInt,
                isConditional: true,
                conditions: [{
                    field: 'ageYears',
                    validator: 'notEmpty'
                }]
            }
        ],
        ageMonths: [
            {
                validator: 'isInt',
                message: errorMessages.isInt,
                isConditional: true,
                conditions: [{
                    field: 'ageMonths',
                    validator: 'notEmpty'
                }]
            }
        ],
        stage: [
            {
                validator: 'isIn',
                message: errorMessages.isIn,
                options: [['Infant', 'Neonate', 'Subadult', 'Adult']],
                isConditional: true,
                conditions: [{
                    field: 'stage',
                    validator: 'exists'
                }]
            }
        ],
        weightKg: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        weightG: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        lengthSnoutVent: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        lengthTailShoulder: [
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        dateOfExamination: [
            {
                validator: 'isDateString',
                message: errorMessages.isValidDate,
                options: []
            }
        ],
        modeOfRestraint: [
            {
                validator: 'isIn',
                message: errorMessages.isIn,
                options: [['physical', 'chemical', 'none', 'both']],
                isConditional: true,
                conditions: [{
                    field: 'modeOfRestraint',
                    validator: 'exists'
                }]
            }
        ]
    }
};

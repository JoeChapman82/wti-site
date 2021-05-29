const errorMessages = require('../messages/errorMessages');

module.exports = {
    renderViewMethod: 'adminNewCase',
    validators: {
        caseNumber: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' case number'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        placeOfRescue: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' a place of rescue'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        groupName: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' a group'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        identityName: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' an identity'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        class: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' a class'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ],
        zoneName: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' zone name'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
            }
        ]
    }
};

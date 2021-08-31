const errorMessages = require('../messages/errorMessages');

module.exports = {
    renderViewMethod: 'adminCreateUser',
    validators: {
        username: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' a name'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{ max: 100 }]
            }
        ],
        email: [
            {
                validator: 'isEmail',
                message: errorMessages.isEmail
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{ max: 100 }]
            }
        ],
        role: [
            {
                validator: 'isIn',
                message: errorMessages.isIn,
                options: [['Admin', 'Editor', 'Viewer']]
            }
        ]
    }
};

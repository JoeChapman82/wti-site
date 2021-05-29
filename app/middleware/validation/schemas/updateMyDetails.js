const errorMessages = require('../messages/errorMessages');

module.exports = {
    renderViewMethod: 'adminUpdateMyDetails',
    validators: {
        username: [
            {
                validator: 'notEmpty',
                message: errorMessages.notEmpty + ' a name'
            },
            {
                validator: 'isOfMaxLength',
                message: errorMessages.isOfMaxLength + ' 100 characters',
                options: [{max: 100}]
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
                options: [{max: 100}]
            }
        ],
        password: [
            {
                validator: 'isOfMinLength',
                message: errorMessages.isOfMinLength + ' 8 characters',
                options: [{min: 8}]
            }
        ],
        newPassword: [
            {
                validator: 'isOfMinLength',
                message: errorMessages.isOfMinLength + ' 8 characters',
                options: [{min: 8}]
            },
            {
                validator: 'isIdentical',
                comparitor: 'confirmPassword',
                message: errorMessages.isIdentical + ' your password confirmation',
                options: [[]]
            },
            {
                validator: 'isNotIdentical',
                comparitor: 'password',
                message: errorMessages.isNotIdentical + ' your previous password',
                options: [[]]
            }
        ],
        confirmPassword: [
            {
                validator: 'isOfMinLength',
                message: errorMessages.isOfMinLength + ' 8 characters',
                options: [{min: 8}]
            },
            {
                validator: 'isIdentical',
                comparitor: 'newPassword',
                message: errorMessages.isIdentical + ' your new password',
                options: [[]]
            }
        ]
    }
};

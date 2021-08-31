const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Editor', 'Viewer'],
        default: 'Admin'
    },
    hasDefaultPassword: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;

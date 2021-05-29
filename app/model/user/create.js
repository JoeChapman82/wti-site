const User = require('./user');

module.exports = (email, username, password, role) => {
    const user = new User({ email, username, password, role });
    return user.save();
};

const User = require('./user');

module.exports = {
    all: () => User.find({}, 'username role email'),
    count: (query) => User.countDocuments(query),
    dump: () => User.find({}),
    byId: (id) => User.findById(id),
    byUsername: (username) => User.findOne({ username }, 'username'),
    byEmail: (email) => User.findOne({ email }),
    toAuthenticate: (email) => User.findOne({ email })
};

const findUsers = require('./user/read');
const createUser = require('./user/create');

module.exports = () => {
    findUsers.all()
        .then(response => {
            if(response.length === 0) {
                createUser(process.env.INITIAL_EMAIL, process.env.INITIAL_USERNAME, process.env.INITIAL_PASSWORD, 'Admin')
                    .then((response) => {
                        console.log('Initial user created');
                        return null;
                    })
                    .catch((error) => {
                        console.log(error);
                        return null;
                    });
            } else {
                console.log('Existing users found in db');
            }
        })
        .catch(error => {
            console.log(error);
            return null;
        });




};

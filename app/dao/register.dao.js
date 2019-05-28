const User = require("../model/users.model");

function saveUser( user ) {
    let newUser = new User(user);
    // newUser = user;
    return newUser.save();
}

module.exports = {
    saveUser
};
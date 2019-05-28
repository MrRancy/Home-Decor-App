const registerDao = require("../dao/register.dao");
const loginDao = require("../dao/login.dao");
const bcrypt = require("bcryptjs");

function registerUser(newUser) {
  return new Promise((resolve, reject) => {
   loginDao
    .getUser(newUser.email)
    .then(user => {
      if (user) {
        reject({
          code: 400,
          status: false,
          body: null,
          message: "Email Already Exists"
        });
      }
      const response = null;
     
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (salt, hash) => {
          // If Error throws the error
          if (err) reject({
            code: 400,
            status: false,
            body: err,
            message: "Email Already Exists"
          });
          // Else saves the hash in the password feild
          newUser.password = hash;
          // Saving in the database
          console.log("newUser", newUser);
           registerDao
            .saveUser(newUser)
            .then(user => resolve({
              code: 200,
              status: true,
              body: user,
              message: "Registered Successfully"
            }))
            .catch(err => reject({
              code: 404,
              status: false,
              body: err,
              message: err.message
            }));
        });
      });
    })
    .catch(err => {
      reject({
        code: 404,
        status: false,
        body: err.message,
        message: err
      });
    });
  });
}

module.exports = {
  registerUser
};

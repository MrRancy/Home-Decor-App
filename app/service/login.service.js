const loginDao = require("../dao/login.dao");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.config");
const bcrypt = require("bcryptjs");
const validator = require("validator");

function loginUser(email, password) {
  return new Promise((resolve, reject) => {

    if (!validator.isEmail(email)) {
      reject({
        code: 404,
        status: false,
        body: null,
        message: "Invalid Email"
      });
    }

    loginDao
      .getUser(email)
      .then(usr => {
        // console.log(output);
        if (!usr)
          reject({
            code: 404,
            status: false,
            body: null,
            message: "Email is not Registered"
          });

        bcrypt.compare(password, usr.password).then(isMatch => {
          // Comparing the results
          if (isMatch) {
            const payload = {
              id: usr.id,
              name: usr.name
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                console.log("JWT Generated");
                // Saving Token in database
                loginDao.saveToken(usr.id, token);
                resolve({
                  code: 200,
                  status: true,
                  body: token,
                  message: "Logged in Successfully"
                });
              }
            );
          } else {
            reject({
              code: 400,
              status: false,
              body: null,
              message: "Incorrect Password"
            });
          }
        });
      })
      .catch(err => {
        reject({
          code: 400,
          status: false,
          body: null,
          message: err
        });
      });
  });
}

function logout(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject({
        code: 400,
        status: false,
        body: null,
        message: "ID cannot be null"
      });
    }

    loginDao.getUserOnId(id).then(data => {
      if (!data) {
        reject({
          code: 404,
          status: false,
          body: null,
          message: "No User found with this ID"
        });
      } else {
        loginDao.logoutUser(id).then(data => {
          resolve({
            code: 200,
            status: false,
            body: data,
            message: "Logged out Successfully"
          });
        });
      }
    });
  });
}

module.exports = {
  loginUser,
  logout
};

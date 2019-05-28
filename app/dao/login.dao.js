const User = require("../model/users.model");

function getUser(email) {
  return User.findOne({ email });
}

function getUserOnId(id) {
  return User.findById(id);
}

function saveToken(id, token) {
  console.log(id);
  console.log(token);
  return User.findOneAndUpdate({ _id: id }, { token: token })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function logoutUser(id) {
  console.log(id);
  return User.findByIdAndUpdate({ _id: id }, { token: null });
}

module.exports = {
  getUser,
  saveToken,
  logoutUser,
  getUserOnId
};

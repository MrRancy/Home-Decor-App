const loginService = require("../service/login.service");

//! (http://localhost:1000/api/user/login)
function userLogin(req, res) {
  console.log("INFO : Login API");
  const email = req.body.email;
  const password = req.body.password;

  loginService
    .loginUser(email, password)
    .then(output => {
      res.status(output.code).json({
        status: output.status,
        body: output.body,
        message: output.message
      });
    })
    .catch(err => {
      res.status(err.code).json({
        status: err.status,
        body: err.body,
        message: err.message
      });
    });
}

//! (http://localhost:1000/api/user/logout/:id)
function userLogout(req, res) {
  console.log("INFO : Logout API");

  loginService
    .logout(req.params.id)
    .then(output => {
      res.status(output.code).json({
        status: output.status,
        body: output.body,
        message: output.message
      });
    })
    .catch(err => {
      res.status(err.code).json({
        status: err.status,
        body: err.body,
        message: err.message
      });
    });
}

//! Exporting Modules
module.exports = {
  userLogin,
  userLogout
};

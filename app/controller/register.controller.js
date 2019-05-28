const registerService = require("../service/register.service");
const User = require("../model/users.model");

//! (http://localhost:1000/api/user/register)
const userRegister = async (req, res) => {

  console.log("INFO : Register API")

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    role: req.body.role
  });

  registerService.registerUser(newUser).then(output=>{
    res.status(output.code).json({
        status: output.status,
        body: output.body,
        message: output.message
      });
  }).catch(err=> {
    res.status(err.code).json(err);
  })
}

//! Exporting Modules
module.exports = {
  userRegister
};

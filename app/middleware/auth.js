const jwt = require("jsonwebtoken");
const keys = require("../config/keys.config");
const userDao = require("../dao/login.dao");

function adminAuthorization(req, res, next) {
  var token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, keys.secretOrKey, function(err, decode) {
      if (err) {
        return res.status(404).json({
          status: false,
          body: null,
          message: "Failed to Authenticate Token/Invalid Token"
        });
      } else {
        console.log(decode);
        req.decode = decode;
        userDao.getUserOnId(decode.id).then(data => {
          if(!data){
            return res.json({
              status : false,
              messagae : "No User found"
            })
          }
          console.log("USER DATA IN AUTH : "+data);
          if(data.role == 0) {
            console.log("Validated Successfully. Admin access Provided");
            next();
          }
          else {
            console.log("Validation Failed. Not an Admin");
            return res.status(403).json ({
              status : false,
              body : null,
              messagae : "Access Revoked"
            })
          }
        })
      }
    });
  } else {
      return res.status(403).json({
          status : false,
          message : "Please provide a token"
      })
  }
}

module.exports = {
  adminAuthorization
}
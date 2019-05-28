const cartDao = require("../dao/cart.dao");

function insertItems(items) {
  return new Promise((resolve, reject) => {
    if (!items) {
      reject({
        code: 404,
        status: false,
        body: null,
        message: "Cart is Empty"
      });
    }
    cartDao
      .save(items)
      .then(data => {
        resolve({
          code: 200,
          status: true,
          body: data,
          message: "Purchase Successful"
        });
      })
      .catch(err => {
        reject({
          code: 400,
          status: false,
          body: err,
          message: "Failed to Purchase items"
        });
      });
  });
}

function getHistory(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject({
        code: 404,
        status: false,
        body: null,
        message: "ID cannot be null"
      });
    }

    console.log("ID : " + id);
    cartDao
      .getItems(id)
      .then(data => {
        console.log("DATA : " + data); // Printing Data
        if (!data) {
          console.log("In IF Block"); // Flag for IF Block
          reject({
            code: 404,
            status: false,
            body: null,
            message: "User with Id : " + id + " has no Purchase history"
          });
        } else{
          console.log("In ELSE Block"); // Flag for Else Block
          resolve ({
            code: 200,
            status: true,
            body: data,
            message: "Total Items purchased are " + data.length
          });
        }
      })
      .catch(err => {
        reject({
          code: 400,
          status: false,
          body: err,
          message: "Error Getting history"
        });
      });
  });
}

module.exports = {
  insertItems,
  getHistory
};

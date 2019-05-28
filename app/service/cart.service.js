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
        resolve({
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
    cartDao
      .getItems(id)
      .then(data => {
        if (!data) {
          reject({
            code: 400,
            status: false,
            body: null,
            message: "User with Id : " + id + " has no history"
          });
        }
        resolve({
          code: 200,
          status: true,
          body: data,
          message: "Total Items purchased are " + data.length()
        });
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

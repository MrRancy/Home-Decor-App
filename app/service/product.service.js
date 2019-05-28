const productDao = require("../dao/product.dao");
const Fuse = require("fuse.js");

function getAll() {
  return new Promise((resolve, reject) => {
    productDao.getAllProducts().then(data => {
      if (!data) {
        reject({
          code: 400,
          status: true,
          body: null,
          message: "No Products Found"
        });
      }
      resolve({
        code: 200,
        status: true,
        body: data,
        message: "Total Product found : " + data.length
      });
    });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    // console.log("At Service ID : " + id);
    if (!id) {
      reject({
        code: 404,
        status: false,
        body: null,
        message: "ID cannot be null"
      });
    } else {
      productDao.getProductById(id).then(product => {
        if (!product) {
          reject({
            code: 400,
            status: false,
            body: null,
            message: "No Product Found for ID : " + id
          });
        }

        resolve({
          code: 200,
          status: true,
          body: product,
          message: "Product found for ID : " + id
        });
      });
    }
  });
}

function deleteById(id) {
  return new Promise((resolve, reject) => {
    // console.log("At Service Id : " + id);
    if (!id) {
      reject({
        code: 404,
        status: false,
        body: null,
        message: "ID cannot be null"
      });
    } else {
      // console.log("**********FLAG***********");
      productDao.deleteProductById(id).then(product => {
        if (!product) {
          reject({
            code: 404,
            status: false,
            body: null,
            message: "Product with ID : " + id + " does not exist"
          });
        }
        resolve({
          code: 200,
          status: true,
          body: product,
          message: "Product Deleted for ID : " + id
        });
      });
    }
  });
}

function updateById(newProduct) {
  console.log("Service Update ID");
  return new Promise((resolve, reject) => {
    // if the product is empty then reject in the initial itself
    if (!newProduct.title) {
      console.log("Inside Null Validator");
      reject({
        code: 404,
        status: false,
        body: null,
        message: "Product Title cannot be null"
      });
    }
    productDao
      .getProductByTitle(newProduct.title) // Check whether product exist or not
      .then(response => {
        if (!response) {
          // If product does not exist reject the product
          reject({
            code: 200,
            status: true,
            body: null,
            message: "Product Not found with Title : " + newProduct.title
          });
        } else {
          productDao.updateProductById(newProduct).then(reponse => {
            // Else update the product with the new Details
            resolve({
              code: 200,
              status: true,
              body: reponse,
              message: "Product Updated"
            });
          });
        }
      })
      .catch(err => {
        // Throw err if any one of these doesnt match
        reject({
          code: 200,
          status: true,
          body: err,
          message: "Error Updating the Product"
        });
      });
  });
}

function save(product) {
  return new Promise((resolve, reject) => {
    if (!product) {
      reject({
        code: 404,
        status: false,
        body: null,
        message: "Product cannot be null"
      });
    } else {
      productDao.saveProduct(product).then(response => {
        resolve({
          code: 200,
          sstatus: true,
          body: response,
          message: "Product Saved"
        });
      });
    }
  });
}

function sortProductsOnCost(sort) {
  return new Promise((resolve, reject) => {
    productDao.getAllProducts().then(data => {
      if (!data) {
        reject({
          code: 400,
          status: true,
          body: null,
          message: "No Products Found"
        });
      } else if (data.length == 1) {
        resolve({
          code: 200,
          status: true,
          body: null,
          message: "Sort cannot be done on a single product"
        });
      } else if (sort == 1) {
        data.sort(function(low, high) {
          return low.cost - high.cost;
        });
      } else {
        data.sort(function(low, high) {
          return high.cost - low.cost;
        });
      }
      resolve({
        code: 400,
        status: true,
        body: data,
        message:
          sort == 1
            ? "Sorted based on Cost in Ascending Order"
            : "Sorted based on Cost in Descending Order"
      });
    });
  });
}

function sortProductsOnTitle(sort) {
  return new Promise((resolve, reject) => {
    productDao.getAllProducts().then(data => {
      if (!data) {
        reject({
          code: 400,
          status: true,
          body: null,
          message: "No Products Found"
        });
      } else if (data.length == 1) {
        resolve({
          code: 200,
          status: true,
          body: null,
          message: "Sort cannot be done on a single product"
        });
      } else if (sort == 1) {
        data.sort(function(low, high) {
          return low.title.localeCompare(high.title);
        });
      } else {
        data.sort(function(low, high) {
          return high.title.localeCompare(low.title);
        });
      }
      resolve({
        code: 400,
        status: true,
        body: data,
        message:
          sort == 1 ? "Sorted in Ascending Order" : "Sorted in Descending Order"
      });
    });
  });
}

function searchByProductCategory(category) {
  return new Promise((resolve, reject) => {
    if (!category) {
      reject({
        code: 404,
        status: true,
        body: null,
        message: "Category cannot be null"
      });
    } else {
      productDao
        .searchBasedOnCategory(category)
        .then(data => {
          if (!data) {
            resolve({
              code: 200,
              status: true,
              body: null,
              message: "No Items found in Category : " + category
            });
          }

          resolve({
            code: 200,
            status: true,
            body: data,
            message:
              "Total products fetched under " +
              category +
              " are : " +
              data.length
          });
        })
        .catch(err => {
          reject({
            code: 404,
            status: true,
            body: err,
            message: "Error Fetching Data based on Category : " + category
          });
        });
    }
  });
}

function searchByTitle(title) {
  return new Promise((resolve, reject) => {
    var options = {
      shouldSort: true,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ["title"]
    };

    if (!title) {
      reject({
        code: 404,
        status: true,
        body: null,
        message: "Title cannot be null"
      });
    }

    productDao.getAllProducts().then(list => {
      var fuse = new Fuse(list, options);
      var result = fuse.search(title);

      if (!result) {
        reject({
          code: 404,
          status: true,
          body: null,
          message: "No Result Found"
        });
      } else {
        resolve({
          code: 200,
          status: true,
          body: result,
          message: "Data Fetched"
        });
      }
    });
  });
}

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  save,
  sortProductsOnCost,
  sortProductsOnTitle,
  searchByProductCategory,
  searchByTitle
};

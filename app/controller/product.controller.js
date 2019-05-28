const productService = require("../service/product.service");
const Product = require("../model/product.model");

//! (http://localhost:1000/api/products/get/all)
function getProducts(req, res) {
  console.log("INFO : Get All Products API");

  productService
    .getAll()
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

//! (http://localhost:1000/api/products/get)
function getProductById(req, res) {
  console.log("INFO : Get Product By ID API");
  const id = req.query.id;
  console.log("Product ID : " + id);
  productService
    .getById(id)
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

//! (http://localhost:1000/api/products/delete/id)
function deleteProductById(req, res) {
  console.log("INFO : Delete Product By ID API");
  const id = req.params.id;
  //   console.log("Delete ID : " + id);

  productService
    .deleteById(id)
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

//! (http://localhost:1000/api/products/update)
function updateProductById(req, res) {
  console.log("INFO : Update Product By ID API");

  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    cost: req.body.cost,
    category: req.body.category
  });

  productService
    .updateById(newProduct)
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

//! (http://localhost:1000/api/products/save)
function saveProduct(req, res) {
  console.log("INFO : Save Product API");
  const id = req.body.id;

  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    cost: req.body.cost,
    category: req.body.category
  });

  productService
    .save(newProduct)
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

//! (http://localhost:1000/api/get/products/sort/cost/:number)
function sortBasedOnCost(req, res) {
  console.log("INFO : Sort All Products Based on Cost API");

  productService
    .sortProductsOnCost(req.params.number)
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

//! (http://localhost:1000/api/get/products/sort/title/:title)
function sortBasedOnTitle(req, res) {
  console.log("INFO : Sort All Products Based on Title API");

  productService
    .sortProductsOnTitle(req.params.title)
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

//! (http://localhost:1000/api/get/products/:category)
function searchBasedOnCategory(req, res) {
    console.log("INFO : Sort All Products Based on Title API");
  
    productService
      .searchByProductCategory(req.params.category)
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

module.exports = {
  getProducts,
  getProductById,
  saveProduct,
  updateProductById,
  deleteProductById,
  sortBasedOnCost,
  sortBasedOnTitle,
  searchBasedOnCategory
};
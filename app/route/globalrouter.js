// Adding the Required Dependencies
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//! Login Controller
const login = require("../controller/login.controller");

//! Register Controller
const register = require("../controller/register.controller");

//! Product Controller
const product = require("../controller/product.controller");

//! Cart Controller
const cart = require("../controller/cart.controller");

//? Register Routes (1)
router.post("/user/register", register.userRegister); 

//? Login Routes (2)
router.post("/user/login", login.userLogin);
router.put("/user/logout/:id", login.userLogout);

//? Product Routes (9)
router.get("/products/get/all", product.getProducts);
router.get("/products/get", product.getProductById);
router.delete("/products/delete/:id", auth.adminAuthorization, product.deleteProductById); // Admin Auth Enabled
router.put("/products/update", auth.adminAuthorization, product.updateProductById); // Admin Auth Enabled
router.post("/products/save", auth.adminAuthorization, product.saveProduct); // Admin Auth Enabled
router.get("/products/get/sort/cost/:number", product.sortBasedOnCost);
router.get("/products/get/sort/title/:title", product.sortBasedOnTitle);
router.get("/get/products/:category", product.searchBasedOnCategory);
router.get("/get/products/search/:search", product.searchBasedOnTitle);

//? Cart Routes (2)
router.post("/cart/products/buy", cart.buyThings);
router.get("/cart/product/history/:id", cart.getHistoryByUser);

//! Exporting Modules
module.exports = {
  globalRoutes: router
};
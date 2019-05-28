const Product = require("../model/product.model");

function getAllProducts() {
  return Product.find();
}

function getProductById(id) {
  return Product.findById({ _id: id });
}

function getProductByTitle(title) {
  return Product.findOne({ title: title });
}

function saveProduct(product) {
  const newProduct = new Product(product);
  // newProduct = product;
  return newProduct.save();
}

function updateProductById(product) {
  const newProduct = new Product(product);
  console.log("Update Product : " + newProduct); // Getting till here
  // newProduct = product;
  return Product.findOneAndUpdate(
    { title: newProduct.title },
    {
      description: newProduct.description,
      cost: newProduct.cost,
      category: newProduct.category
    }
  );
}

function deleteProductById(id) {
  // console.log("Dao Layer Product Id : "+id);
  return Product.findByIdAndDelete(id);
}

function searchBasedOnCategory(category) {
  return Product.find({category});

}

module.exports = {
  getAllProducts,
  getProductById,
  saveProduct,
  updateProductById,
  deleteProductById,
  getProductByTitle,
  searchBasedOnCategory
};

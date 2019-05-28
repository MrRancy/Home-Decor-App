const Cart = require("../model/cart.model");

function save(items) {
    return Cart.collection.insert(items);
}

function getItems(id) {
    return Cart.find({userId : id});
}

module.exports = {
    save,
    getItems
}
const Cart = require("../model/cart.model");

function save(items) {
    return Cart.collection.insert(items);
}

function getItems(id) {
    return Cart.findOne({userId : id})
}

module.exports = {
    save,
    getItems
}
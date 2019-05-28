const cartService = require("../service/cart.service");

function buyThings(req, res) {
  const items = req.body;

  cartService
    .insertItems(items)
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

function getHistoryByUser(req, res) {
  const userId = req.params.id;

  cartService
    .getHistory(userId)
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
  buyThings,
  getHistoryByUser
};

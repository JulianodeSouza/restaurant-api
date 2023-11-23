const router = require("express").Router();
const Utils = require("../../utils");
const ProductService = require("../../controllers/products");

router.get("/", async function (req, res) {
  try {
    const params = req.query.search || "";
    const serviceProduct = new ProductService();

    const products = await serviceProduct.listAllProducts(params);

    res.json(products);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

module.exports = router;

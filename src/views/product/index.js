const router = require("express").Router();
const Utils = require("../../utils");
const ProductService = require("../../controllers/products");

router.get("/:idRestaurant", async function (req, res) {
  try {
    const idRestaurant = req.params.idRestaurant;
    const params = req.query.search || "";
    const serviceProduct = new ProductService();

    const products = await serviceProduct.listAllProducts(params, idRestaurant);
    res.json(products);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

router.post("/", async function (req, res) {
  try {
    const newProduct = req.body;

    if (req.files.length > 0) {
      newProduct.url_image_product = req.files[0].filename;
    }

    const serviceProduct = new ProductService();
    const products = await serviceProduct.saveProduct(newProduct);

    res.json(products);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

router.delete("/:id/restaurant/:idRestaurant", async function (req, res) {
  try {
    const id_product = req.params.id;
    const id_restaurant = req.params.idRestaurant;

    const serviceProduct = new ProductService();
    const result = await serviceProduct.removeProduct(
      id_product,
      id_restaurant
    );

    res.json(result);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

module.exports = router;

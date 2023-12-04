const router = require("express").Router();
const RestaurantService = require("../../controllers/restaurant");
const Utils = require("../../utils");

router.get("/", async function (req, res) {
  try {
    const serviceRestaurant = new RestaurantService();
    const restaurants = await serviceRestaurant.listAllRestaurants();

    res.json(restaurants);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

router.get("/id/:id", async function (req, res) {
  try {
    const idRestaurant = req.params.id;

    const serviceRestaurant = new RestaurantService();
    const restaurant = await serviceRestaurant.listRestaurant(idRestaurant);

    res.json(restaurant);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

router.post("/", async function (req, res) {
  try {
    const serviceRestaurant = new RestaurantService();
    const data = req.body;

    if (req.files.length > 0) {
      data.url_image_restaurant = req.files[0].filename;
    }

    const result = await serviceRestaurant.register(data);

    res.json(result);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

router.put("/:id", async function (req, res) {
  try {
    const serviceRestaurant = new RestaurantService();
    const id_restaurant = Number(req.params.id);
    const restaurant = req.body;

    const result = await serviceRestaurant.update(id_restaurant, restaurant);
    res.json(result);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const idRestaurant = req.params.id;
    const serviceRestaurant = new RestaurantService();

    const result = await serviceRestaurant.remove(idRestaurant);

    res.json(result);
  } catch (e) {
    Utils.trataExcecao(res, e);
  }
});

module.exports = router;

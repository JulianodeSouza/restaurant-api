const router = require("express").Router();
const RestaurantService = require("../../controllers/restaurant");

router.get("/", async function (req, res) {
  try {
    const serviceRestaurant = new RestaurantService();
    const restaurant = await serviceRestaurant.listAllRestaurants();

    res.json({ restaurant });
  } catch (e) {
    console.log(e);
    res.json({ error: e || e.message });
  }
});

router.post("/", async function (req, res) {
  try {
    const serviceRestaurant = new RestaurantService();
    const data = req.body;

    const result = await serviceRestaurant.register(data);

    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message || e });
  }
});

router.put("/id/:id", async function (req, res) {
  try {
    const serviceRestaurant = new RestaurantService();
    const id_restaurant = req.params.id;
    const restaurant = req.body;

    const result = await serviceRestaurant.update(id_restaurant, restaurant);
    res.json({ result });
  } catch (e) {
    console.log(e);
    res.json({ error: e || e.message });
  }
});
module.exports = router;

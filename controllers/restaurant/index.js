const db = require("../../db/conn");
const { QueryTypes } = require("sequelize");

class Restaurant {
  constructor() {}

  async listAllRestaurants() {
    const sql = "select * from restaurant";

    const restaurants = await db.query(sql, {
      type: QueryTypes.SELECT,
    });

    if (restaurants.length === 0) {
      throw new Error("Nenhum restaurante cadastrado");
    }

    return restaurants;
  }

  async register(restaurant) {
    const errors = await this.validateRegister(restaurant);

    if (errors.length > 0) {
      return {
        errors,
      };
    }

    const sql =
      "insert into restaurant (url_image_restaurant, restaurant_name, street, neighborhood, number, city, zipcode) values (:url_image_restaurant, :restaurant_name, :street, :neighborhood, :number, :city, :zipcode)";

    await db.query(sql, {
      replacements: {
        url_image_restaurant: restaurant.url_image_restaurant || "",
        restaurant_name: restaurant.restaurant_name,
        street: restaurant.street,
        neighborhood: restaurant.neighborhood,
        number: restaurant.number,
        city: restaurant.city,
        zipcode: restaurant.zipcode,
      },
      type: QueryTypes.INSERT,
    });

    return { success: true };
  }

  async update(id_restaurant, restaurantObj) {
    const restaurant = db.query(
      "select * from restaurant where id_restaurant = :idRestaurant",
      {
        replacements: {
          idRestaurant: id_restaurant,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (!restaurant) {
      throw new Error("Restaurante não encontrado.");
    }

    const sql = `update restaurant set
    url_image_restaurant = :urlImageRestaurant, restaurant_name = :restaurantName,
    street = :street, neighborhood = :neighborhood, number = :number, city = :city, zipcode = :zipcode where id_restaurant = :idRestaurant `;

    const result = await db.query(sql, {
      replacements: {
        id_restaurant: id_restaurant,
        urlImageRestaurant: restaurantObj.url_image_restaurant,
        restaurantName: restaurantObj.restaurant_name,
        street: restaurantObj.street,
        neighborhood: restaurantObj.neighborhood,
        number: restaurantObj.number,
        city: restaurantObj.city,
        zipcode: restaurantObj.zipcode,
      },
    });

    return result;
  }

  async validateRegister(data) {
    let errors = [];

    if (!data.restaurant_name) {
      errors.push({
        field: "restaurant_name",
        message: "O nome do restaurante é obrigatório",
      });
    }

    if (!data.street) {
      errors.push({
        field: "street",
        message: "O endereço do restaurante é obrigatório",
      });
    }

    if (!data.neighborhood) {
      errors.push({
        field: "neighborhood",
        message: "O bairro do restaurante é obrigatório",
      });
    }

    if (!data.city) {
      errors.push({
        field: "city",
        message: "A cidade do restaurante é obrigatória",
      });
    }

    if (!data.number) {
      errors.push({
        field: "number",
        message: "O numero do endereço é obrigatório",
      });
    }

    return errors;
  }
}

module.exports = Restaurant;

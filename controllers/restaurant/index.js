const db = require("../../db/conn");
const { QueryTypes } = require("sequelize");
const RequestErrors = require("../errors/Request");
class Restaurant {
  constructor() {}

  async listAllRestaurants() {
    const sql = "select * from restaurants";

    const restaurants = await db.query(sql, {
      type: QueryTypes.SELECT,
    });

    if (restaurants.length === 0) {
      throw new Error("Nenhum restaurante cadastrado");
    }

    return restaurants;
  }

  async listRestaurant(id_restaurant) {
    const sql = `select * from restaurants r where r.id_restaurant = :idRestaurant limit 1`;

    const restaurant = await db.query(sql, {
      replacements: {
        idRestaurant: id_restaurant,
      },
      type: QueryTypes.SELECT,
    });

    if (restaurant.length === 0) {
      throw new Error("Estabelecimento não encontrado.");
    }

    return restaurant;
  }

  async register(restaurant) {
    await this.validateRegister(restaurant);

    const sql = `insert into restaurants (url_image_restaurant, restaurant_name, street, neighborhood, number, city, zipcode) 
    values (:url_image_restaurant, :restaurant_name, :street, :neighborhood, :number, :city, :zipcode)`;

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
    const restaurant = await db.query(
      "select * from restaurants where id_restaurant = :idRestaurant",
      {
        replacements: {
          idRestaurant: id_restaurant,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (restaurant.length === 0) {
      throw new Error("Estabelecimento não encontrado.");
    }

    const sql = `update restaurants set
    url_image_restaurant = :urlImageRestaurant, restaurant_name = :restaurantName,
    street = :street, neighborhood = :neighborhood, number = :number, city = :city, zipcode = :zipcode where id_restaurant = :idRestaurant `;

    await db.query(sql, {
      replacements: {
        idRestaurant: id_restaurant,
        urlImageRestaurant: restaurantObj.url_image_restaurant || "",
        restaurantName: restaurantObj.restaurant_name,
        street: restaurantObj.street,
        neighborhood: restaurantObj.neighborhood,
        number: restaurantObj.number,
        city: restaurantObj.city,
        zipcode: restaurantObj.zipcode,
      },
      type: QueryTypes.UPDATE,
    });

    return { success: true };
  }

  async remove(id_restaurant) {
    const sql = `delete from restaurants r where  r.id_restaurant = :idRestaurant`;

    await db.query(sql, {
      replacements: {
        idRestaurant: id_restaurant,
      },
      type: QueryTypes.DELETE,
    });

    return { success: true };
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

    if (data.zipcode) {
      const zipCodeNumbersOnly = data.zipcode.replace(/\D/g, "");

      if (zipCodeNumbersOnly.length !== 8) {
        errors.push({
          field: "zipcode",
          message: "CEP inserido é inválido",
        });
      }
    }

    if (errors.length > 0) {
      throw new RequestErrors(
        "Não foi possível cadastrar o restaurante pois há erros no preenchimento dos campos",
        errors
      );
    }
  }
}

module.exports = Restaurant;

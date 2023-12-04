const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Restaurant = db.define(
  "restaurant",
  {
    id_restaurant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    url_image_restaurant: {
      type: DataTypes.STRING,
    },
    restaurant_name: {
      type: DataTypes.STRING,
      require: true,
    },
    street: {
      type: DataTypes.STRING,
      require: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      require: true,
    },
    number: {
      type: DataTypes.STRING,
      require: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      require: true,
    },
    city: {
      type: DataTypes.STRING,
      require: true,
    },
  },
  {
    timestamps: false,
  }
);

Restaurant.associate = (models) => {
  Restaurant.hasMany(models.product);
};

module.exports = Restaurant;

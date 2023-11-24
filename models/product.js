const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Products = db.define(
  "product",
  {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_restaurant: {
      type: DataTypes.INTEGER,
      require: true,
    },
    url_image_product: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    product_name: {
      type: DataTypes.STRING,
      require: true,
      defaultValue: null,
    },
    description: {
      type: DataTypes.STRING,
      require: true,
      defaultValue: null,
    },
    price: {
      type: DataTypes.FLOAT,
      require: true,
      defaultValue: null,
    },
    category: {
      type: DataTypes.STRING,
      require: true,
      defaultValue: null,
    },
    promotion: {
      require: true,
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    description_promotion: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    start_promotion: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    end_promotion: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    price_promotion: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);

Products.associate = (models) => {
  Products.belongsTo(models.Restaurant, {
    foreignKey: "id_restaurant",
    as: "restaurant",
  });
};

module.exports = Products;

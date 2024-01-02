const db = require("../../db/conn");
const { QueryTypes } = require("sequelize");
const RequestErrors = require("../errors/Request");
const moment = require("moment/moment");

class Product {
  async listAllProducts(params, idRestaurant) {
    const sql = `select * from products p
    where p.id_restaurant = :id_restaurant and (p.product_name like :search or p.category like :search)`;

    const products = await db.query(sql, {
      replacements: {
        id_restaurant: idRestaurant,
        search: "%" + params + "%",
      },
      type: QueryTypes.SELECT,
    });

    let productsConverted = [];
    for (const product of products) {
      productsConverted.push(this.convertProduct(product));
    }

    return productsConverted;
  }

  async saveProduct(product) {
    const newProduct = {
      url_image_product: product.url_image_product || null,
      id_restaurant: product.id_restaurant,
      product_name: product.product_name,
      description: product.description,
      category: product.category,
      price: Number(parseFloat(product.price)),
      promotion: eval(product.promotion),
      start_promotion: product.start_promotion || null,
      end_promotion: product.end_promotion || null,
      price_promotion: product.price_promotion || null,
      description_promotion: product.description_promotion || null,
    };
    await this.validateRegister(newProduct);

    const sql = `insert into products
    (url_image_product, id_restaurant, product_name, description, category, price, promotion,
    start_promotion, end_promotion, price_promotion, description_promotion)
    values (:url_image_product, :id_restaurant, :product_name, :description, :category, :price,
    :promotion, :start_promotion, :end_promotion, :price_promotion, :description_promotion)`;

    await db.query(sql, {
      replacements: {
        url_image_product: newProduct.url_image_product,
        id_restaurant: newProduct.id_restaurant,
        product_name: newProduct.product_name,
        description: newProduct.description,
        category: newProduct.category,
        price: newProduct.price,
        promotion: newProduct.promotion,
        start_promotion: newProduct.start_promotion,
        end_promotion: newProduct.end_promotion,
        price_promotion: newProduct.price_promotion,
        description_promotion: newProduct.description_promotion,
      },
      type: QueryTypes.INSERT,
    });

    return { success: true };
  }

  async removeProduct(idProduct, idRestaurant) {
    const sqlSelect =
      "select * from products p where p.id_product = :id_product and p.id_restaurant = :id_restaurant";

    const product = await db.query(sqlSelect, {
      replacements: {
        id_restaurant: idRestaurant,
        id_product: idProduct,
      },
      type: QueryTypes.SELECT,
    });

    if (product.length === 0) {
      throw new Error("Produto não encontrado");
    }

    const sql =
      "delete from products p where p.id_product = :id_product and p.id_restaurant = :id_restaurant";

    await db.query(sql, {
      replacements: {
        id_restaurant: idRestaurant,
        id_product: idProduct,
      },
      type: QueryTypes.DELETE,
    });

    return { success: true };
  }

  async validateRegister(data) {
    let errors = [];

    if (!data.product_name) {
      errors.push({
        field: "product_name",
        message: "O nome do prato é obrigatório",
      });
    }

    if (!data.description) {
      errors.push({
        field: "description",
        message: "A descrição do prato é obrigatória",
      });
    }

    if (!data.price) {
      errors.push({
        field: "price",
        message: "Valor do prato é obrigatório",
      });
    }

    if (!data.category) {
      errors.push({
        field: "category",
        message: "Categoria é obrigatória",
      });
    }

    if (data.promotion) {
      if (!data.start_promotion) {
        errors.push({
          field: "start_promotion",
          message: "Informe a data de inicio da promoção",
        });
      }

      if (!data.end_promotion) {
        errors.push({
          field: "start_promotion",
          message: "Informe a data final da promoção",
        });
      }

      if (!data.description_promotion) {
        errors.push({
          field: "description_promotion",
          message: "Descricão da promoção é obrigatória",
        });
      }

      if (!data.price_promotion) {
        errors.push({
          field: "price_promotion",
          message: "Valor da promoção é obrigatório",
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

  convertProduct(product) {
    let productConverted = {};

    productConverted.id_product = product.id_product;
    productConverted.id_restaurant = product.id_restaurant;
    productConverted.url_image_product = product.url_image_product;
    productConverted.product_name = product.product_name;
    productConverted.description = product.description;
    productConverted.price = product.price;
    productConverted.category = product.category;
    productConverted.promotion = !!product.promotion;

    if (product.promotion) {
      productConverted.description_promotion = product.description_promotion;
      productConverted.price_promotion = product.price_promotion;
      productConverted.start_promotion = moment(product.start_promotion).format(
        "DD/MM/YYYY"
      );
      productConverted.end_promotion = moment(product.end_promotion).format(
        "DD/MM/YYYY"
      );
    }

    return productConverted;
  }
}

module.exports = Product;

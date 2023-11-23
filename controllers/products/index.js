const db = require("../../db/conn");
const { QueryTypes } = require("sequelize");
const RequestErrors = require("../errors/Request");
class Product {
  async listAllProducts(params) {
    const sql = `select * from products p
    where (p.product_name like :search or p.category like :search)`;

    const products = await db.query(sql, {
      replacements: {
        search: "%" + params + "%",
      },
      type: QueryTypes.SELECT,
    });

    return products;
  }
}

module.exports = Product;

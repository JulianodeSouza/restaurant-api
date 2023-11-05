const { Sequelize } = require("sequelize");

const db = new Sequelize("backend_challange", "root", "senha", {
  host: "localhost",
  dialect: "mysql",
});

try {
  db.authenticate();
  console.log("Conexão realizada com sucesso!");
} catch (e) {
  console.log(e);
  throw new Error("Não foi possível conectar ao banco de dados");
}

module.exports = db;

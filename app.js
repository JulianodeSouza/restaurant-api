const express = require("express");

const app = express();
const db = require("./src/db/conn");

db.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Aplicação UP 🚀");
    });
  })
  .catch((e) => {
    console.log(e);
    throw new Error("Não foi possível realizar a conexão com o banco de dados");
  });

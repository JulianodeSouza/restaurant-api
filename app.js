const express = require("express");
const app = express();
const db = require("./db/conn");
const multer = require("multer");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (file.fieldname.url_image_restaurant) {
      folder = "restaurants";
    } else if (file.fieldname.url_image_product) {
      folder = "products";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|webp)$/)) {
      return cb(new Error("Insira apenas arquivos JPG, PNG ou WEBP"));
    }
  },
});

app.use(upload.any());

app.use("/public/restaurant", require("./views/restaurant"));

db.sync()
  .then(() => {
    app.listen(21092, () => {
      console.log("Aplicação UP 🚀");
    });
  })
  .catch((e) => {
    console.log(e);
    throw new Error("Não foi possível realizar a conexão com o banco de dados");
  });

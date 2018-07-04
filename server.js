// Pacotes necessários para funcionamento
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Schema de validação
const Restaurants = require("./Models/restaurants");

// Porta onde irei conectar
const port = process.env.PORT;

// Conecção com o mLab
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);

const router = express.Router();

router
  .route("/v1/restaurants")

  .get(res => {
    Restaurants.find((error, restaurants) => {
      if (error) res.send("Erro no retorno dos restaurantes");

      res.json(restaurants);
    });
  });

// .post((req, res) => {
//   let restaurants = new Restaurants();

//   restaurants.name = req.body.name;
//   restaurants.amount = req.body.amount;
//   restaurants.addres = req.body.addres;

//   restaurants.save((error) => {
//     if (error) res.send('Restaurante não pode ser salvo');

//     res.json({ message: 'Restaurante salvo com sucesso!' });
//   });
// });

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

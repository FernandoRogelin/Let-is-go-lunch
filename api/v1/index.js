const { Router } = require("express");
const Restaurants = require("../../Models/restaurants");

module.exports = () => {
  const app = Router();

  app
    .route("/restaurants")

    .get((req, res) => {
      Restaurants.find((error, restaurants) => {
        if (error) res.send("Erro no retorno dos restaurantes");
        res.json(restaurants);
      });
    })

    .post((req, res) => {
      const { name, amount, address } = req.body;
      const restaurants = new Restaurants({
        name,
        amount,
        address
      });

      restaurants.save(error => {
        if (error) res.send("Restaurante não pode ser salvo");

        res.json({ message: "Restaurante salvo com sucesso!" });
      });
    });

  return app;
};

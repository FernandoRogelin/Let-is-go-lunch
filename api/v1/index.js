const { Router } = require("express");
const Restaurants = require("../../Models/restaurants");

module.exports = () => {
  const app = Router();

  app
    .route("/restaurants")

    .get((req, res) => {
      Restaurants.find((error, restaurants) => {
        if (error) return res.send("Erro no retorno dos restaurantes");
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
        if (error) return res.send("Restaurante não pode ser salvo");

        res.json({ message: "Restaurante salvo com sucesso!" });
      });
    })

    .delete((req, res) => {
      const { id } = req.body;

      Restaurants.remove(
        {
          _id: id
        },
        error => {
          if (error) return res.send("Id do produto não encontrado");

          res.json({ message: "Produto deletado com sucesso!" });
        }
      );
    })

    .put((req, res) => {
      const { id } = req.body;
      Restaurants.findById(id, (error, restaurant) => {
        if (error) return res.send("Id do produto não encontrado");

        let restaurantUpdated = Object.assign(restaurant, req.body);

        restaurantUpdated.save(error => {
          if (error) return res.send("Erro ao tentar atualizar o produto");

          res.json({ message: "Produto atualizado com sucesso!" });
        });
      });
    });

  app
    .route("/restaurants/random")

    .get((req, res) => {
      Restaurants.aggregate([{ $sample: { size: 1 } }], (error, restaurant) => {
        if (error) return res.send("Restaurante não enviado");
        res.send(restaurant);
      });
    });

  return app;
};

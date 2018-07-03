let express = require("express");
let app = express();
let port = process.env.PORT || 3000;

app.get("/", (rep, res) => {
  res.send("<h1>Home</h1>");
});

app.get("/v1/restaurants", (rep, res) => {
  const response = [
    {
      nome: "Pampa",
      endereço: "Av. Goethe, 13 - Moinhos de Vento",
      valor: "R$19,90"
    },
    {
      nome: "Delícia",
      endereço: "Av. Carlos Gomes, 249 - Auxiliadora",
      valor: "R$22,00"
    }
  ];
  res.send({ data: response });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log("Para derrubar o servidor: crtl + c");
});

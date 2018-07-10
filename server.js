// Pacotes necessários para funcionamento
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const V1Api = require("./api/v1");

const app = express();

mongoose.Promise = global.Promise;

// Porta onde irei conectar
const port = process.env.PORT || 3000;

// Conecção com o mLab
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.end();
});

app.use("/v1", V1Api());

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

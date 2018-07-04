const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantsSchema = new Schema({
  name: String,
  address: String,
  amount: Number
});

module.exports = mongoose.model("Restaurants", RestaurantsSchema);

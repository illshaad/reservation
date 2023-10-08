const mongoose = require("mongoose");

const signup = mongoose.Schema({
  prenom: String,
  nom: String,
  bathroom: Number,
});

const dataModelsignUp = mongoose.model("signup", signup);

module.exports = dataModelsignUp;

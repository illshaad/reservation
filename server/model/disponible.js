const mongoose = require("mongoose");

const DisponibleSchema = new mongoose.Schema({
  bathroom: Number,
  date: String,
  time: [
    {
      idBathroom: Number,
      startTime: String,
      endTime: String,
      isBooking: Boolean,
      prenom: String,
      nom: String,
    },
  ],
});

const Disponible = mongoose.model("Disponible", DisponibleSchema);

module.exports = Disponible;

const mongoose = require("mongoose");
const format = require("date-fns/format");
const { fr } = require("date-fns/locale");
const SignUp = require("../model/signup");
const Disponible = require("../model/disponible");

const initializeApp = async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((collection) => collection.name);
    if (collectionNames.includes("reservations")) {
      return res.status(409).json({ message: "Collection already exists" });
    }

    const reservationsData = [
      {
        bathroom: 1,
        date: format(new Date("2023-09-29"), "EEEE", { locale: fr }),
        time: [
          {
            idBathroom: 1,
            startTime: "09:00",
            endTime: "09:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 2,
            startTime: "10:00",
            endTime: "10:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 3,
            startTime: "11:00",
            endTime: "11:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
        ],
      },
      {
        bathroom: 1,
        date: format(new Date("2023-09-30"), "EEEE", { locale: fr }),
        time: [
          {
            idBathroom: 4,
            startTime: "09:00",
            endTime: "09:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 5,
            startTime: "10:00",
            endTime: "10:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 6,
            startTime: "11:00",
            endTime: "11:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
        ],
      },

      {
        bathroom: 1,
        date: format(new Date("2023-10-01"), "EEEE", { locale: fr }),
        time: [
          {
            idBathroom: 7,
            startTime: "09:00",
            endTime: "09:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 8,
            startTime: "10:00",
            endTime: "10:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 9,
            startTime: "11:00",
            endTime: "11:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
        ],
      },

      {
        bathroom: 1,
        date: format(new Date("2023-10-02"), "EEEE", { locale: fr }),
        time: [
          {
            idBathroom: 10,
            startTime: "09:00",
            endTime: "09:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 11,
            startTime: "10:00",
            endTime: "10:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
          {
            idBathroom: 12,
            startTime: "11:00",
            endTime: "11:30",
            prenom: "ajouter",
            nom: "ajouter",
            isBooking: false,
          },
        ],
      },
    ];

    module.exports = reservationsData;

    await Disponible.insertMany(reservationsData);

    res.status(200).json({
      message: "Les réservations ont été insérées correctement",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des données" });
  }
};
const signup = async (req, res) => {
  try {
    const { prenom, nom, bathroom } = req.body;
    const data = await SignUp.find({ prenom, nom, bathroom });

    if (data.length === 0) {
      const newSignUp = new SignUp({
        prenom,
        nom,
        bathroom,
      });

      await newSignUp.save();
      res.status(200).json({ message: "User registered" });
    } else {
      res.status(200).json({ message: "User already registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const saveBooking = async (req, res) => {
  try {
    const { reservation } = req.body;
    const reservationId = reservation._id;
    const newIdBathroom = reservation.idBathroom;

    const updatedReservation = await Disponible.findOneAndUpdate(
      { _id: reservationId, "time.idBathroom": newIdBathroom },
      {
        $set: {
          "time.$.isBooking": true,
          "time.$.prenom": reservation.prenom,
          "time.$.nom": reservation.nom,
        },
      },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la réservation" });
  }
};

const getAvailable = async (req, res) => {
  try {
    const data = await Disponible.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const getBooking = async (req, res) => {
  const { prenom, nom } = req.params;

  try {
    const data = await Disponible.find();
    const filter = data.map((reservation) => {
      const get = reservation.time.filter((timeSlot) => {
        return timeSlot.prenom === prenom && timeSlot.nom === nom;
      });
      return get;
    });

    res.status(200).json(filter.flat());
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  initializeApp,
  signup,
  saveBooking,
  getAvailable,
  getBooking,
};

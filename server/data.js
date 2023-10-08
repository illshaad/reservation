const format = require("date-fns/format");
const { fr } = require("date-fns/locale");

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

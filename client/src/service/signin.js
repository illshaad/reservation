import Axios from "axios";

const signInBackend = async (prenom, nom, bathroom) => {
  const response = await Axios.post("http://localhost:3000/signup", {
    prenom,
    nom,
    bathroom,
  });
  return response.data;
};

const saveBooking = async (reservation) => {
  const response = await Axios.post("http://localhost:3000/save/booking", {
    reservation,
  });
  return response.data;
};

const getBookings = async () => {
  const response = await Axios.get(`http://localhost:3000/bookings`);
  return response.data;
};

const getBooking = async (prenom, nom) => {
  const response = await Axios.get(
    `http://localhost:3000/booking/${prenom}/${nom}`
  );
  return response.data;
};

export { signInBackend, saveBooking, getBookings, getBooking };

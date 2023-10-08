import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBookings, saveBooking } from "../service/signin";

export default function Reservation() {
  const navigate = useNavigate();
  const { prenom, nom, bathroom } = useParams();
  const [bookings, setBooking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBookings();
        setBooking(res);
        setLoading(false);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const book = async (reservation, _id, prenom, nom) => {
    const formatData = {
      _id,
      prenom,
      nom,
      idBathroom: reservation.idBathroom,
    };
    setReservation(formatData);
    setSelectedDate(reservation.idBathroom);
  };

  const sendData = async () => {
    await saveBooking(reservation);
    navigate(`/dashboard/${bathroom}/${prenom}/${nom}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#282E1F]">
      <div className="rounded-xl bg-white sm:p-6 lg:p-8 max-w-xl">
        <div className="flex items-start sm:gap-8">
          <div>
            <div className="flex gap-4">
              <strong className="rounded border  bg-[#d4f872] px-3 py-1.5 text-[18px] font-medium text-white">
                Bienvenue {prenom} {nom}
              </strong>
              <button
                onClick={() =>
                  navigate(`/dashboard/${bathroom}/${prenom}/${nom}`)
                }
                className=" cursor-pointer rounded border bg-[#282E1F] px-3 py-1.5 text-[18px] font-medium text-white"
              >
                Mon dashboard
              </button>
            </div>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Votre numéro de chambre est <br /> le numéro {bathroom}
            </h3>

            <p className="mt-1 text-base text-gray-700 ">
              Voici les heurs disponible pour la reservation de la salle de bain
            </p>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="mt-2 flex gap-10">
                {bookings.map((booking) => (
                  <div className="flex flex-col gap-2" key={booking.id}>
                    <p className="text-base font-bold text-center text-gray-500">
                      {booking.date}
                    </p>
                    {booking.time.map((timeSlot) => (
                      <div className="flex flex-row gap-2" key={timeSlot.id}>
                        <button
                          onClick={() =>
                            book(timeSlot, booking._id, prenom, nom, bathroom)
                          }
                          disabled={timeSlot.isBooking}
                          className={`cursor-pointer w-[100px] transition rounded-full ${
                            timeSlot.isBooking
                              ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                              : "hover:bg-indigo-500 hover:text-white bg-purple-100 text-purple-700"
                          } px-2.5 py-0.5 text-sm`}
                        >
                          {timeSlot.startTime} - {timeSlot.endTime}
                        </button>

                        {selectedDate === timeSlot.idBathroom && (
                          <div className="flex gap-2">
                            <span
                              onClick={() => sendData()}
                              className="transition hover:bg-emerald-300 cursor-pointer inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 text-emerald-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="-ms-1 me-1.5 h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <span className="inline-flex items-center rounded-full bg-red-300 px-2.5 py-0.5 text-red-700">
                              <button
                                onClick={() => setSelectedDate(null)}
                                className="-me-1 ms-1.5 inline-block rounded-full bg-red-400 p-0.5 text-red-700 transition hover:bg-red-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-3 w-3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

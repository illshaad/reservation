import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { reservationFinish } from "../service/signin";

function Reservation({ booking }) {
  const [minutes, setMinutes] = useState(30);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setMinutes((prevCounter) => {
        const newCounter = prevCounter - 1;
        if (newCounter === 0) {
          reservationFinish(booking);
          setIsFinish(true);
          clearInterval(timerId);
        }
        return newCounter;
      });
    }, 60000);

    return () => clearInterval(timerId);
  }, [booking]);

  const formatRemainingTime = (time) => {
    const remainingMinutes = time % 60;
    return `${remainingMinutes} min`;
  };

  const renderReservation = (reservation) => {
    return (
      <div
        key={reservation.id}
        className="rounded-xl mt-20 shadow-lg bg-[#d4f872] p-4 sm:p-6"
      >
        <h3 className="mt-0.5 text-base font-medium text-[#323927]">
          Tu as réservé la salle de bain {reservation.bathroom} de{" "}
          {reservation.startTime} à {reservation.endTime}
        </h3>
        <p className="mt-1 text-xs font-bold text-gray-700">
          {isFinish
            ? "La réservation est terminée"
            : `Elle se termine dans ${formatRemainingTime(minutes)}`}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center ml-10">
      {isFinish ? (
        <h1 className="text-2xl font-bold text-[#d4f872]">
          Réservation terminée
        </h1>
      ) : booking && booking.length === 0 ? (
        <h1 className="text-2xl font-bold text-[#d4f872] ">
          Aucune réservation
        </h1>
      ) : (
        booking.map(renderReservation)
      )}
    </div>
  );
}

export default Reservation;

Reservation.propTypes = {
  booking: PropTypes.array.isRequired,
};

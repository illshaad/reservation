import { useEffect, useState } from "react";

import PropTypes from "prop-types";
function Reservation({ booking }) {
  const [minutes, setMinutes] = useState(2);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (minutes > 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
      }
    }, 60000);

    return () => clearInterval(timerId);
  }, [minutes]);

  const formatTime = (time) => {
    const remainingMinutes = time % 60;
    return `${remainingMinutes} min`;
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center ml-10">
      {booking && booking.length === 0 ? (
        <span>Aucune réservation</span>
      ) : (
        booking.map(({ startTime, endTime, bathroom }, index) => (
          <div
            key={index}
            className="rounded-xl mt-20 shadow-lg bg-[#d4f872] p-4 sm:p-6"
          >
            <h3 className="mt-0.5 text-base font-medium text-[#323927]">
              Tu as réservé la salle de bain {bathroom} de {startTime} à{" "}
              {endTime}
            </h3>
            <p className="mt-1 text-xs font-bold text-gray-700">
              {minutes === 0
                ? "La réservation est terminée"
                : `Elle se termine dans ${formatTime(minutes)}`}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Reservation;

Reservation.propTypes = {
  booking: PropTypes.array.isRequired,
};

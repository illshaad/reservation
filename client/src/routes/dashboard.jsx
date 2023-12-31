import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Reservation from "../Components/reservation";
import { getBooking } from "../service/signin";
export default function Dashboard() {
  const navigate = useNavigate();
  const { prenom, nom, bathroom } = useParams();
  const [booking, setBooking] = useState(null);

  const getData = async () => {
    try {
      const res = await getBooking(prenom, nom);
      setBooking(res);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  return (
    <div className="flex bg-[#282E1F]">
      <div className="h-screen border bg-white w-96">
        <div className="px-2 py-6 ">
          <div className="grid py-8 place-content-center rounded-lg bg-[#282E1F] text-4xl text-[#d4f872]">
            {prenom} {nom}
          </div>
          <ul className="space-y-2">
            <li>
              <button
                onClick={getData}
                className="block rounded-lg mt-4 px-4 py-2 w-full font-medium text-gray-500 hover:bg-[#d4f872] hover:text-gray-700"
              >
                Voir mes réservations
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  navigate(`/reservation/${bathroom}/${prenom}/${nom}`)
                }
                className="block rounded-lg mt-4 px-4 py-2 w-full font-medium text-gray-500 hover:bg-[#d4f872] hover:text-gray-700"
              >
                Voir les salles de bain
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate(`/`)}
                className="block rounded-lg mt-4 px-4 py-2 w-full font-medium text-gray-500 hover:bg-[#d4f872] hover:text-gray-700"
              >
                Me déconnecter
              </button>
            </li>
          </ul>
        </div>
      </div>

      {booking && (
        <div className="w-full">
          <Reservation
            prenom={prenom}
            nom={nom}
            bathroom={bathroom}
            booking={booking}
          />
        </div>
      )}
    </div>
  );
}

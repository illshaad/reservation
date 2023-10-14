import { useForm } from "react-hook-form";
import { signInBackend } from "../service/signin";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { prenom, nom, bathroom } = data;
    const response = await signInBackend(prenom, nom, bathroom);
    return response && navigate(`/dashboard/${bathroom}/${prenom}/${nom}`);
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Reservation créneau salle de bain
          </h1>

          <p className="mt-4 text-gray-500">
            Nous avons besoin de vos informations pour pouvoir faire une
            reservation de créneau salle de bain.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <div className="relative">
              <input
                {...register("prenom", { required: true })}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-lg"
                placeholder="John"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                {...register("nom", { required: true })}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4  text-sm shadow-lg"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="relative">
            <input
              {...register("bathroom", { required: true })}
              type="number"
              className="w-full rounded-lg border-gray-200 p-4  text-sm shadow-lg"
              placeholder="Numéro de chambres 1 à 3"
              min={1}
              max={3}
            />
          </div>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500  px-5 py-3 text-sm text-white"
          >
            Suivant
          </button>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://ucarecdn.com/d48da461-bc97-4ecf-bb4b-1516e778be46/-/preview/500x500/-/quality/smart_retina/-/format/webp/"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

import React, { useState } from "react";
import Ai from "./Ai";
import { MdVerifiedUser } from "react-icons/md";
const Recherche = () => {
  const [type_1, setType1] = useState(false);
  const [type_2, setType2] = useState(false);
  const [type_3, setType3] = useState(false);
  const [type_4, setType4] = useState(false);

  const [commune, setCommune] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [date_debut, setDate_debut] = useState("");
  const [date_fin, setDate_fin] = useState("");
  const [type, setType] = useState("");
  const [mot_cle, setMot_cle] = useState("");
  const [vue, setVue] = useState(true);
  const [response, setResponse] = useState([]);
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  let mode = type_1 || type_2 || type_3 || type_4;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setVue(!vue);
    const data = {
      by_type: type_4,
      type: type,
      by_wilaya: type_2,
      wilaya: wilaya,
      by_commune: type_1,
      commune: commune,
      by_periode: type_3,
      date1: date_debut,
      date2: date_fin,
    };
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/ai/filter/", requestOptions)
      .then((response) => response.text())
      .then((response) => setResponse(JSON.parse(response)))
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="w-full flex flex-col items-center justify-center" data-testid='recherche-1'>
      {vue ? (
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <h1 className="font-bold text-2xl text-center text-slate-500 my-6">
            Choisir les type de filtrage
          </h1>
          <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center">
            <div
              className="h-12 w-[150px] flex flex-row gap-2 items-center justify-center bg-indigo-500 rounded-lg px-2 py-4 text-bold text-white text-lg cursor-pointer"
              onClick={() => setType1(!type_1)}
            >
              Commune
              {type_1 ? <MdVerifiedUser size={20} /> : console.log("")}
            </div>
            <div
              className="h-12 w-[150px] flex flex-row gap-2 items-center justify-center bg-indigo-500 rounded-lg px-2 py-4 text-bold text-white text-lg cursor-pointer"
              onClick={() => setType2(!type_2)}
            >
              wilaya
              {type_2 ? <MdVerifiedUser size={20} /> : console.log("")}
            </div>
            <div
              className="h-12 w-[150px] flex flex-row gap-2 items-center justify-center bg-indigo-500 rounded-lg px-2 py-4 text-bold text-white text-lg cursor-pointer"
              onClick={() => setType3(!type_3)}
            >
              Date
              {type_3 ? <MdVerifiedUser size={20} /> : console.log("")}
            </div>
            <div
              className="h-12 w-[150px] flex flex-row gap-2 items-center justify-center bg-indigo-500 rounded-lg px-2 py-4 text-bold text-white text-lg cursor-pointer"
              onClick={() => setType4(!type_4)}
            >
              Type
              {type_4 ? <MdVerifiedUser size={20} /> : console.log("")}
            </div>
          </div>
          <form
            className={`${
              mode
                ? `p-5 bg-slate-300 rounded-lg shadow-md w-1/2 sm:w-1/3`
                : `hidden`
            }`}
            onSubmit={handleSubmit}
          >
            {type_1 ? (
              <div id="commune">
                <label
                  className="block font-medium text-gray-700 mb-2"
                  htmlFor="commune"
                >
                  Commune
                </label>
                <input
                  className="w-full border border-gray-400 p-2 rounded-lg"
                  id="commune"
                  type={"text"}
                  required
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                />
              </div>
            ) : (
              console.log()
            )}

            {type_2 ? (
              <div id="wilaya">
                <label
                  className="block font-medium text-gray-700 mb-2"
                  htmlFor="wilaya"
                >
                  Wilaya
                </label>
                <input
                  className="w-full border border-gray-400 p-2 rounded-lg"
                  id="wilaya"
                  type={"text"}
                  required
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                />
              </div>
            ) : (
              console.log()
            )}

            {type_3 ? (
              <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-center">
                <div id="date_debut">
                  <label
                    className="block font-medium text-gray-700 mb-2"
                    htmlFor="date_debut"
                  >
                    Date_debut
                  </label>
                  <input
                    className="w-full border border-gray-400 p-2 rounded-lg"
                    id="date_debut"
                    type={"date"}
                    required
                    value={date_debut}
                    onChange={(e) => setDate_debut(e.target.value)}
                  />
                </div>
                <div id="date_fin">
                  <label
                    className="block font-medium text-gray-700 mb-2"
                    htmlFor="date_fin"
                  >
                    date_fin
                  </label>
                  <input
                    className="w-full border border-gray-400 p-2 rounded-lg"
                    id="date_fin"
                    type={"date"}
                    required
                    value={date_fin}
                    onChange={(e) => setDate_fin(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {type_4 ? (
              <div id="type">
                <label
                  className="block font-medium text-gray-700 mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  className="w-full border border-gray-400 p-2 rounded-lg"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Terrain">Terrain</option>
                  <option value="Terrain_Agricole">Terrain_Agricole</option>
                  <option value="Appartement"> Appartement</option>
                  <option value="Maison">Maison</option>
                  <option value="Bungalow">Bungalow</option>
                </select>
              </div>
            ) : (
              console.log()
            )}

            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 mt-3 w-full"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-8 px-3 items-center justify-center">
            {response?.map((ai) => (
              <div key={ai.id}>
                <Ai annonce={ai} />
              </div>
            ))}
          </div>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
            onClick={() => setVue(!vue)}
          >
            Retour
          </button>
        </>
      )}
    </div>
  );
};

export default Recherche;

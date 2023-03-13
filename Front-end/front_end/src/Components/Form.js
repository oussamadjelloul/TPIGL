import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";
import icon from "./icon";
import "leaflet/dist/leaflet.css";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Popup, MapContainer } from "react-leaflet";
import "reactjs-popup/dist/index.css";

const Form = () => {
  const id = JSON.parse(localStorage.getItem("Recent_id"))?.id;
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [date_Publication, setDate_Publication] = useState("");
  const [typeai, setTypeai] = useState("");
  const [category, setCategory] = useState("");
  const [surface, setSurface] = useState("");
  const [prix, setPrix] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [adresse_ai, setAdresse_ai] = useState("");
  const [information_tel, setinformation_tel] = useState("");
  const [information_email, setInformation_email] = useState("");
  const [information_nom, setInformation_nom] = useState("");
  const [information_prenom, setInformation_prenom] = useState("");
  const [information_adresse, setInformation_adresse] = useState("");
  const [user, setUser] = useState(id);
  const [uploadedimages, setUploadedimages] = useState([]);
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  const [clicking, setClicking] = useState(false);
  const [stop, setStop] = useState(false);

  const [position, setPosition] = useState({ lat: "", lng: "" });
  const [position_data, setposition_data] = useState([35, 5]);

  const someEventHandler = (e) => {
    setPosition(e.latlng);
  };
  const handleSubmit = async (event) => {
    setStop(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("type_ai", typeai);
    formData.append("category", category);
    formData.append("surface", surface);
    formData.append("prix", prix);
    formData.append("wilaya", wilaya);
    formData.append("commune", commune);
    formData.append("adresse_ai", adresse_ai);
    formData.append("information_tel", information_tel);
    formData.append("information_email", information_email);
    formData.append("information_nom", information_nom);
    formData.append("information_prenom", information_prenom);
    formData.append("information_adresse", information_adresse);
    formData.append("user", id);
    formData.append("lat", parseFloat(position.lat).toFixed(10));
    formData.append("lng", parseFloat(position.lng).toFixed(10));
    uploadedimages.forEach((image, index) => {
      formData.append("uploaded_images", image);
    });

    axios({
      url: "http://127.0.0.1:8000/ai/",
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((result) => {
        setClicking(true);
        setStop(false);
        window.setTimeout(() => {
          setClicking(false);
        }, 2000);
      })
      .catch((err) => {
        setStop(false);
      });
  };

  const onImageChange = (e) => {
    setUploadedimages([...e.target.files]);
  };

  return (
    <form className="p-5 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="information_nom"
        >
          Nom
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="information_nom"
          type={"text"}
          required
          value={information_nom}
          onChange={(e) => setInformation_nom(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="information_prenom"
        >
          Prenom
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="information_prenom"
          type={"text"}
          value={information_prenom}
          onChange={(e) => setInformation_prenom(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="information_adresse"
        >
          Adresse
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="information_adresse"
          type={"text"}
          value={information_adresse}
          onChange={(e) => setInformation_adresse(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2" htmlFor="titre">
          Title
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="titre"
          type={"text"}
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="date_publication"
        >
          Publication Date
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="date_publication"
          type={"date"}
          value={date_Publication}
          onChange={(e) => setDate_Publication(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="typeai"
        >
          Type
        </label>
        <select
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="typeai"
          value={typeai}
          onChange={(e) => setTypeai(e.target.value)}
        >
          <option value="Terrain">Terrain</option>
          <option value="Terrain_Agricole">Terrain_Agricole</option>
          <option value="Appartement"> Appartement</option>
          <option value="Maison">Maison</option>
          <option value="Bungalow">Bungalow</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <select
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Location">Location</option>
          <option value="Vente">Vente</option>
          <option value="Echange">Echange</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="surface"
        >
          Area
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="surface"
          type="number"
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2" htmlFor="price">
          Price
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="price"
          type="number"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="wilaya"
        >
          wilaya
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="wilaya"
          type="text"
          value={wilaya}
          onChange={(e) => setWilaya(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="commune"
        >
          Commune
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="commune"
          type="text"
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="adresse_ai"
        >
          Adresse Ai
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="adresse_ai"
          type="text"
          value={adresse_ai}
          onChange={(e) => setAdresse_ai(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="phoneNumber"
          type={"number"}
          value={information_tel}
          onChange={(e) => setinformation_tel(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-gray-700 mb-2"
          htmlFor="information_email"
        >
          email
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="information_email"
          type={"email"}
          value={information_email}
          onChange={(e) => setInformation_email(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2" htmlFor="imag">
          Images
        </label>
        <input type="file" multiple accept="image/*" onChange={onImageChange} />
      </div>

      <div className="w-11/12 m-auto bg-gray-100 rounded-md flex flex-col max-h-max shadow-lg">
        <div className="w-11/12 m-auto xl:flex 2xl:flex lg:flex max-h-max mt-10  ">
          <div className=" lg:w-1/2 max-h-max md:w-full sm:w-full ">
            <MapContainer
              attributionControl={false}
              center={[35, 3]}
              zoom={6}
              scrollWheelZoom={true}
              style={{ width: "500px", height: "300px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> '
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={position_data}
                icon={icon}
                draggable={true}
                eventHandlers={{
                  move: (e) => {
                    someEventHandler(e);
                  },
                }}
              />
            </MapContainer>
          </div>
          <div className="lg:w-1/2 h-72 md:w-full sm:w-full">
            <label
              className="block font-medium text-gray-700 mb-2 text-center"
              htmlFor="description"
            >
              description
            </label>
            <textarea
              className="w-11/12 h-5/6 border border-gray-400 p-2 rounded-lg "
              id="description"
              type={"text"}
              placeholder="saisi votre description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button
          disabled={stop}
          className={` text-white py-2 px-4 rounded-lg hover:bg-indigo-600 mt-5 w-60 m-auto mb-4 ${
            stop ? "bg-indigo-300" : "bg-indigo-500"
          }`}
          type="submit"
        >
          Submit
        </button>
      </div>
      {clicking && (
        <div className="absolute top-1/3 left-1/3 right-1/3 w-60 h-28 z-40">
          a;ldsflkasdj
        </div>
      )}
    </form>
  );
};

export default Form;

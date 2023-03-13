import React from "react";
import {
  BsFillTelephoneOutboundFill,
  BsFillHouseDoorFill,
  BsHouseDoorFill,
} from "react-icons/bs";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillDollarCircle, AiFillMail } from "react-icons/ai";
import { RxRulerSquare } from "react-icons/rx";
import { IoMdReturnRight } from "react-icons/io";
import { FaUser, FaHouseUser } from "react-icons/fa";
import icon from "./icon";
import "leaflet/dist/leaflet.css";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Popup, MapContainer } from "react-leaflet";
import "reactjs-popup/dist/index.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

const Affichageai = (props) => {
  const navigation = useNavigate();
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  const id = JSON.parse(localStorage.getItem("Recent_id"))?.id;
  const annonce = JSON.parse(localStorage.getItem("Recent_annonce"))?.annonce;
  const url = "http://127.0.0.1:8000/ai/" + JSON.stringify(annonce) + "/";
  const [slides, setSlides] = useState(0);
  const [message, setMessage] = useState("");
  const [res, setRes] = useState({
    titre: "",
    description: "",
    date_Publication: "",
    type_ai: "",
    category: "",
    surface: "",
    prix: "",
    wilaya: "",
    commune: "",
    adresse_ai: "",
    information_tel: "",
    information_email: "",
    information_nom: "",
    information_prenom: "",
    information_adresse: "",
    user: "",
    lat: "",
    lng: "",
    images: [],
  });
  const Sendmessage = (e) => {
    e.preventDefault();
    const data = {
      body: message,
      user_sender: id,
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
    fetch(
      "http://127.0.0.1:8000/ai/" + JSON.stringify(annonce) + "/message/",
      requestOptions
    )
      .then((response) => response.text())
      .then((e = {}))
      .catch((error) => {});
  };

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRes(response.data);
      });
  }, []);

  const Retour = () => {
    navigation("/");
    localStorage.setItem("Recent_annonce", null);
  };
  console.log(res.lat);

  return (
    <section className="w-full flex flex-col items-center justify-center pb-6">
      <div className="w-full flex items-center justify-center">
        <div
          className="flex flex-col items-center justify-center inset-0 z-50 bg-gray-100 relative w-11/12  shadow-lg mt-20 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-row justify-center w-full my-2 rounded-2xl">
            <AiOutlineArrowLeft
              className="relative mt-40 "
              size={30}
              onClick={() => {
                if (slides > 0) {
                  setSlides(slides - 1);
                }
              }}
            />
            <img
              src={
                res.images[slides] !== undefined
                  ? "http://127.0.0.1:8000/" + res.images[slides].image
                  : null
              }
              className="mx-5 h-[350px] w-[800px] select-none rounded-lg"
              onClick={() => {
                setSlides((slides + 1) % res.images.length);
              }}
              alt="ldkjfkd"
            />
            <AiOutlineArrowRight
              className="relative mt-40 "
              size={30}
              onClick={() => {
                if (slides < res.images.length - 1) {
                  setSlides(slides + 1);
                }
              }}
            />
          </div>
          <div className="w-full px-4 md:px-2 md:gap-1 flex flex-col md:flex-row items-center justify-center bg-white">
            <div className="md:w-1/2 w-full flex-1 flex flex-col items-center justify-center px-4 py-4">
              <h6 className="text-xl font-extrabold text-[#000000] my-2 mx-5">
                {res.titre}
              </h6>
              <p className="text-lg  my-2 mx-5">{res.description}</p>
              <div className="flex flex-row ml-5">
                <div>
                  <div className="flex flex-row p-4 items-center justify-center">
                    <AiFillDollarCircle size={20} className="text-[#4A60A1]" />
                    <h6 className="ml-2">{res.prix}</h6>
                    <h6 className="ml-1">DINARS</h6>
                  </div>
                  <div className="flex flex-row p-4 items-center justify-start">
                    <BsFillTelephoneOutboundFill
                      size={20}
                      className="text-[#4A60A1]"
                    />
                    <h6 className="ml-2">{res.information_tel}</h6>
                  </div>
                  <div className="flex flex-row p-4 items-center justify-start">
                    <RxRulerSquare size={20} className="text-[#4A60A1]" />
                    <h6 className="ml-2">{res.surface}</h6>
                    <h6 className="ml-1">m^2</h6>
                  </div>
                  <div className="flex flex-row p-4 items-center justify-start">
                    <BsFillHouseDoorFill
                      size={20}
                      className="text-[#4A65A1] "
                    />
                    <h6 className="ml-2">{res.type_ai}</h6>
                  </div>
                </div>
                <div className="ml-20">
                  <div className="flex flex-row p-4 items-center justify-start">
                    <FaUser size={20} className="text-[#4A60A1]" />
                    <h6 className="ml-2">{res.information_nom}</h6>
                  </div>
                  <div className="flex flex-row p-4 items-center justify-start">
                    <FaUser size={20} className="text-[#4A60A1]" />
                    <h6 className="ml-2">{res.information_prenom}</h6>
                  </div>
                  <div className="flex flex-row p-4 items-center justify-start">
                    <AiFillMail size={20} className="text-[#4A60A1]" />
                    <h6 className="ml-2">{res.information_email}</h6>
                  </div>
                  <div className="flex flex-row p-4 items-center justify-start">
                    <FaHouseUser size={20} className="text-[#4A65A1] " />
                    <h6 className="ml-2">{res.information_adresse}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 w-full flex-1 flex justify-center mt-4">
              <MapContainer
                attributionControl={false}
                center={[28.0339, 1.6596]}
                zoom={4}
                scrollWheelZoom={true}
                style={{ width: "500px", height: "300px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> '
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[res.lat, res.lng]} icon={icon} />
              </MapContainer>
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-center py-4">
            <h1 className="text-xl text-neutral-700 font-bold ">
              Faire une offre
            </h1>
            <form
              className="w-full flex flex-col gap-3 justify-start items-center px-4"
              onSubmit={(e) => {
                Sendmessage();
              }}
            >
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="w-full h-36 rounded-xl resize-y shadow appearance-none border my-3 text-gray-700 focus:outline-none focus:shadow-outline pl-2 pt-2"
                placeholder="Entrer Votre message"
                required
              />
              <button
                className="bg-[#4A65A1] rounded-lg text-white font-mono font-bold p-2 h-20 w-44 my-2 hover:shadow-xl"
                onClick={Sendmessage}
              >
                envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        onClick={() => Retour()}
        className="w-[150px] h-20 flex flex-row gap-4 items-center justify-center font-bold font-mono text-xl text-black mt-3 cursor-pointer bg-slate-300 rounded-lg py-2 px-3"
      >
        Retour
        <IoMdReturnRight size={25} />
      </div>
    </section>
  );
};

export default Affichageai;

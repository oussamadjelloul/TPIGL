import React, { useState } from "react";
import Recherche from "./Recherche";
import { IoMdReturnRight } from "react-icons/io";
import Keywords from "./Keywords";
function SearchAi(props) {
  const [filtrage, setFiltrage] = useState(false);
  const [keyword, setyKeyword] = useState(false);
  const Retour = () => {
    setFiltrage(false);
    setyKeyword(false);
  };
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center">
      {!(filtrage || keyword) ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl text-center text-slate-500 my-6">
            Choisir le type de recherche
          </h1>
          <div className="flex gap-3 text-lg text-bold">
            <div
              className="h-12 w-[150px] flex flex-row gap-2 items-center justify-center bg-indigo-500 rounded-lg px-2 py-4 text-bold text-white text-lg cursor-pointer"
              onClick={() => setFiltrage(!filtrage)}
            >
              filtrage
            </div>
            <div
              className="h-12 w-[150px] flex flex-row gap-2 items-center justify-center bg-indigo-500 rounded-lg px-2 py-4 text-bold text-white text-lg cursor-pointer"
              onClick={() => setyKeyword(!keyword)}
            >
              Mots cle
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {filtrage ? <Recherche /> : keyword ? <Keywords /> : <></>}
      {filtrage || keyword ? (
        <div
          onClick={() => Retour()}
          className="w-[150px] h-10 flex flex-row gap-4 items-center justify-center text-bold text-black mt-10 cursor-pointer bg-slate-300 rounded-lg py-2 px-3"
        >
          Retour
          <IoMdReturnRight size={25} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchAi;

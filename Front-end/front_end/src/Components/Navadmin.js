import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navuser = () => {
  let [Open, setOpen] = useState(false);
  const navigation = useNavigate();
  const Logout = () => {
    navigation("/");
    localStorage.setItem("Recent_token", null);
    localStorage.setItem("Recent_user", null);
    localStorage.setItem("Recent_id", null);
    localStorage.setItem("Recent_annonce", null);
  };

  return (
    <div className="shadow-md w-full sticky left-0 md:w-auto">
      <div className="w-full flex items-center justify-between py-4 lg:px-4 pr-2">
        <div className="font-bold text-2xl cursor-pointer flex items-center justify-start  font-[poppins] text-gray-800">
          <div
            className="text-3xl text-red-500 mr-1 pt-2"
            onClick={() => {
              navigation("/");
            }}
          >
            <AiOutlineUser size={40} />
          </div>
          <div className="lowercase mt-3">
            {localStorage.getItem("Recent_user")}
          </div>
        </div>

        <button
          onClick={() => Logout()}
          className="w-[100px] h-10 bg-slate-500 text-stone-900 font-bold lg:ml-5"
        >
          Sortir
        </button>
      </div>
    </div>
  );
};

export default Navuser;

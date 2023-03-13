import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navuser = () => {
  let Links = [
    { name: "Ajouter Ai", link: "Ajouter", id: 1 },
    { name: "Rechercher Ai", link: "Search", id: 2 },
    { name: "Messages", link: "message", id: 3 },
    { name: "Ai Personnel", link: "personnel", id: 4 },
    { name: "Favorie", link: "favorie", id: 5 },
  ];

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
    <div className="shadow-md w-full sticky left-0  md:w-auto z-50">
      <div className="lg:flex items-center justify-between py-4 lg:px-4 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center justify-start  font-[poppins] text-gray-800">
          <div
            className="text-3xl text-indigo-500 mr-1 pt-2"
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
        <div
          onClick={() => setOpen(!Open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer lg:hidden"
        >
          {Open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <ul
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:bg-transparent lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
            Open ? "top-20" : "left-[-9990px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.id}
              className="lg:ml-8 text-xl lg:my-0 my-7 cursor-pointer"
              onClick={() => {
                navigation(link.link);
              }}
            >
              {link.name}
            </li>
          ))}
          <button
            onClick={() => Logout()}
            className="w-[100px] h-10 bg-slate-500 text-stone-900 font-bold lg:ml-5"
          >
            Sortir
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navuser;

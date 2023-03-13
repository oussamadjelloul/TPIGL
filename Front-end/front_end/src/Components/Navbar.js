import React, { useState } from "react";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Auth from "./Auth";

const Navbar = () => {
  let Links = [
    { name: "About Us", link: "#About", id: 2 },
    { name: "Contact Us", link: "#Contact", id: 3 },
  ];

  let [Open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full sticky left-0  md:w-auto bg-transparent" >
      <div className="md:flex items-center justify-between py-4 md:px-4 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center justify-start font-[poppins] text-gray-800">
          <div className="text-3xl text-slate-500 mb-3 pt-2">
            <AiOutlineHome size={30} />
          </div>
          <div className="pt-2 relative left-3 bottom-1 text-slate-500">
            GOHOME
          </div>
        </div>
        <div
          onClick={() => setOpen(!Open)}
          className="text-slate-500 text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {Open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            Open ? "top-20" : "left-[-990px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.id} className=" md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-black font-semibold hover:border-b-4 duration-500 "
              >
                {link.name}
              </a>
            </li>
          ))}
          <div className="md:ml-4">
            <Auth />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

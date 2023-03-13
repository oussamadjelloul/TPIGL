import React from "react";
import { AiOutlineUser, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";

const Contact = () => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center z-0"
      id="Contact"
      data-testid='contact-1'
    >
      <div className="w-full ">
        <h1 className="text-4xl font-bold bg-slate-300 px-6 py-8 text-center">
          Contact us
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-[10px] ">
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-[30px] px-[50px] bg-slate-100 py-[40px] ">
          <h3 className="text-bold text-2xl">Contact Information</h3>
          <p>
            Do you Have projects ? or maybe just you want to say hello ? i'd
            love to hear from you .
          </p>
          <div className="font-bold cursor-pointer">
            <div className="w-[200px] h-[50px] flex flex-row items-center justify-start gap-[10px] ">
              <AiOutlineUser size={20} />
              <h3>GOHOME</h3>
            </div>
            <div className="w-[200px] h-[50px] flex flex-row items-center justify-start gap-[10px] ">
              <BsFillTelephoneFill size={20} />
              <h3>+213668793883</h3>
            </div>
            <div className="w-[200px] h-[50px] flex flex-row items-center justify-start gap-[10px] ">
              <CgMail size={20} />
              <h3>gohome12@gmail.com</h3>
            </div>
          </div>
          <div className="w-full flex flex-row gap-9 items-center justify-start ">
            <a className="cursor-pointer">
              <FaFacebook size={30} />
            </a>
            <a className="cursor-pointer">
              <AiFillInstagram size={30} />
            </a>
            <a className="cursor-pointer">
              <AiFillLinkedin size={30} />
            </a>
          </div>
        </div>

        <div className="container flex items-center justify-center  md:w-1/2 my-12">
          <form className="w-3/4  flex flex-col items-center justify-center px-6 md:p-0 gap-10 relative ">
            <input
              type={"text"}
              required
              placeholder="Your name"
              className="h-[50px] w-full md:w-3/4 pl-3  cursor-pointer"
            />
            <input
              type={"text"}
              required
              placeholder="Your message"
              className="h-[50px] w-full md:w-3/4 pl-3 cursor-pointer"
            />
            <input
              type={"email"}
              required
              placeholder="Email"
              className="h-[50px] w-full md:w-3/4 pl-3 cursor-pointer"
            />
            <input
              type={"submit"}
              placeholder="Submit"
              className="w-3/4 h-[50px] bg-emerald-400 rounded-lg flex items-center justify-center absolute top-[250px] hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

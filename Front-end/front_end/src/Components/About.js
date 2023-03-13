import React from "react";
import { AiOutlineHome } from "react-icons/ai";
const About = () => {
  return (
    <section
      className="w-full transition-all duration-500 ease-in"
      id="About"
      data-testid="about-1"
    >
      <h1 className="w-full h-12 bg-slate-300 flex items-center justify-center text-bold text-4xl py-12 font-serif">
        About Us
      </h1>
      <div className="w-full flex flex-col gap-3 items-center justify-center py-2 px-2 ">
        <div className="w-full text-4xl text-center py-3 px-4 text-black bg-indigo-100 rounded-xl shadow-md">
          Many real estate professionals are motivated by the opportunity to
          help people find their dream home or make smart investment decisions.
        </div>
        <div className="w-full flex flex-col gap-3 md:flex-row items-center justify-center py-2 px-2">
          <div className="w-full md:w-1/2  h-72  flex items-center justify-center rounded-xl bg-indigo-200 shadow-md text-4xl py-5 px-5 text-center">
            C'est le meilleur site Web au monde, donc notre service propose les
            annonces maison
          </div>
          <div className="w-full md:w-1/2 h-72 rounded-xl flex items-center justify-center bg-slate-500 shadow-md text-white">
            <AiOutlineHome size={100} />
            <h1 className="font-bold font-mono text-8xl">GOHOME</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

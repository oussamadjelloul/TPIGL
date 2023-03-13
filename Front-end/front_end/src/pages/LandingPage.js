import React from "react";
import Header from "../Components/Header";
import About from "../Components/About";
import Contact from "../Components/Contact";
import Footer from "../Components/Foter";

function LandingPage(props) {
  return (
    <div>
      <Header />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;

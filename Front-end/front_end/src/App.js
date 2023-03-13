import React from "react";
import { Route, Routes } from "react-router-dom";
import Ai from "./Components/Ai_old";
import { housesData } from "./data";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import { useLocation, Navigate } from "react-router-dom";
import Messages from "./Components/Messages";
import Adds from "./Components/Adds";
import AjouterAi from "./Components/AjouterAi";
import SearchAi from "./Components/SearchAi";
import axios from "axios";
import Personnel from "./Components/Personnel";
import Favorie from "./Components/Favorie";
import Affichageai from "./Components/Affichageai";
import Administrator from "./pages/Administrator";

function App() {
  const { pathname } = useLocation();
  const ProtectRoutes = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
    console.log(token);
    return !token && pathname !== "/" ? (
      <Navigate to="/" />
    ) : token && pathname === "/" ? (
      <Navigate to="/user" />
    ) : (
      children
    );
  };

  return (
    <div>
      <ProtectRoutes>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/user" element={<UserPage />}>
            <Route index element={<Adds />} />
            <Route path={"message"} element={<Messages />} />
            <Route path={"Search"} element={<SearchAi />} />
            <Route path={"Ajouter"} element={<AjouterAi />} />
            <Route path={"personnel"} element={<Personnel />} />
            <Route path={"Favorie"} element={<Favorie />}>
              <Route path={"Affichage"} element={<Affichageai />} />
            </Route>
            <Route path={"Affichage"} element={<Affichageai />} />
          </Route>
        </Routes>
      </ProtectRoutes>
      {/* <Ai annonce={housesData[0]}/> */}
    </div>
  );
}
export default App;

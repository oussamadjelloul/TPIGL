import axios from "axios";
import React, { useState } from "react";

function Scrapping(props) {
  const [scrap, setScrap] = useState(false);
  const [data, setDta] = useState([]);
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  const Scrapping = () => {
    alert("hello");
    axios({
      url: "http://127.0.0.1:8000/scrapping",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((e) => {
        alert("scraping");
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="w-full flex py-10 items-center justify-center m-auto bg-transparent">
      {!scrap ? (
        <button
          className="w-[220px] h-10 bg-slate-500 text-stone-900 font-bold hover:bg-slate-300 rounded-xl"
          onClick={() => {
            Scrapping();
            // alert('elk')
          }}
        >
          Web Scrapping
        </button>
      ) : (
        <div>Scrapping</div>
      )}
    </div>
  );
}

export default Scrapping;

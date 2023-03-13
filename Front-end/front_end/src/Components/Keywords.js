import axios from "axios";
import { Result } from "postcss";
import React, { useState } from "react";
import Ai from "./Ai_old";
const Keywords = (props) => {
  const [mot_cle, setMot_cle] = useState("");
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  const [issubmit, setIssubmit] = useState(true);
  const [response, setResponse] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIssubmit(false);
    const data = {
      key_words: mot_cle,
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

    fetch("http://127.0.0.1:8000/ai/search/", requestOptions)
      .then((response) => response.text())
      .then((response) => setResponse(JSON.parse(response)))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="py-12 px-10">
      {issubmit ? (
        <form className="" onSubmit={handleSubmit}>
          <div id="mot_cle">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="mot_cle"
            >
              Mots cle
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-lg"
              id="commune"
              type={"text"}
              required
              placeholder="titre ou description "
              value={mot_cle}
              onChange={(e) => setMot_cle(e.target.value)}
            />
          </div>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 mt-3 w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          {response?.map((ai) => (
            <div key={ai.id}>
              <Ai annonce={ai} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Keywords;

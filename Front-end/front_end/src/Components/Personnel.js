import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Ai from "./Ai";
import { AiFillDelete } from "react-icons/ai";
const Personnel = (props) => {
  const [arr, setArr] = useState([]);

  const url = "http://127.0.0.1:8000/ai/mine/";
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  const id = JSON.parse(localStorage.getItem("Recent_token"))?.id;
  const [reload, setReload] = useState(true);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          user: id,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setArr(response.data);
      });
  }, [reload]);

  const DeletAi = async (id) => {
    try {
      const res = await axios.delete(
        "http://127.0.0.1:8000/ai/" + JSON.stringify(id) + "/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReload(!reload);
    } catch (err) {
     
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-2 md:pl-20 lg:grid-cols-3 lg:pl-10 xl:grid-cols-4 xl:pl-12 md:gap-y-4  py-8 px-3 items-center justify-center m-auto bg-transparent">
      {arr &&
        arr.map((ai) => (
          <div
            key={ai.id}
            className="w-full flex flex-col items-center gap-1 justify-center bg-transparent rounded-xl"
          >
            <AiFillDelete
              size={30}
              className="relative left-36 top-8 cursor-pointer text-indigo-600"
              onClick={() => DeletAi(ai.id)}
            />

            <Ai annonce={ai} />
          </div>
        ))}
    </div>
  );
};

export default Personnel;

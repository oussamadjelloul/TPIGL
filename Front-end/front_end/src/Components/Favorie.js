// import { data } from "autoprefixer";
import React from "react";
// import AiFavorite from "./Ai_favorite";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Ai from "./Ai";
const Favorie = (props) => {
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  let total = [];
  const [favorite_ai, SetFavorite_ai] = React.useState([]);
  const [favorite_datatesite_ai, Setfavorite_datates] = React.useState([]);
  const [user_id, setUser_id] = React.useState(
    JSON.parse(localStorage.getItem("Recent_id")).id
  );
  const [reload, setReload] = React.useState(true);
  React.useEffect(() => {
    axios({
      method: "put",
      url: "http://127.0.0.1:8000/favorite",
      data: {
        user: user_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((e) => {
      SetFavorite_ai([...e.data]);
    });
    axios({
      method: "put",
      url: "http://127.0.0.1:8000/favorite_user",
      data: {
        user: user_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((e) => {
      Setfavorite_datates([...e.data]);
    });
  }, [reload]);
  if (favorite_ai != null) {
    favorite_ai.map((ai) => {
      favorite_datatesite_ai.map((fav) => {
        if (ai.id == fav.ai) {
          total.push({ ai: ai, fav: fav });
        }
      });
    });
  }
  const DeletAi = async (id) => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:8000/favorite/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((e) => {
      setReload(!reload);
    });
  };
  console.log(total);
  return (
    <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-2 md:pl-20 lg:grid-cols-3 lg:pl-10 xl:grid-cols-4 xl:pl-12 md:gap-y-4  py-8 px-3 items-center justify-center m-auto bg-transparent">
      {total &&
        total.length > 0 &&
        total.map((to) => (
          <div
            key={to.ai.id}
            className="w-full flex flex-col items-center gap-1 justify-center bg-transparent rounded-xl"
          >
            <AiFillDelete
              size={30}
              className="relative left-36 top-8 cursor-pointer text-indigo-600"
              onClick={() => DeletAi(to.fav.id)}
            />

            <Ai annonce={to.ai} />
          </div>
        ))}
    </div>
  );
};

export default Favorie;

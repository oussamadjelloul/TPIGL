import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
function Messages(props) {
  const [arr, setArr] = useState([]);
  const token = JSON.parse(localStorage.getItem("Recent_token"))?.token;
  const [reload, setReload] = useState(false);
  const send = (id) => {
    const url =
      "http://127.0.0.1:8000/message/" + JSON.stringify(id) + "/viewed/";
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: headers,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((response) => console.log(response))
      .then((response) => setReload(!reload))
      .catch((error) => console.log("error", error));
  };

  var headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  headers.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/messages/", requestOptions)
      .then((response) => response.text())
      .then((response) => setArr(JSON.parse(response)))
      .then((response) => console.log(arr))
      .catch((error) => console.log("error", error));
  }, [reload]);

  return (
    <div className="w-full">
      {arr &&
        arr.map((message) => (
          <div
            key={message.id}
            className="w-full flex flex-col px-4 justify-center items-center py-5 "
          >
            <div
              onClick={() => {
                send(message.id);
              }}
              className="bg-slate-300 rounded-lg w-11/12 py-6 flex items-center justify-between px-1 min-w-[350px] max-w-2xl mx-2"
            >
              <div className="font-bold font-mono text-neutral-700 text-2xl max-w-[300px] md:max-w-full overflow-hidden">
                {message.body}
              </div>
              <AiOutlineClose size={40} className="text-black cursor-pointer" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Messages;

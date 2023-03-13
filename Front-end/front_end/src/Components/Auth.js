import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Auth = () => {
  const navigation = useNavigate();

  return (
    <div>
      <GoogleOAuthProvider clientId="699323224027-gn9judmftsjiuqdg3ttb73pj9ghiambq.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={async (Response) => {
            const token = Response.credential;
            const decoded = jwt_decode(token);
            try {
              const res = axios.post(
                "http://127.0.0.1:8000/google/",
                {
                  token,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              console.log((await res).data);
              console.log(token);
              localStorage.setItem(
                "Recent_token",
                JSON.stringify({
                  token: (await res).data.access_token,
                })
              );
              localStorage.setItem("Recent_user", decoded.name);
              localStorage.setItem(
                "Recent_id",
                JSON.stringify({
                  id: (await res).data.user_id,
                })
              );

              const id_user = (await res).data.user_id;
              console.log(id_user);
              id_user !== undefined && id_user === 1
                ? navigation("/administrator")
                : navigation("/user");
            } catch (err) {
              console.log(err);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Auth;

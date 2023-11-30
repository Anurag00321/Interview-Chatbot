"use client";
import React, { useState, useEffect } from "react";
import { auth, provider } from "./utils/firebase";
import { signInWithPopup } from "firebase/auth";
import Chat from "./Interview/page";

function Auth() {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });
  return (
    <div>
      {value ? (
        <Chat />
      ) : (
        <div className="flex bg-white">
          <div className="w-3/5 h-screen border-r text-center text-3xl font-bold text-black border-black">
            Interview AI Chatbot
          </div>
          <div className="flex m-auto">
            <div className="border border-black w-60 h-44 bg-white rounded">
              <p className="text-center text-xl font-bold ">Login/Signup</p>

              <button
                onClick={handleClick}
                className=" bg-gray-500 mt-16 ml-3 p-2 rounded"
              >
                Sign up/ Login with Google{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;

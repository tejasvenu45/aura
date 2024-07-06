/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../AuthSlice";
import aura from "./assets/aura1.png"
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const loginInfo = { username, password };
  const dispatch = useDispatch();

  async function handleSubmit(evt) {
    evt.preventDefault();
    // const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    // const isValidEmail = emailRegex.test(username);
    // if (isValidEmail) {
    //   setEmail(username);
    //   setUsername("");
    // }

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });

      if (!res.ok) {
        console.log("Error!!!! ");
        return;
      }

      const user = await res.json();
      dispatch(login(user));
      console.log("Success! ", res);
    } catch (error) {
      console.log("Error in fetch ", error);
    }
  }

  return (
    <>
      <div className="flex flex-col bg-black md:flex-row h-screen">
        <div className=" flex flex-col items-center justify-center w-1/2 h-96 ">
        <div className="h-36">

        </div>
          <img src={aura} alt="" className="bg-black h-24 w-auto" />
          <div className="text-white font-bold text-3xl">
            Login to the <b className="text-light-green">FUTURE!!</b> 
    
          </div>
        </div>


        <form onSubmit={handleSubmit} className=" flex flex-col items-start justify-center w-1/2 h-96">
        
          <div className="flex justify-start items-start w-10/12  mt-48 h-96 bg-black text-white border-4 border-xl border-grey-500 rounded-2xl shadow-xl shadow-cyan-100 ">
            <div className=" p-10 rounded-lg shadow-lg w-full">
              <h2 className="text-3xl font-bold text-light-green">SIGN IN!</h2>
              <div className="mb-4 ">
                <label htmlFor="username" className="block text-white text-center text-2xl  ">
                  Email/SRN
                </label>
                <input
                  type="text"
                  id="username" 
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white text-center text-2xl">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>
              <button className="w-full  bg-light-green text-3xl font-extrabold text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import aura from "./assets/aura1.png";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/authActions";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(formData));
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="flex flex-col md:flex-row bg-black h-screen">
        <div className="flex flex-col items-center justify-center md:w-1/2 w-full md:h-96">
          <div className="h-36"></div>
          <img src={aura} alt="" className="bg-black h-24 w-auto" />
          <div className="text-white font-bold text-3xl">
            Login to the <b className="text-light-green">FUTURE!!</b>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center md:w-1/2 w-full md:h-96">
          {isAuthenticated ? (
            <div className="flex flex-col items-center justify-center w-10/12 bg-black text-white border-4 border-xl border-grey-500 rounded-2xl shadow-xl shadow-cyan-100 p-10">
              <h2 className="text-3xl font-bold text-light-green text-center">
                Welcome, {user.username}!{user.fullname}!{user.email}
              </h2>
              <p className="text-2xl text-white text-center mt-4">
                Our website greets you! Enjoy exploring the content.
              </p>
              <button
                onClick={handleLogout}
                className="mt-8 w-full bg-light-green text-3xl font-extrabold text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-10/12 mt-8 md:mt-0 md:mt-48 bg-black text-white border-4 border-xl border-grey-500 rounded-2xl shadow-xl shadow-cyan-100 p-10">
              <h2 className="text-3xl font-bold text-light-green text-center">
                SIGN IN!
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-white text-center text-2xl"
                >
                  Email/SRN
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white text-center text-2xl"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>
              <button className="w-full bg-light-green text-3xl font-extrabold text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;

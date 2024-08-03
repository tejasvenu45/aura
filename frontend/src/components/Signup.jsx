// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import aura from "./assets/aura1.png";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [srn, setSrn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", srn);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profile);

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();
      console.log("Success:", result);
      navigate('/Login');
    } catch (error) {
      console.log("Error is fetch ", error);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row bg-black h-screen">
        <div className="flex flex-col items-center justify-center md:w-1/2 w-full md:h-96">
          <div className="h-36"></div>
          <img src={aura} alt="Logo" className="bg-black h-24 w-auto" />
          <div className="text-white font-bold text-3xl">
            Signup for the <b className="text-light-green">FUTURE!!</b>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col mt-12 items-center justify-center md:w-1/2 w-full md:h-96">
          <div className="flex justify-center items-center w-10/12 mt-8 md:mt-0 md:mt-48 bg-black text-white border-4 border-xl border-grey-500 rounded-2xl shadow-xl shadow-cyan-100">
            <div className="p-10 rounded-lg shadow-lg w-full">
              <h2 className="text-3xl font-bold text-light-green text-center">SIGN UP!</h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white text-center text-2xl">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="srn" className="block text-white text-center text-2xl">
                  SRN (Student Registration Number)
                </label>
                <input
                  type="text"
                  id="srn"
                  name="srn"
                  onChange={(e) => setSrn(e.target.value)}
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
              <div className="mb-4">
                <label htmlFor="fullname" className="block text-white text-center text-2xl">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="profile" className="block text-white text-center text-2xl">
                  Profile
                </label>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={(e) => setProfile(e.target.files[0])}
                  className="w-full bg-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>
              <button className="w-full bg-light-green text-3xl font-extrabold text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

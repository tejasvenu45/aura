// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [srn, setSrn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);

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
    } catch (error) {
      console.log("Error is fetch ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-5">Signup</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="srn" className="block text-gray-700">
              SRN (Student Registration Number)
            </label>
            <input
              type="text"
              id="srn"
              name="srn"
              onChange={(e) => setSrn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700">
              FULL NAME
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profile" className="block text-gray-700">
              Profile
            </label>
            <input
              type="file"
              id="profile"
              name="profile"
              onChange={(e) => setProfile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
            Signup
          </button>
        </div>
      </div>
    </form>
  );
}

export default Signup;

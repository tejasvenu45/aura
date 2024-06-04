import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from '../AuthSlice';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const loginInfo = { username, email, password };
  const dispatch = useDispatch();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const isValidEmail = emailRegex.test(username);
    if (isValidEmail) {
      setEmail(username);
      setUsername("");
    }

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', 
        body: JSON.stringify(loginInfo)
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
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-5">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Email/SRN
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
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
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;

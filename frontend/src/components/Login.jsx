import React from "react";

function Login() {
  return (
    <>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;

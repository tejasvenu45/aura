import React from "react";
import aura from "./assets/aura.png";
import pes from "./assets/pes.png";
import aiml from "./assets/aiml.png";
import { Fade, Slide } from "react-awesome-reveal";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div>
        <div className="bg-black sm:h-40 sm:pb-18" data-theme="forest">
          <div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-6 lg:px-8 pb-2 sm:pb-4">
            <div className="flex items-center">
              <Slide>
                <img
                  src={pes}
                  alt="pes"
                  className="h-28 bg-black sm:h-18 w-auto mr-2 sm:mr-4 hidden sm:block"
                />
                <img
                  src={aura}
                  alt="aura"
                  className="h-12 sm:h-28 w-auto hidden sm:block"
                />
              </Slide>
            </div>
            <div className="flex-grow flex justify-center lg:scale-150 items-center mt-2 sm:mt-0">
              <ul className="flex flex-wrap sm:flex-nowrap lg:scale-125 justify-center w-full sm:w-auto sm:border-4 sm:border-green-700 sm:rounded-3xl">
                <li className="m-2">
                  <Link
                    to="/"
                    className="text-white hover:text-green-700 hover:underline hover:font-bold"
                  >
                    Home
                  </Link>
                </li>
                <li className="m-2">
                  <Link
                    to="/Login"
                    className="text-white hover:text-green-700 hover:underline hover:font-bold"
                  >
                    Login
                  </Link>
                </li>
                <li className="m-2">
                  <Link
                    to="/Signup"
                    className="text-white hover:text-green-700 hover:underline hover:font-bold"
                  >
                    Signup
                  </Link>
                </li>
                <li className="m-2">
                  <Link
                    to="/PublicQNA"
                    className="text-white hover:text-green-700 hover:underline hover:font-bold"
                  >
                    Public QNA
                  </Link>
                </li>
                <li className="m-2">
                  <Link
                    to="/Events"
                    className="text-white hover:text-green-700 hover:underline hover:font-bold"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden sm:block">
              <Slide>
                <img src={aiml} className="h-48 w-auto mr-2 sm:mr-4" alt="aiml" />
              </Slide>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;

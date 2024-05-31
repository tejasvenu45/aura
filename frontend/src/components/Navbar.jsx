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
                {/* Conditionally render images based on screen size */}
                <img
                  src={pes}
                  alt="pes"
                  className="h-28 bg-black   sm:h-18 w-auto mr-2 sm:mr-4 hidden sm:block"
                />
                <img
                  src={aura}
                  alt="aura"
                  className="h-12 sm:h-28 w-auto hidden sm:block"
                />
              </Slide>
            </div>
            <div className="flex-grow scale-125 sm:flex-none flex justify-center items-center mt-2 sm:mt-0">
              <ul className="sm:border-4 sm:border-green-700 sm:rounded-3xl flex flex-wrap sm:flex-nowrap justify-center sm:justify-start  sm: hover:scale-125">
                <li className="btn btn-active btn-neutral sm:m-2 scale-150 sm:scale-125 hover:font-bold hover:scale-125">
                  <Link to="/">Home</Link>
                </li>
                <li className="btn btn-active btn-primary sm:m-2 scale-150 sm:scale-125 hover:font-bold hover:scale-125">
                  <Link to="/Articles"> Articles</Link>
                </li>
                <li className="btn btn-active btn-secondary sm:m-2 scale-150 sm:scale-125 hover:font-bold hover:scale-125">
                  <Link to="/Login"> Login</Link>

                </li>
                <li className="btn btn-active btn-accent sm:m-2 scale-150 sm:scale-125 hover:font-bold hover:scale-125">
                <Link to="/Signup"> Signup</Link>
                </li>
              </ul>
            </div>
            <div className="hidden sm:block">
              <Slide>
                <img src={aiml} className="h-48 w-auto mr-2 sm:mr-4" alt="aiml" />
              </Slide>
            </div>
          </div>
        </div >
        <Outlet />
      </div >
    </>
  );
}

export default Navbar;

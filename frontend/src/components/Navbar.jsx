import React from "react";
import aura from "./assets/aura.png";
import pes from "./assets/pes.png";
import aiml from "./assets/aiml.png";

function Navbar() {
  return (
    <>
      <div className="bg-black sm:h-40 sm:pb-18" data-theme="forest">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <img src={pes} alt="pes" className="h-28 bg-white sm:h-18 w-auto mr-2 sm:mr-4" />
            <img src={aura} alt="aura" className="h-12 sm:h-28 w-auto" />
          </div>
          <div className="flex-grow sm:flex-none flex justify-center items-center mt-4 sm:mt-0">
            <div className="sm:border-4 sm:border-green-700 sm:rounded-3xl flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-2 sm:gap-4 hover:scale-125">
              <button className="btn btn-active btn-neutral m-2 sm:m-3 scale-100 sm:scale-125 hover:font-bold hover:scale-125">
                Home
              </button>
              <button className="btn btn-active btn-primary m-2 sm:m-3 scale-100 sm:scale-125 hover:font-bold hover:scale-125">
                Articles
              </button>
              <button className="btn btn-active btn-secondary m-2 sm:m-3 scale-100 sm:scale-125 hover:font-bold hover:scale-125">
                About
              </button>
              <button className="btn btn-active btn-accent m-2 sm:m-3 scale-100 sm:scale-125 hover:font-bold hover:scale-125">
                AI Tools
              </button>
            </div>
          </div>
          <div className="hidden sm:block">
            <img src={aiml} className="h-48 w-auto mr-4" alt="aiml" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

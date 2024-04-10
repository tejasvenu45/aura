import React from "react";
import aura from "./assets/aura.png";
import pes from "./assets/pes.png"
function Navbar(){

  return(
    <>
    <div className="bg-black h-36 " data-theme="forest">
      <div className="flex flex-row">
      <div className="flex flex-row items-start justify-start ">
        <img src={pes} alt=" ass" className="h-18 w-16 m-4 bg-white"/>
        <img src={aura} alt="your " className="h-18 w-14 m-4 bg-white" />
        
      </div>
      <div className="flex flex-row justify-center items-center w-full " >
        <div className=" border-4 border-white rounded-3xl ">
          <div className="m-2 gap-2">
          <button className="btn btn-active btn-neutral m-2">Home</button>
          <button className="btn btn-active btn-primary m-2">Articles</button>
          <button className="btn btn-active btn-secondary m-2">About</button>
          <button className="btn btn-active btn-accent m-2">AI Tools</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Navbar;
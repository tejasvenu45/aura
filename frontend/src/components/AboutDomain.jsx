import React from "react";
import { Zoom } from "react-awesome-reveal";

function AboutDomain({ title, content, img }) {
  return (
    <div className="bg-black text-green-500 rounded-lg p-6 border-4 border-green-500 shadow-xl shadow-purple-700 hover:scale-105 hover:text-white">
      <Zoom>
      <img src={img} alt={title} className="w-48 h-48 mx-auto mb-4 hover:scale-125" />
      <h2 className="text-2xl font-bold  mb-2 text-purple-800 hover:scale-105">{title}</h2>
      <p className="text-orange-400 hover:scale-105">{content}</p>
      </Zoom>
    </div>
  );
}

export default AboutDomain;

import React from "react";
import { Slide } from "react-awesome-reveal";

function AboutDomain({ title, content, img }) {
  return (
    <div className="bg-black text-green-500 rounded-lg p-6 border-4 border-white shadow-xl shadow-green-700 hover:scale-105 hover:text-white">
      <Slide>
      <img src={img} alt={title} className="w-48 h-48 mx-auto mb-4 hover:scale-125" />
      <h2 className="text-2xl font-bold  mb-2 text-white hover:scale-105">{title}</h2>
      <p className="hover:scale-105">{content}</p>
      </Slide>
    </div>
  );
}

export default AboutDomain;

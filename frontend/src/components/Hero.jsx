import React, {Component} from "react";
import logo from "./assets/aura1.png";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from "./assets/11.jpg";
import image2 from "./assets/10.jpg";
import image3 from "./assets/6.jpg";
function Hero(){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return(
    <>
    <div class="bg-black flex sm:flex-col justify-center items-center pb-12 pt-18 pt-20">
    <div class="flex flex-row border-2 border-green-700 w-11/12 h-1/2 justify-start  items-start shadow-xl shadow-green-700 hover:scale-105">
        <div class="flex flex-col justify-start items-start w-2/5 mt-36 ml-12 mr-24 mb-24">
            <img src={logo} alt="Logo" className="mb-12 h-36" />
            <p class="text-white text-5xl font-bold typewriter-text">ADAPTING TO THE FUTURE</p>
        </div> 
        <div class="flex flex-col ml-12 mt-12 w-2/5 h-1/2 bg-black" id = "post">
  
        <Slider {...settings}>
      <div>
        <img src={image1} alt="" className="bg-black "/>
      </div>
      <div>
      <img src={image2} alt="" className="bg-black"/>
      </div>
      <div>
      <img src={image3} alt="" className="bg-black"/>
      </div>
    </Slider>

            
            
        </div>
    </div>
</div>


    </>
  )
}

export default Hero;